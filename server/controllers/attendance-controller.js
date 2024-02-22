const express = require('express');
const Attendance = require('../models/attendance-model');
const User = require('../models/user-model');

// Create a new attendance record
const markAttendance = async (req, res) => {
    try {
        // Extract the class ID from the QR code (assuming it's included in the request body)
        const { classId, studentId } = req.body;

        // Check if the class ID and student ID are provided
        if (!classId || !studentId) {
            return res.status(400).json({ message: 'Class ID and Student ID are required' });
        }

        // Find the student by ID
        const student = await User.findById(studentId);

        // Check if the student exists
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check if the student is enrolled in the specified class
        if (!student.classes.includes(classId)) {
            return res.status(400).json({ message: 'Student is not enrolled in the specified class' });
        }

        // Check if the attendance record already exists for the student in the specified class
        let attendance = await Attendance.findOne({ class: classId, student: studentId });

        // If attendance record doesn't exist, create a new attendance record and mark status as "absent"
        if (!attendance) {
            attendance = new Attendance({
                class: classId,
                student: studentId,
                status: 'absent'
            });
        }

        // Mark the student as present
        attendance.status = 'present';
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
