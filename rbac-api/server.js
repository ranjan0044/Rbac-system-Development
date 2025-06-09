const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/rbac', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));
