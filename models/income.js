const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create income details schema
const IncomeDetailSchema = new Schema({
    year: String,
    month: String,
    salary: {
        type: Number,
        default: 0
    },
    interest: {
        type: Number,
        default: 0
    },
    other: {
        type: Number,
        default: 0
    }
});

//create income user details schema
const IncomeUserDetailSchema = new Schema({
    user_name: String,
    details: [IncomeDetailSchema]
});

//create income schema
const IncomeSchema = new Schema({
    user: [IncomeUserDetailSchema]
});


//create an income model
const Income = mongoose.model('income', IncomeSchema);

//export income model
module.exports = Income;