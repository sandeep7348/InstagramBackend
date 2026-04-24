const express = require('express');
const router = express.Router();

const User = require('../model/user');

const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    try {
        const { username, email, password ,bio,profileImageUrl} = req.body;
        if(!username ||!email ||!password){
            return res.status(400).json({ message: 'Username, email and password are required' });
        }
        const existingUser=await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            bio,
            profileImageUrl
        });
        const token=jsonwebtoken.sign({ userId: user._id }, "I Love Cupcakes", { expiresIn: '1h' });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user: { username, email, bio, profileImageUrl }, token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });

    }
})
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email ||!password){
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken.sign({ userId: user._id }, "I Love Cupcakes", { expiresIn: '1h' });
        res.json({ message: 'Login successful', user: { username: user.username, email: user.email, bio: user.bio, profileImageUrl: user.profileImageUrl }, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;