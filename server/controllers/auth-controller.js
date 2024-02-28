const express = require('express');
const User = require('../models/user-model');
const PORT = 3001;


const validateSignUp = async (password, name, rollnumber, hostelname) => {
    const errors = {};
    if (!name) {
        errors.name = "Name is required";
    }

    if (!rollnumber) {
        errors.rollnumber = "Roll number is required";
    } else if (isNaN(rollnumber)) {
        errors.rollnumber = "Rollnumber must be a number";
    } else if (rollnumber < 100000000 || rollnumber > 999999999) {
        errors.rollnumber = "Rollnumber should be of 9 digits";
    }

    if (!hostelname) {
        errors.hostelname = "Hostel name is required";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.trim().length < 8) {
        errors.password = "Password should be at least 8 characters long";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/.test(password)) {
        errors.password = "Password must have at least 1 capital letter, 1 small letter, 1 digit, and 1 special character";
    }


    if (Object.keys(errors).length > 0) {
        return { errors };
    }
    return null;
}

const checkSignup = async (name) => {
    const errors = {};
    errors.rollnumber = `Room already occupied by ${name}`;
    return { errors };
}


const validateLogin = async (rollnumber, password) => {
    const errors = {};

    if (!rollnumber) {
        errors.rollnumber = "Roll number is required";
    }
    if (!password) {
        errors.password = "Password is required";
    }
    if (Object.keys(errors).length > 0) {
        return { errors };
    }
    return null;
}

const home = async (req, res) => {
    try {
        res.status(200).send(`Welcome to port :${PORT}`)
    } catch (error) {
        res.status(400).send({ msg: 'Home page not found' });
    }
}

const register = async (req, res) => {
    try {
        const { password, name, rollnumber, hostelname, amount } = req.body;

        const validationErrors = await validateSignUp(password, name, rollnumber, hostelname);
        if (validationErrors) {
            return res.status(422).json({ errors: validationErrors });
        }

        const userExist = await User.findOne({ rollnumber });
        if (userExist) {
            const checkres = await checkSignup(userExist.name);
            return res.status(422).json({ errors: checkres });
        }

        userCreate = await User.create({ password, name, rollnumber, hostelname, amount });
        if (userCreate) return res.status(200).json({
            msg: "Registration Successfull",
            token: await userCreate.generateToken(),
            userId: userCreate._id.toString(),
        });
    } catch (error) {
        res.status(400).send({ msg: 'Register not found' });
    }
}

const login = async (req, res) => {
    try {
        const { rollnumber, password } = req.body;
        const validationErrors = await validateLogin(rollnumber, password);
        if (validationErrors) {
            return res.status(422).json({ errors: validationErrors });
        }
        const userExist = await User.findOne({ rollnumber });
        if (!userExist) {
            return res.status(422).json({ error: 'Please register your room first' });
        }
        const isPassValid = await userExist.compPass(password);
        if (isPassValid) {
            return res.status(200).json({
                msg: "Login successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                role: userExist.role
            });
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(400).send({ msg: 'Login not found backend' });
    }
}
module.exports = { home, register, login };