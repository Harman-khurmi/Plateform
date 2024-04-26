const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance-model');
const User = require('../models/user-model');

const booking = async (req, res) => {
    try {
        const { classIds, rollnumber, bookingDate } = req.body;

        if (!classIds || !Array.isArray(classIds) || classIds.length === 0 || !rollnumber || !bookingDate) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const student = await User.findOne({ rollnumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const attendancePromises = classIds.map(async (classId) => {
            const existingBooking = await Attendance.findOne({
                class: classId,
                student: rollnumber,
                date: new Date(bookingDate)
            });
            if (existingBooking) {
                console.log(`Seat already booked for meal ${classId}`);
            } else {
                const attendance = new Attendance({
                    class: classId,
                    student: student.rollnumber,
                    bookingDate: new Date(bookingDate), // Convert bookingDate to a Date object
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

const getBooking = async (req, res) => {
    try {
        const rollnumber = parseInt(req.params.rollnumber); // Parse rollnumber as integer

        // Get upcoming bookings including today
        const today = new Date();
        const bookings = await Attendance.find({
            student: rollnumber,
            bookingDate: { $gte: today }
        }).sort({ date: 1 }).populate('class');

        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

module.exports = { booking, getBooking };
