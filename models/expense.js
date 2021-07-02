const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create expense details schema
const ExpenseDetailSchema = new Schema({
    year: String,
    month: String,
    food: {
        type: Number,
        default: 0
    },
    transport: {
        type: Number,
        default: 0
    },
    health: {
        type: Number,
        default: 0
    },
    education: {
        type: Number,
        default: 0
    },
    electricity: {
        type: Number,
        default: 0
    },
    water: {
        type: Number,
        default: 0
    },
    telephone: {
        type: Number,
        default: 0
    },
    home: {
        type: Number,
        default: 0
    },
    other: {
        type: Number,
        default: 0
    }
});

//create expense user details schema
const ExpenseUserDetailSchema = new Schema({
    user_name: String,
    details: [ExpenseDetailSchema]
});

//create expense schema
const ExpenseSchema = new Schema({
    user: [ExpenseUserDetailSchema]
});


//create an expense model
const Expense = mongoose.model('expense', ExpenseSchema);

//export expense model
module.exports = Expense;