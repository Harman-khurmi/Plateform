const express = require('express');
const Attendance = require('../models/attendance-model');
const User = require('../models/user-model');

const markAttendance = async (req, res) => {
    try {
        const { classId, rollnumber, bookingDate } = req.body;

        if (!classId || !rollnumber || bookingDate) {
            return res.status(400).json({ message: 'Class ID, Roll Number and Booking Date are required' });
        }

        const student = await User.findOne({ rollnumber: rollnumber });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (!student.classes.includes(classId)) {
            return res.status(400).json({ message: 'Student is not enrolled in the specified class' });
        }

        let attendance = await Attendance.findOne({ class: classId, student: rollnumber, bookingDate });

        if (!attendance) {
            res.status(400).json({ msg: 'booking not there for this meal' });
        }

        attendance.status = 'present';
        // attendance.date = Date.now();
        await attendance.save();

        res.json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all attendance records
const getall = async (req, res) => {
    try {
        const attendances = await Attendance.find();
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get attendance records for a specific class
const getbyclassid = async (req, res) => {
    try {
        const attendances = await Attendance.find({ class: req.params.classId });
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an attendance record by ID
const updatebyid = async (req, res) => {
    try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete an attendance record by ID
const deletebyid = async (req, res) => {
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!deletedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { markAttendance, getall, getbyclassid, deletebyid, updatebyid };
