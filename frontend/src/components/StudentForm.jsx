import React, { useState } from 'react';
import { toast } from 'react-toastify';

const StudentForm = ({ onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        subject: initialData?.subject || '',
        score: initialData?.score || '',
        progressLevel: initialData?.progressLevel || 'Beginner'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return false;
        }
        if (!formData.subject.trim()) {
            toast.error('Subject is required');
            return false;
        }
        if (!formData.score || formData.score < 0 || formData.score > 100) {
            toast.error('Score must be between 0 and 100');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            if (!initialData) {
                setFormData({
                    name: '',
                    subject: '',
                    score: '',
                    progressLevel: 'Beginner'
                });
            }
            toast.success(initialData ? 'Student updated successfully!' : 'Student added successfully!');
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    disabled={isSubmitting}
                />
            </div>

            <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    disabled={isSubmitting}
                />
            </div>

            <div className="form-group">
                <label htmlFor="score">Score:</label>
                <input
                    type="number"
                    id="score"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    placeholder="Enter score (0-100)"
                    min="0"
                    max="100"
                    disabled={isSubmitting}
                />
            </div>

            <div className="form-group">
                <label htmlFor="progressLevel">Progress Level:</label>
                <select
                    id="progressLevel"
                    name="progressLevel"
                    value={formData.progressLevel}
                    onChange={handleChange}
                    disabled={isSubmitting}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : (initialData ? 'Update Student' : 'Add Student')}
            </button>
        </form>
    );
};

export default StudentForm;
