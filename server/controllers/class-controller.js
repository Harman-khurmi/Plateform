const express = require('express');
const Class = require('../models/class-model');

const getall = async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const newClass = await Class.create(req.body);
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getbyid = async (req, res) => {
    try {
        const singleClass = await Class.findById(req.params.id);
        if (!singleClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(singleClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatebyid = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletebyid = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getall, deletebyid, updatebyid, getbyid, create };