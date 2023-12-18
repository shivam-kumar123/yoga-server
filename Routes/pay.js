const express = require('express');
const payRoute = express.Router();
const UserData = require('../Models/userData');

payRoute.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const payEmail = email;
        const updatedUser = await UserData.findOneAndUpdate(
            { email: payEmail },
            { $set: { paid: 500 } },
            { new: true }
        );

        res.status(200).send({ message: 'Payment successful' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = payRoute;