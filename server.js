/*const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Smart Campus Backend Running");
});

app.listen(3000, () => console.log("Server running on port 3000"));  */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const noticeRoutes = require('./routes/noticeRoutes');

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.send('Smart Campus Backend Running');
});

// API Routes
app.use('/api/auth', authRoutes);        // /login, /register
app.use('/api/student', studentRoutes);  // /dashboard, /profile
app.use('/api/faculty', facultyRoutes);  // /dashboard, /profile
app.use('/api/notices', noticeRoutes);   // /, /new

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // useful if you do tests
