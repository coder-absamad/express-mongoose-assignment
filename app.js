const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/productRoutes');
const { generateToken } = require('./src/utils/jwtUtils');
const { authenticate } = require('./src/middleware/authMiddleware');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1);
});


// Generate JWT token
app.get('/generate-token', (req, res) => {
    const token = generateToken('user123', 'your-secret-key');
    res.json({ token });
  });


// Test protected route
app.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Authenticated user' });
});


// Routes
app.use('/products', productRoutes);


//undefined route
app.use('*', (req, res) => {
    res.status(404).json({ status: 'Fail', data: 'Not found' })
})

module.exports = app;