// Require necessary modules
const mongoose = require('mongoose');
require('dotenv').config();

// Define MongoDB URL from environment variables
const MONGODB_URL="mongodb+srv://gurpreet:dicknny%40123@dickkny.rhmwlhk.mongodb.net/"

// Connect to MongoDB
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.error('MongoDB Error:', err.message);
});

// Export mongoose instance
module.exports = mongoose;
