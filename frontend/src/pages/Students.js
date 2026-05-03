// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Students() {
//     const [students, setStudents] = useState([]);

//     const loadData = () => {
//         axios.get("http://localhost:5000/students")
//             .then(res => setStudents(res.data));
//     };

//     useEffect(() => { loadData(); }, []);

//     const deleteStudent = (id) => {
//         axios.delete(`http://localhost:5000/students/${id}`)
//             .then(() => loadData());
//     };

//     return (
//         <>
//             <h1>Students</h1>
//             <table>
//                 <tr>
//                     <th>Name</th><th>Email</th><th>Course</th><th>Actions</th>
//                 </tr>
//                 {students.map(s => (
//                     <tr key={s.id}>
//                         <td>{s.name}</td>
//                         <td>{s.email}</td>
//                         <td>{s.course}</td>
//                         <td>
//                             <Link to={`/add?id=${s.id}`}>Edit</Link>
//                             <button onClick={() => deleteStudent(s.id)}>Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//             </table>
//         </>
//     );
// }

// export default Students;










import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Student.css';

function Students() {
    const [students, setStudents] = useState([]);
    const [success, setSuccess] = useState("");

    const loadData = () => {
        axios.get("http://localhost:5000/students")
            .then(res => setStudents(res.data));
    };

    useEffect(() => { loadData(); }, []);

    const deleteStudent = (id) => {
        axios.delete(`http://localhost:5000/students/${id}`)
            .then(() => {
                setSuccess("Student deleted successfully");
                loadData();
                setTimeout(() => setSuccess(""), 3000);
            });
    };

    return (
        <div className="students-page">
            <div className="page-header">
                <h1>Students</h1>
                <Link to="/add" className="add-btn">+ Add Student</Link>
            </div>

            {success && <div className="success-msg">{success}</div>}

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map(s => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.course}</td>
                                <td className="actions">
                                    <Link to={`/add?id=${s.id}`} className="edit-btn">Edit</Link>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteStudent(s.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {students.length === 0 && (
                    <p className="empty">No students found</p>
                )}
            </div>
        </div>
    );
}

export default Students;
