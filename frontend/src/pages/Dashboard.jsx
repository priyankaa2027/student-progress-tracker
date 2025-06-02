import React, { useEffect, useState } from 'react';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Dashboard.css';

const BACKEND_URL = 'http://localhost:5000';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/students`);
            setStudents(response.data.data || []);
            setIsLoading(false);
        } catch (err) {
            toast.error('Error fetching students. Please try again.');
            console.error('Error:', err);
            setIsLoading(false);
        }
    };

    const handleAddStudent = async (formData) => {
        try {
            await axios.post(`${BACKEND_URL}/api/students`, formData);
            fetchStudents();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to add student');
        }
    };

    const handleUpdateStudent = async (formData) => {
        try {
            await axios.put(`${BACKEND_URL}/api/students/${selectedStudent._id}`, formData);
            setSelectedStudent(null);
            fetchStudents();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to update student');
        }
    };

    const handleDeleteStudent = async (studentId) => {
        try {
            await axios.delete(`${BACKEND_URL}/api/students/${studentId}`);
            fetchStudents();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to delete student');
        }
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Student Progress Tracker</h1>
            </header>

            <main className="dashboard-content">
                <section className="form-section">
                    <h2>{selectedStudent ? 'Edit Student' : 'Add New Student'}</h2>
                    <StudentForm 
                        onSubmit={selectedStudent ? handleUpdateStudent : handleAddStudent}
                        initialData={selectedStudent}
                    />
                    {selectedStudent && (
                        <button 
                            className="cancel-btn"
                            onClick={() => setSelectedStudent(null)}
                        >
                            Cancel Edit
                        </button>
                    )}
                </section>

                <section className="list-section">
                    <StudentList 
                        students={students}
                        onEdit={handleEdit}
                        onDelete={handleDeleteStudent}
                        isLoading={isLoading}
                    />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;