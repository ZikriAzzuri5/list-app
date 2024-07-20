import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import NotFound from "./pages/Error/index";
import Home from "./pages/Home/index";
import Add from "./pages/Add/index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navigation />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
