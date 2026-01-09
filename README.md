# Expense Tracker - MERN Stack Application

A full-stack expense tracking application built with MongoDB, Express.js, React, and Node.js. Track your income and expenses with an intuitive dashboard, charts, and transaction management.

## Features

- 🔐 User Authentication (Register/Login)
- 💰 Income Management (Add, View, Delete)
- 💸 Expense Management (Add, View, Delete)
- 📊 Dashboard with Summary Cards
- 📈 Interactive Charts (Income vs Expenses)
- 📋 Recent Transactions List
- 🎨 Modern, Responsive UI

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM
- Axios
- Recharts (for data visualization)
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs (password hashing)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ETS-MERN.git
cd ETS-MERN
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** Generate a strong random string for `JWT_SECRET` in production. You can use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

For production, update this to your backend URL:
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

## Running the Application

### Development Mode

1. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

2. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   # or for development with auto-reload:
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

3. **Start the Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
ETS-MERN/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Income.js        # Income model
│   │   └── Expense.js       # Expense model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── income.js        # Income routes
│   │   └── expense.js       # Expense routes
│   ├── server.js            # Express server setup
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/        # Login & Register components
│   │   │   ├── Dashboard/   # Dashboard components
│   │   │   ├── Income/      # Income management
│   │   │   ├── Expense/     # Expense management
│   │   │   └── Layout/      # Layout & Sidebar
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── config/
│   │   │   └── api.js       # API endpoints configuration
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Income
- `GET /api/income` - Get all income records (protected)
- `POST /api/income` - Create income record (protected)
- `DELETE /api/income/:id` - Delete income record (protected)

### Expense
- `GET /api/expense` - Get all expense records (protected)
- `POST /api/expense` - Create expense record (protected)
- `DELETE /api/expense/:id` - Delete expense record (protected)

### Health Check
- `GET /api/health` - Server health check

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT tokens

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL

## Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables in your hosting platform:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (usually auto-set by hosting platform)

2. Update your frontend `.env` with the production backend URL

### Frontend Deployment (Vercel/Netlify/GitHub Pages)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `build` folder to your hosting platform

3. Ensure `REACT_APP_API_URL` is set to your production backend URL

## Security Notes

- ⚠️ **Never commit `.env` files** to version control
- ⚠️ Use strong, unique `JWT_SECRET` in production
- ⚠️ Use MongoDB Atlas or secure MongoDB instance in production
- ⚠️ Enable CORS only for trusted domains in production
- ⚠️ Use HTTPS in production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Your Name - [GitHub](https://github.com/your-username)

## Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- All open-source contributors
