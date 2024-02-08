const express = require('express');
const User = require('../models/user-model');
const PORT = 3001;

const home = async (req, res) => {
    try {
        res.status(200).send(`welcome to port :${PORT}`)
    } catch (error) {
        res.status(400).send({ msg: 'not found' });
    }
}

const register = async (req, res) => {
    try {
        const { password, name, rollnumber, hostelname, amount } = req.body;
        const userExist = await User.findOne({ rollnumber });
        if (userExist) { return res.send(`Room already occupied by ${name}`); }
        userCreate = await User.create({ password, name, rollnumber, hostelname, amount });
        if (userCreate) return res.status(200).json({
            msg: "created successfully",
            token: await userCreate.generateToken(),
            userId: userCreate._id.toString(),
        });
    } catch (error) {
        res.status(400).send({ msg: 'not found register' });
    }
}

const login = async (req, res) => {
    try {
        const { rollnumber, password } = req.body;
        const userExist = await User.findOne({ rollnumber });
        if (!userExist) { return res.send('Please register your room first'); }
        const isPassValid = await userExist.compPass(password);
        if (isPassValid) {
            return res.status(200).json({
                msg: "Login successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(400).json({ msg: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(400).send({ msg: 'not found login' });
    }
}
module.exports = { home, register, login };