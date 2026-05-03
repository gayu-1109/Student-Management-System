import { Link, useLocation } from "react-router-dom";

function Sidebar({ setAuth }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar">
            <h2 className="logo">Student Management System</h2>

            <div className="menu">
                <Link className={isActive("/") ? "menu-item active" : "menu-item"} to="/">
                    📊 Dashboard
                </Link>

                <Link className={isActive("/students") ? "menu-item active" : "menu-item"} to="/students">
                    👨‍🎓 Students
                </Link>

                <Link className={isActive("/add") ? "menu-item active" : "menu-item"} to="/add">
                    ➕ Add Student
                </Link>
            </div>

            <div className="logout-box">
                <button onClick={() => setAuth(false)}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
