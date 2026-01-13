
//node.js file for API to show gpa
//comment


const express = require('express');

const app = express();

app.use(express.json());

// Mock student data
const students = [
    { id: 'E001', name: 'Alice Johnson', department: 'Computer Science', gpa: 3.85 },
    { id: 'E002', name: 'Bob Smith', department: 'Computer Science', gpa: 3.72 },
    { id: 'E003', name: 'Charlie Brown', department: 'Electrical Engineering', gpa: 3.91 },
    { id: 'E004', name: 'Diana Prince', department: 'Electrical Engineering', gpa: 3.68 },
    { id: 'E005', name: 'Eve Davis', department: 'Civil Engineering', gpa: 3.79 },
    { id: 'E006', name: 'Frank Miller', department: 'Civil Engineering', gpa: 3.54 },
    { id: 'E007', name: 'Grace Lee', department: 'Mechanical Engineering', gpa: 3.88 },
    { id: 'E008', name: 'Henry Wilson', department: 'Mechanical Engineering', gpa: 3.65 }
];

// API to get all students with their GPAs grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDepartment = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json({
        success: true,
        data: groupedByDepartment
    });
});

// API to get individual student GPA by student ID
app.get('/api/students/:id/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        });
    }

    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});