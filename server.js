/*const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Smart Campus Backend Running");
});

app.listen(3000, () => console.log("Server running on port 3000"));  */

// server.js
const express = require('express');
const path = require('path');

const app = express();

// Use PORT from env (for Docker/EC2) or default to 3000 locally
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (index.html, style.css, architecture.html, etc.)
app.use(express.static(__dirname));

// ===== Health Check Route =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Smart Campus Backend Running',
  });
});

// Root route (optional – serves text instead of HTML)
app.get('/', (req, res) => {
  res.send('Smart Campus Backend Running (Node.js + Express)');
});

// ===== Dummy Auth APIs =====

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  // NOTE: This is just a demo. No real authentication.
  // In a real app you would check hashed password from DB.
  const userRole = role || (email.includes('faculty') ? 'faculty' : 'student');

  return res.json({
    success: true,
    message: 'Login successful (dummy)',
    user: {
      id: 1,
      name: 'Demo User',
      email,
      role: userRole,
    },
    token: 'dummy-jwt-token',
  });
});

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required',
    });
  }

  // Dummy created user
  const newUser = {
    id: Date.now(),
    name,
    email,
    role: role || 'student',
  };

  return res.status(201).json({
    success: true,
    message: 'User registered (dummy, not saved anywhere)',
    user: newUser,
  });
});

// ===== Student & Faculty Dashboards (Dummy Data) =====

// GET /api/student/dashboard
app.get('/api/student/dashboard', (req, res) => {
  res.json({
    success: true,
    dashboardType: 'student',
    attendance: '85%',
    noticesCount: 3,
    profileCompleted: true,
    upcomingLectures: [
      { subject: 'Data Structures', time: '10:00 AM' },
      { subject: 'Computer Networks', time: '2:00 PM' },
    ],
  });
});

// GET /api/faculty/dashboard
app.get('/api/faculty/dashboard', (req, res) => {
  res.json({
    success: true,
    dashboardType: 'faculty',
    totalClassesToday: 3,
    pendingApprovals: 2,
    noticesPosted: 5,
  });
});

// ===== Notices APIs =====

// GET /api/notices
app.get('/api/notices', (req, res) => {
  const notices = [
    {
      id: 1,
      title: 'Exam Schedule Released',
      content: 'Mid-sem exams will start from 10th December.',
      date: '2025-11-20',
    },
    {
      id: 2,
      title: 'Holiday Notice',
      content: 'Campus will remain closed on 26th January (Republic Day).',
      date: '2025-01-26',
    },
  ];

  res.json({
    success: true,
    notices,
  });
});

// POST /api/notices/new (dummy – no DB)
app.post('/api/notices/new', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required',
    });
  }

  const newNotice = {
    id: Date.now(),
    title,
    content,
    date: new Date().toISOString().slice(0, 10),
  };

  // In real app you would save to DB, here we just echo it back
  res.status(201).json({
    success: true,
    message: 'Notice created (dummy, not saved)',
    notice: newNotice,
  });
});

// ===== User Update API =====

// PUT /api/user/update
app.put('/api/user/update', (req, res) => {
  const { id, name, email } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'User id is required',
    });
  }

  res.json({
    success: true,
    message: 'User updated (dummy, not saved)',
    user: {
      id,
      name: name || 'Demo User',
      email: email || 'demo@example.com',
    },
  });
});

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
