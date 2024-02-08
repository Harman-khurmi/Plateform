const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Hellothisiskey"

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    rollnumber: {
        type: Number,
        require: true
    },
    hostelname: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
});


userSchema.pre('save', async function (next) {
    const user = this

    if (!user.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(user.password, salt);
        user.password = hash_pass;
    } catch (error) {
        next(error);
    }
})


userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                rollNo: this.rollNo,
            },
            SECRET_KEY
        )
    } catch (error) {
        console.error(error);
    }
}

userSchema.methods.compPass = async function (checkPass) {
    try {
        return bcrypt.compare(checkPass, this.password)
    } catch (error) {
        console.error(error);
    }
}

const User = new mongoose.model("User", userSchema);//collection name
module.exports = User;  