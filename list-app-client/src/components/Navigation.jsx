import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Navbar className="bg-primary">
      <Container>
        <Navbar.Brand className="text-light">To-Do List</Navbar.Brand>
      </Container>
      <nav>
        <NavLink to="/">Home</NavLink>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </Navbar>
  );
}
