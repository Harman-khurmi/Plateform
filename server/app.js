const express = require('express');
const app = express();
const authRouter = require('./router/auth-router');
const qrRouter = require('./router/qr-router');
const classRouter = require('./router/class-router');
const attendanceRouter = require('./router/attendance-router');
const bookingRouter = require('./router/book-router');
const port = 3001;
const mongoose = require('mongoose');
const cors = require('cors')
const SECRET_KEY = "Hellothisiskey"
const User = require('./models/user-model');
const jwt = require('jsonwebtoken');

app.use(cors());

app.use(express.json());

app.use('/api/auth/', authRouter)
app.use('/api/qr/', qrRouter)
app.use('/api/classes/', classRouter)
app.use('/api/attendance/', attendanceRouter)
app.use('/api/main/', bookingRouter)

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// API endpoint to get the roll number
app.get('/api/user/rollnumber', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ rollNumber: user.rollnumber });
    } catch (error) {
        console.error('Error fetching roll number:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


if (mongoose.connect('mongodb+srv://robert:robert1002@cluster0.eetagrv.mongodb.net/digital_mess?retryWrites=true&w=majority'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}) {
    console.log("connection successful to DB");
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

