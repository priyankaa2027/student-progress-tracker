import React from 'react';
import { toast } from 'react-toastify';

const StudentList = ({ students, onEdit, onDelete, isLoading }) => {
    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await onDelete(studentId);
                toast.success('Student deleted successfully!');
            } catch (error) {
                toast.error('Failed to delete student');
            }
        }
    };

    if (isLoading) {
        return <div className="loading">Loading students...</div>;
    }

    if (students.length === 0) {
        return <div className="no-data">No students found.</div>;
    }

    return (
        <div className="student-list">
            <h2>Student Progress List</h2>
            <div className="student-grid">
                {students.map((student) => (
                    <div key={student._id} className="student-card">
                        <h3>{student.name}</h3>
                        <div className="student-info">
                            <p><strong>Subject:</strong> {student.subject}</p>
                            <p><strong>Score:</strong> {student.score}%</p>
                            <p><strong>Level:</strong> {student.progressLevel}</p>
                        </div>
                        <div className="student-actions">
                            <button 
                                onClick={() => onEdit(student)}
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(student._id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentList;