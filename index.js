// global imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
const bodyParser = require('body-parser');

// local imports
const UserData = require('./Models/userData');
const connectDB = require('./Config/db');
const payRoute = require('./Routes/pay');
const submitRoute = require('./Routes/submit');
const existingUserRoute = require('./Routes/existing-user');

// middleware
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(bodyParser.json());
dotenv.config();

const port = process.env.PORT;
connectDB();

// Routes
app.use('/submit', submitRoute);
app.use('/pay', payRoute);
app.use('/existing-user', existingUserRoute);

// Schedule a cron job to run every day at 02:00
cron.schedule('0 2 * * *', async () => {
    try {
        // Find users whose 30 days have passed since startDate
        const usersToUpdate = await UserData.find({
            startDate: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // 30 days ago
            paid: { $ne: 0 }, // Filter out users already updated
        });

        // Update the paid field to 0 for users
        const updatePromises = usersToUpdate.map(async (user) => {
            await UserData.findByIdAndUpdate(user._id, { $set: { paid: 0 } });
        });

        await Promise.all(updatePromises);

        console.log('Daily update: Reset paid field to 0 for users with 30 days passed since startDate');
    } catch (err) {
        console.error('Error updating paid field:', err);
    }
});

app.listen(port, () => {
    console.log(`Server is running`);
});