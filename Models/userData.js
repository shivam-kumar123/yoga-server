const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 65,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    selectedBatch: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    paid: {
        type: Number,
        default: 0,
    },
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;