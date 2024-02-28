const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Hellothisiskey"

const defaultClassIds = [
    new mongoose.Types.ObjectId('65d488472f35b5b5192e3519'),
    new mongoose.Types.ObjectId('65d488f28ac01c02a4502159'),
    new mongoose.Types.ObjectId('65d4894866852d44f86a814c')
];

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
        require: true,
        unique: true
    },
    hostelname: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        default: 25000
    },
    role: {
        type: String,
        enum: ['instructor', 'student'],
        default: 'student'
    },
    classes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        }],
        default: defaultClassIds
    }
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
                role: this.role,
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