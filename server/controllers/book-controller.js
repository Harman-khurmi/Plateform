const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance-model');
const User = require('../models/user-model');

const booking = async (req, res) => {
    try {
        const { classIds, rollnumber } = req.body;

        if (!classIds || !Array.isArray(classIds) || classIds.length === 0 || !rollnumber) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const student = await User.findOne({ rollnumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const attendancePromises = classIds.map(async (classId) => {
            const existingBooking = await Attendance.findOne({ class: classId, student: rollnumber });
            if (existingBooking) {
                console.log(`Seat already booked for meal ${classId}`);
            } else {
                const attendance = new Attendance({
                    class: classId,
                    student: student.rollnumber,
                    date: Date.now(),
                    status: 'absent'
                });
                await attendance.save();
                console.log(`Booking successful for meal ${classId}`);
            }
        });

        await Promise.all(attendancePromises);

        res.status(201).json({ message: 'Booked successfully' });
    } catch (error) {
        console.error('Error in booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { booking };
