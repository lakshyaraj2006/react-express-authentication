const express = require('express');
const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/register", async (req, res) => {
    let success = false;
    const { username, email, password, cpassword } = req.body;

    const user = await Users.findOne({
        $or: [{ username: username }, { email: email }]
    })

    if (user) {
        res.json({
            success,
            message: 'Username or email already taken!'
        })
    } else if (password != cpassword) {
        res.json({
            success,
            message: 'Passwords do not match!'
        })
    } else {
        const newUser = Users({
            username: username,
            email: email,
            password: password
        });

        await newUser.save();
        success = true;

        res.json({
            success,
            message: 'User created successfully!'
        })
    }
})

router.post("/login", async (req, res) => {
    let success = false;
    const { username, password } = req.body;

    const user = await Users.findOne({
        username: username
    })

    if (!user) {
        res.json({
            success,
            message: "User was not found!"
        })
    } else if (await user.isPasswordCorrect(password)) {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        success = true;
        res.json({
            success,
            message: "Logged in successfully!",
            accessToken
        })
    } else {
        res.json({
            success,
            message: "Password was incorrect!"
        })
    }
})

router.post('/refresh', async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshtoken) return res.status(401).json({ message: 'Unauthorized' })

    const decodedToken = jwt.verify(
        cookies?.refreshtoken,
        process.env.REFRESH_TOKEN_SECRET,
    )

    const user = await Users.findById(decodedToken.id);
    const accessToken = user.generateAccessToken();

    res.json({ accessToken })
})

router.post('/logout', (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshtoken) return res.sendStatus(204);

    res.clearCookie('refreshtoken', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production"
    });

    res.json({
        message: 'User logged out!'
    })
})

module.exports = router;