const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const XLSX = require('xlsx');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, category, limit } = req.query;
    let query = { userId: req.user._id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (category) {
      query.category = category;
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .limit(limit ? parseInt(limit) : 1000);
    
    res.json(expenses);
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let matchQuery = { userId: req.user._id };

    if (startDate || endDate) {
      matchQuery.date = {};
      if (startDate) matchQuery.date.$gte = new Date(startDate);
      if (endDate) matchQuery.date.$lte = new Date(endDate);
    }

    const stats = await Expense.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' },
          max: { $max: '$amount' },
          min: { $min: '$amount' },
          byCategory: {
            $push: {
              category: '$category',
              amount: '$amount'
            }
          }
        }
      }
    ]);

    const categoryTotals = {};
    if (stats[0] && stats[0].byCategory) {
      stats[0].byCategory.forEach(item => {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
      });
    }

    res.json({
      total: stats[0]?.total || 0,
      count: stats[0]?.count || 0,
      average: stats[0]?.average || 0,
      max: stats[0]?.max || 0,
      min: stats[0]?.min || 0,
      byCategory: categoryTotals
    });
  } catch (error) {
    console.error('Get expense stats error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: 'Please provide title, amount, category, and date' });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const validCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const expense = new Expense({
      userId: req.user._id,
      title: title.trim(),
      amount: amountNum,
      category,
      date: new Date(date),
      description: description ? description.trim() : ''
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Add expense error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors)[0].message });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (title !== undefined) expense.title = title.trim();
    if (amount !== undefined) {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum < 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
      }
      expense.amount = amountNum;
    }
    if (category !== undefined) {
      const validCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Other'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category' });
      }
      expense.category = category;
    }
    if (date !== undefined) expense.date = new Date(date);
    if (description !== undefined) expense.description = description.trim();

    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error('Update expense error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors)[0].message });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/export', async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    let query = { userId: req.user._id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (category) {
      query.category = category;
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    
    const data = expenses.map(expense => ({
      Title: expense.title,
      Amount: expense.amount,
      Category: expense.category,
      Date: new Date(expense.date).toLocaleDateString('en-US'),
      Description: expense.description || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

    const maxWidth = data.length > 0 ? Math.max(...Object.keys(data[0]).map(key => key.length)) : 10;
    worksheet['!cols'] = [{ wch: maxWidth + 5 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 30 }];

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    const filename = `expense-report-${new Date().toISOString().split('T')[0]}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(buffer);
  } catch (error) {
    console.error('Export expense error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;

