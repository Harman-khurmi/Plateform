const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connectDB = require('./utils/db');
const port = 3001;
const mongoose = require('mongoose');
const cors = require('cors')

// const corsOptions = {
//     origin: "http://localhost:5173",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true,
// };

// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

app.use('/api/auth/', router)

if (mongoose.connect('mongodb+srv://robert:robert1002@cluster0.eetagrv.mongodb.net/digital_mess?retryWrites=true&w=majority')) {
    console.log("connection successful to DB");
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

