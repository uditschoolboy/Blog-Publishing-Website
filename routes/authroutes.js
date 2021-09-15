const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const colors = require('colors');
const { signedCookie } = require('cookie-parser');
const cookieParser = require('cookie-parser');

router.post('/signup', async (req, res) => {
    console.log("Sign up details : ", req.body);
    const user = new User({...req.body});
    try {
        await user.save();
        sendCookie(user.email, req, res);
        res.send('Okay sign up complete');
    } catch(err) {
        console.log("An error".red.bgWhite);
        res.send("sahi se bhejo");
    }
    //send a signed cookie
});
router.post('/signin', async (req, res) => {
    console.log("Sign in details : ", req.body);
    const user = await User.findOne({...req.body});
    if(user) {
        sendCookie(user.email, req, res);
        res.send('Okay login complete');
    } else {
        res.send('No');
    }
    //send a signed cookie
});

function sendCookie(email, req, res) {
    const options = {
        maxAge : 1000 * 60 * 60 * 24,
        httpOnly : true,
        signed : true
    }
    res.cookie('signed-in', email, options);
}


router.get('/signin', (req, res) => {
    res.render('../views/signin.ejs');
});
router.get('/signup', (req, res) => {
    res.render('../views/signup');
});
router.get('/logout', (req, res)  => {
    res.clearCookie('signed-in');
    res.send("okay logged out");
})
module.exports = router;