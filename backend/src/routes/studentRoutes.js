const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const studentValidation = require('../middleware/validation');

// GET route for fetching all students
router.get('/', studentController.getAllStudents);

// GET route for fetching a single student
router.get('/:id', studentController.getStudent);

// POST route for adding a new student
router.post('/', studentValidation, studentController.addStudent);

// PUT route for updating a student
router.put('/:id', studentValidation, studentController.updateStudent);

// DELETE route for removing a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;