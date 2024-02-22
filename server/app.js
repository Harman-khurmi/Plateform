const express = require('express');
const app = express();
const authRouter = require('./router/auth-router');
const qrRouter = require('./router/qr-router');
const classRouter = require('./router/class-router');
const attendanceRouter = require('./router/attendance-router');
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

app.use('/api/auth/', authRouter)
app.use('/api/qr/', qrRouter)
app.use('/api/classes/', classRouter)
app.use('/api/attendance/', attendanceRouter)

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

