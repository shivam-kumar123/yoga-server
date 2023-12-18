const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@yogadb.oqgolqf.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(uri);
        console.log('Database connected');
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;
