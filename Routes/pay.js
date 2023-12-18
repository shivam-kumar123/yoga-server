const express = require('express');
const payRoute = express.Router();
const UserData = require('../Models/userData');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_MAIL, 
    pass: process.env.APP_PSWD,   
  },
});

payRoute.post('/', async (req, res) => {
  try {
    const { email, startDate, selectedBatch } = req.body;
    const payEmail = email;
    const payStartDate = startDate;
    const paySelectedBatch = selectedBatch;
    const updatedUser = await UserData.findOneAndUpdate(
      { email: payEmail },
      { $set: { 
        paid: 500,
        selectedBatch: paySelectedBatch,
        startDate: payStartDate,
       } },
      { new: true }
    );

    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: payEmail, 
      subject: 'Yoga Class Payment Confirmation',
      html: `
        <h1>Yoga Class</h1>
        <p>Hello ${updatedUser.name}, Your seat at our yoga classes is now reserved</p>
        <p>Your purchase of Rs 500 has been completed successfully.</p>
        <p>Your start date is ${updatedUser.startDate.toISOString().split('T')[0]}</p>
        <p>your opted timing is ${updatedUser.selectedBatch}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).send({ message: 'Payment successful' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = payRoute;