import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddEditStudent from "./pages/AddEditStudent";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(false);

  if (!auth) return <Login setAuth={setAuth} />;

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar setAuth={setAuth} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/add" element={<AddEditStudent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
