const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/react-express-authentication");

    console.log('Connected to mongodb !!');
}

module.exports = connectDB;