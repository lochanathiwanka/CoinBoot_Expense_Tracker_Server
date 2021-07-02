const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Income = require('../models/income');
const Expense = require('../models/expense');

//get users
router.get("/user", function (req, res, next) {
    res.send('Hello Client!');
});

//add user
router.post("/user", function (req, res, next) {
    User.create(req.body)
        .then(function () {
            res.status(200).send('User saved!');
        })
        .catch(next);
});

//add new income details
router.post("/user/income", function (req, res, next) {
    Income.findOne({"user.user_name": req.body.user_name})
        .then(function (value) {
            //check if user's first income details is not added yet
            if (value === null) {
                //add new income details for new user
                Income.create(req.body.details).then(function () {
                    res.status(200).send('Income details added!');
                }).catch(next);
            } else {
                //get income details by correspond month & year of the particular user
                for (let i = 0; i < value.user[0].details.length; i++) {
                    if (
                        value.user[0].details[i].month.toLowerCase() === req.body.month.toLowerCase() &&
                        value.user[0].details[i].year === req.body.year
                    ){
                        //add new income details to the existing user & current month
                        value.user[0].details[i].salary += req.body.details[0].user[0].details[0].salary;
                        value.user[0].details[i].interest += req.body.details[0].user[0].details[0].interest;
                        value.user[0].details[i].other += req.body.details[0].user[0].details[0].other;

                        value.save().then(function () {
                            res.status(200).send('Income details updated!');
                        }).catch(next);
                        return;
                    }
                }
                //add new income details to the existing user with new month / new year
                value.user[0].details.push({
                    "year": req.body.year,
                    "month": req.body.month,
                    "salary": req.body.details[0].user[0].details[0].salary,
                    "interest": req.body.details[0].user[0].details[0].interest,
                    "other": req.body.details[0].user[0].details[0].other
                });

                value.save().then(function () {
                    res.status(200).send('New income details added!');
                }).catch(next);
            }
        }).catch(next);
});

//update user income details
router.put("/user/income", function (req, res, next) {
    Income.findOne({
        "user.user_name": req.body.user_name,
    }).then(function (value) {
            if (value !== null) {
                for (let i = 0; i < value.user[0].details.length; i++) {
                    //get income details by correspond month & year of the particular user
                    if (
                        value.user[0].details[i].month.toLowerCase() === req.body.month.toLowerCase() &&
                        value.user[0].details[i].year === req.body.year
                    ) {
                        //check the source to update
                        switch (req.body.source) {
                            case 'salary':
                                value.user[0].details[i].salary = req.body.salary;
                                break;
                            case 'interest':
                                value.user[0].details[i].interest = req.body.interest;
                                break;
                            case 'other':
                                value.user[0].details[i].other = req.body.other;
                                break;
                            default:
                                res.status(404).send({error: 'Source not found..check again!'});
                                return;
                        }

                        value.save().then(function () {
                            res.status(200).send('Income details updated!');
                        }).catch(next);
                        return;
                    }
                }
                res.status(404).send({error: 'Correspond month or year not found..check again!'});
            } else {
                res.status(404).send({error: 'Could not find any details to the correspond user!'});
            }
        })
        .catch(next);
});

//add new expense details
router.post("/user/expense", function (req, res, next) {
    Expense.findOne({"user.user_name": req.body.user_name})
        .then(function (value) {

            //check if user's first expense details is not added yet
            if (value === null) {
                //add new expense details for new user
                Expense.create(req.body.details).then(function () {
                    res.status(200).send('Expense details added!');
                }).catch(next);
            } else {
                //get expense details by correspond month & year of the particular user
                for (let i = 0; i < value.user[0].details.length; i++) {
                    if (
                        value.user[0].details[i].month.toLowerCase() === req.body.month.toLowerCase() &&
                        value.user[0].details[i].year === req.body.year
                    ){
                        //add new expense details to the existing user & current month
                        value.user[0].details[i].food += req.body.details[0].user[0].details[0].food;
                        value.user[0].details[i].transport += req.body.details[0].user[0].details[0].transport;
                        value.user[0].details[i].health += req.body.details[0].user[0].details[0].health;
                        value.user[0].details[i].education += req.body.details[0].user[0].details[0].education;
                        value.user[0].details[i].electricity += req.body.details[0].user[0].details[0].electricity;
                        value.user[0].details[i].water += req.body.details[0].user[0].details[0].water;
                        value.user[0].details[i].telephone += req.body.details[0].user[0].details[0].telephone;
                        value.user[0].details[i].home += req.body.details[0].user[0].details[0].home;
                        value.user[0].details[i].other += req.body.details[0].user[0].details[0].other;

                        value.save().then(function () {
                            res.status(200).send('Expense details updated!');
                        }).catch(next);
                        return;
                    }
                }
                //add new expense details to the existing user with new month / new year
                value.user[0].details.push({
                    "year": req.body.year,
                    "month": req.body.month,
                    "food": req.body.details[0].user[0].details[0].food,
                    "transport": req.body.details[0].user[0].details[0].transport,
                    "health": req.body.details[0].user[0].details[0].health,
                    "education": req.body.details[0].user[0].details[0].education,
                    "electricity": req.body.details[0].user[0].details[0].electricity,
                    "water": req.body.details[0].user[0].details[0].water,
                    "telephone": req.body.details[0].user[0].details[0].telephone,
                    "home": req.body.details[0].user[0].details[0].home,
                    "other": req.body.details[0].user[0].details[0].other
                });

                value.save().then(function () {
                    res.status(200).send('New expense details added!');
                }).catch(next);
            }
        })
        .catch(next);
});

//update user expense details
router.put("/user/expense", function (req, res, next) {
    Expense.findOne({
        "user.user_name": req.body.user_name,
    }).then(function (value) {
        if (value !== null) {
            for (let i = 0; i < value.user[0].details.length; i++) {
                //get expense details by correspond month & year of the particular user
                if (
                    value.user[0].details[i].month.toLowerCase() === req.body.month.toLowerCase() &&
                    value.user[0].details[i].year === req.body.year
                ) {
                    //check the source to update
                    switch (req.body.source) {
                        case 'food':
                            value.user[0].details[i].food = req.body.food;
                            break;
                        case 'transport':
                            value.user[0].details[i].transport = req.body.transport;
                            break;
                        case 'health':
                            value.user[0].details[i].health = req.body.health;
                            break;
                        case 'education':
                            value.user[0].details[i].education = req.body.education;
                            break;
                        case 'electricity':
                            value.user[0].details[i].electricity = req.body.electricity;
                            break;
                        case 'water':
                            value.user[0].details[i].water = req.body.water;
                            break;
                        case 'telephone':
                            value.user[0].details[i].telephone = req.body.telephone;
                            break;
                        case 'home':
                            value.user[0].details[i].home = req.body.home;
                            break;
                        case 'other':
                            value.user[0].details[i].other = req.body.other;
                            break;
                        default:
                            res.status(404).send({error: 'Source not found..check again!'});
                            return;
                    }

                    value.save().then(function () {
                        res.status(200).send('Expense details updated!');
                    }).catch(next);
                    return;
                }
            }
            res.status(404).send({error: 'Correspond month or year not found..check again!'});
        } else {
            res.status(404).send({error: 'Could not find any details to the correspond user!'});
        }
    })
        .catch(next);
});

module.exports = router;