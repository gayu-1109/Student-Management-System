import axios from "axios";
import { useState } from "react";

function Login({ setAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async () => {
        setError("");

        if (!isValidEmail(email)) {
            setError("Please enter a valid email (example@gmail.com)");
            return;
        }

        if (password.length < 4) {
            setError("Password must be at least 4 characters");
            return;
        }

        setLoading(true);

        try {
            if (isRegister) {
                const res = await axios.post("http://localhost:5000/register", {
                    email,
                    password
                });

                if (res.data.success) {
                    alert("Registered successfully! Please login.");
                    setIsRegister(false);
                } else {
                    setError(res.data.message);
                }
            } else {
                const res = await axios.post("http://localhost:5000/login", {
                    email,
                    password
                });

                if (res.data.success) {
                    setAuth(true);
                } else {
                    setError("Invalid email or password");
                }
            }
        } catch (err) {
            setError("Server error. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
                <p className="subtitle">
                    {isRegister ? "Register to continue" : "Login to your dashboard"}
                </p>

                <label>Email</label>
                <input
                    type="text"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label>Password</label>
                <div className="password-box">
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span onClick={() => setShowPass(!showPass)}>
                        {showPass ? "Hide" : "Show"}
                    </span>
                </div>

                {error && <p className="error">{error}</p>}

                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
                </button>

                <p className="toggle" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister
                        ? "Already have an account? Login"
                        : "New user? Create account"}
                </p>
            </div>
        </div>
    );
}

export default Login;
