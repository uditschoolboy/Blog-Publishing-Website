const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const colors = require('colors');

router.post('/signup', async (req, res) => {
    console.log("Sign up details : ", req.body);
    const user = new User({...req.body});
    try {
        await user.save();
        res.send('Okay sign up complete');
    } catch(err) {
        console.log("An error".red.bgWhite);
        res.send("sahi se bhejo");
    }
    //send a signed cookie
});
router.post('/signin', (req, res) => {
    console.log("Sign in details : ", req.body);
    const users = User.find({...req.body});
    if(users) {
        res.send('Okay login complete');
    }
    //send a signed cookie
});

module.exports = router;