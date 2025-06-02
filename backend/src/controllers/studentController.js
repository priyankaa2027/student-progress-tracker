const Student = require('../models/student');
const { validationResult } = require('express-validator');

// Get all students
exports.getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find().sort({ name: 1 });
        res.status(200).json({
            status: 'success',
            data: students
        });
    } catch (error) {
        next(error);
    }
};

// Get a single student
exports.getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'Student not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: student
        });
    } catch (error) {
        next(error);
    }
};

// Add a new student
exports.addStudent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        const { name, subject, score, progressLevel } = req.body;
        const newStudent = new Student({
            name,
            subject,
            score,
            progressLevel
        });

        const savedStudent = await newStudent.save();
        res.status(201).json({
            status: 'success',
            data: savedStudent
        });
    } catch (error) {
        next(error);
    }
};

// Update a student
exports.updateStudent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'Student not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: student
        });
    } catch (error) {
        next(error);
    }
};

// Delete a student
exports.deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'Student not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Student deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};