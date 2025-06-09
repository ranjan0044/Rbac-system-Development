const router = require('express').Router();
const User = require('../models/User');
const { verifyToken, permit } = require('../middleware/auth');

// Get all users (Admin, Manager)
router.get('/', verifyToken, permit('Admin', 'Manager'), async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// Create user (Admin only)
router.post('/', verifyToken, permit('Admin'), async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update user (Admin, Manager)
router.put('/:id', verifyToken, permit('Admin', 'Manager'), async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete user (Admin only)
router.delete('/:id', verifyToken, permit('Admin'), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Change role (Admin only)
router.put('/:id/role', verifyToken, permit('Admin'), async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
        res.json({ message: 'Role updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
