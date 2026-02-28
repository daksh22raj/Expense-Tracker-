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

## GitHub Pages Deployment

This project includes a `.nojekyll` file to prevent GitHub Pages from processing the repository with Jekyll (which would cause errors with React/Node.js files).

**Important:** If you're deploying to GitHub Pages:
1. The `.nojekyll` file in the root directory tells GitHub Pages to skip Jekyll processing
2. Make sure `node_modules` is not committed to git (it's in `.gitignore`)
3. If `node_modules` was previously committed, remove it:
   ```bash
   git rm -r --cached frontend/node_modules backend/node_modules
   git commit -m "Remove node_modules from git tracking"
   ```

## Deployment

### Deploy on Render (recommended)

The repo includes a `render.yaml` so Render can build and run the app correctly.

1. **Push the repo to GitHub** and connect the repo in [Render](https://render.com).
2. **Create a new Web Service** and let Render use the `render.yaml` (or set these manually):
   - **Root Directory:** leave empty (use repo root).
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
3. **Environment variables** (in Render dashboard):
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a long random string (e.g. from `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
4. **Frontend API URL:** In the frontend, the app uses the same origin in production, or set `REACT_APP_API_URL` in the frontend build to your Render URL (e.g. `https://your-app.onrender.com`) if your API is on a different subdomain.

If you see **"Cannot GET /"** on Render, it usually means:
- **NODE_ENV** is not set to `production`, or  
- The **Build Command** did not run `npm run build` (so the React app was never built).  

Fix: set `NODE_ENV=production` and use Build Command `npm install && npm run build`.

### Backend-only deployment (Heroku/Railway/Render)

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
