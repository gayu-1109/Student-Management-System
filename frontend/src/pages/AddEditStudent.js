// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// function AddEditStudent() {
//     const [form, setForm] = useState({
//         name: "", email: "", course: "", phone: ""
//     });

//     const [success, setSuccess] = useState("");
//     const [searchParams] = useSearchParams();
//     const id = searchParams.get("id");

//     // Load existing student if edit
//     useEffect(() => {
//         if (id) {
//             axios.get(`http://localhost:5000/students/${id}`)
//                 .then(res => setForm(res.data));
//         }
//     }, [id]);

//     const handleSubmit = () => {
//         if (id) {
//             // UPDATE
//             axios.put(`http://localhost:5000/students/${id}`, form)
//                 .then(() => {
//                     setSuccess("Student updated successfully");
//                     setTimeout(() => setSuccess(""), 3000);
//                 });
//         } else {
//             // ADD
//             axios.post("http://localhost:5000/students", form)
//                 .then(() => {
//                     setSuccess("Student added successfully");
//                     setForm({ name: "", email: "", course: "", phone: "" });
//                     setTimeout(() => setSuccess(""), 3000);
//                 });
//         }
//     };

//     return (
//         <div className="form-wrapper">
//             <div className="form-card">

//                 {success && <div className="success-msg">{success}</div>}

//                 <h2>{id ? "Update Student" : "Add New Student"}</h2>

//                 <div className="input-group">
//                     <label>Name</label>
//                     <input
//                         value={form.name}
//                         onChange={e => setForm({ ...form, name: e.target.value })}
//                     />
//                 </div>

//                 <div className="input-group">
//                     <label>Email</label>
//                     <input
//                         value={form.email}
//                         onChange={e => setForm({ ...form, email: e.target.value })}
//                     />
//                 </div>

//                 <div className="input-group">
//                     <label>Course</label>
//                     <select
//                         value={form.course}
//                         onChange={e => setForm({ ...form, course: e.target.value })}
//                     >
//                         <option value="">Select</option>
//                         <option>Computer Science</option>
//                         <option>Data Science</option>
//                         <option>AI & ML</option>
//                         <option>Cyber Security</option>
//                     </select>
//                 </div>

//                 <div className="input-group">
//                     <label>Phone</label>
//                     <input
//                         value={form.phone}
//                         onChange={e => setForm({ ...form, phone: e.target.value })}
//                     />
//                 </div>

//                 <button className="submit-btn" onClick={handleSubmit}>
//                     {id ? "Update Student" : "Save Student"}
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default AddEditStudent;

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function AddEditStudent() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        course: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    // Load student data if edit
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/students/${id}`)
                .then(res => setForm(res.data));
        }
    }, [id]);

    // Validation function
    const validate = () => {
        let newErrors = {};

        // Name
        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        // Email
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else {
            const gmailRegex = /^[^\s@]+@gmail\.com$/;
            if (!gmailRegex.test(form.email)) {
                newErrors.email = "Email must be @gmail.com";
            }
        }

        // Course
        if (!form.course.trim()) {
            newErrors.course = "Course is required";
        }

        // Phone
        if (!form.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(form.phone)) {
                newErrors.phone = "Phone must be 10 digits";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = () => {
        if (!validate()) return;

        if (id) {
            axios.put(`http://localhost:5000/students/${id}`, form)
                .then(() => {
                    setSuccess("Student updated successfully");
                    setTimeout(() => setSuccess(""), 3000);
                });
        } else {
            axios.post("http://localhost:5000/students", form)
                .then(() => {
                    setSuccess("Student added successfully");
                    setForm({ name: "", email: "", course: "", phone: "" });
                    setTimeout(() => setSuccess(""), 3000);
                });
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-card">

                {success && <div className="success-msg">{success}</div>}

                <h2>{id ? "Update Student" : "Add New Student"}</h2>

                {/* Name */}
                <div className="input-group">
                    <label>Name</label>
                    <input
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="input-group">
                    <label>Email</label>
                    <input
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                {/* Course */}
                <div className="input-group">
                    <label>Course</label>
                    <select
                        value={form.course}
                        onChange={e => setForm({ ...form, course: e.target.value })}
                    >
                        <option value="">Select</option>
                        <option>Computer Science</option>
                        <option>Data Science</option>
                        <option>AI & ML</option>
                        <option>Cyber Security</option>
                    </select>
                    {errors.course && <p className="error">{errors.course}</p>}
                </div>

                {/* Phone */}
                <div className="input-group">
                    <label>Phone</label>
                    <input
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                    {id ? "Update Student" : "Save Student"}
                </button>
            </div>
        </div>
    );
}

export default AddEditStudent;
