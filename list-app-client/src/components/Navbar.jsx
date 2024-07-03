import { NavLink } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
const Navigation = () => {
  return (
    <Navbar className="bg-primary">
      <Container>
        <Navbar.Brand className="text-light">To-Do List</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
