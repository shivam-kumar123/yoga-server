const express = require('express');
const submitRoute = express.Router();
const UserData = require('../Models/userData');

submitRoute.post('/', async (req, res) => {
    try {
        const existingUser = await UserData.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(202).send({ message: 'Email already in use' });
        }

        const formData = new UserData({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            selectedBatch: req.body.selectedBatch,
            gender: req.body.gender,
            startDate: req.body.startDate,
            paid: 0,
        });

        await formData.save();

        res.status(200).send({
            message: 'form submitted successfully',
            redirectUrl: '/payment', 
          });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = submitRoute;