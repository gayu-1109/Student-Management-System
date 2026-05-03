import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/students")
            .then(res => setStudents(res.data));
    }, []);

    return (
        <>
            <h1>Dashboard</h1>
            <div className="cards">
                <div className="card">Total Students: {students.length}</div>
                <div className="card">Total Courses: 4</div>
                <div className="card">Active Users: 1</div>
            </div>
        </>
    );
}

export default Dashboard;
