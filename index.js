// global imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// local imports
const UserData = require('./Models/userData');
const connectDB = require('./Config/db');
const payRoute = require('./Routes/pay');
const submitRoute = require('./Routes/submit');
const existingUserRoute = require('./Routes/existing-user');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_MAIL, 
      pass: process.env.APP_PSWD,   
    },
  });

// middleware
const app = express();
app.use(cors({
    origin: process.env.CLIENT,
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
app.use('*', (req, res) => {
    res.status(404).send("<h1>404 Not Found</h1>");
});
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

            const mailOptions = {
                from: process.env.SENDER_MAIL,
                to: user.email,
                subject: 'Yoga Class Purchase Expiry',
                html: `
                    <div>
                        <h1>Yoga Class</h1>
                        <p>Hello ${user.name}, purchase of yoga classes for start date (${user.startDate}) has expired.</p>
                        <p>But you can join us by purchasing again.</p>
                        <p>Link: https://yoga-client-e1u4.onrender.com/</p>
                    </div>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                }
            });
        });
        await Promise.all(updatePromises);
    } catch (err) {
        console.error('Error updating paid field:', err);
    }
});

app.listen(port, () => {
    console.log(`Server is running`);
});