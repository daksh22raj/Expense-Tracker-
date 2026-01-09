const express = require('express');
const Income = require('../models/Income');
const auth = require('../middleware/auth');
const XLSX = require('xlsx');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, limit } = req.query;
    let query = { userId: req.user._id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const incomes = await Income.find(query)
      .sort({ date: -1 })
      .limit(limit ? parseInt(limit) : 1000);
    
    res.json(incomes);
  } catch (error) {
    console.error('Get income error:', error);
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

    const stats = await Income.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' },
          max: { $max: '$amount' },
          min: { $min: '$amount' }
        }
      }
    ]);

    res.json(stats[0] || { total: 0, count: 0, average: 0, max: 0, min: 0 });
  } catch (error) {
    console.error('Get income stats error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, amount, date, description } = req.body;

    if (!title || !amount || !date) {
      return res.status(400).json({ message: 'Please provide title, amount, and date' });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const income = new Income({
      userId: req.user._id,
      title: title.trim(),
      amount: amountNum,
      date: new Date(date),
      description: description ? description.trim() : ''
    });

    await income.save();
    res.status(201).json(income);
  } catch (error) {
    console.error('Add income error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors)[0].message });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, amount, date, description } = req.body;
    const income = await Income.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    if (title !== undefined) income.title = title.trim();
    if (amount !== undefined) {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum < 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
      }
      income.amount = amountNum;
    }
    if (date !== undefined) income.date = new Date(date);
    if (description !== undefined) income.description = description.trim();

    await income.save();
    res.json(income);
  } catch (error) {
    console.error('Update income error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors)[0].message });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const income = await Income.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    console.error('Delete income error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/export', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { userId: req.user._id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const incomes = await Income.find(query).sort({ date: -1 });
    
    const data = incomes.map(income => ({
      Title: income.title,
      Amount: income.amount,
      Date: new Date(income.date).toLocaleDateString('en-US'),
      Description: income.description || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Income');

    const maxWidth = data.length > 0 ? Math.max(...Object.keys(data[0]).map(key => key.length)) : 10;
    worksheet['!cols'] = [{ wch: maxWidth + 5 }, { wch: 15 }, { wch: 12 }, { wch: 30 }];

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    const filename = `income-report-${new Date().toISOString().split('T')[0]}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(buffer);
  } catch (error) {
    console.error('Export income error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;

