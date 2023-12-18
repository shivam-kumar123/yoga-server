const express = require('express');
const existingUserRoute = express.Router();
const UserData = require('../Models/userData');

existingUserRoute.post('/', async (req, res) => {
    try {
        const existingUser = await UserData.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(200).send({message: 'Email already in use'});
        } else {
            return res.status(202).send({message: "new User"});
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = existingUserRoute;