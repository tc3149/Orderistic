import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function StaffNav() {
  return (
    <div className="sticky-top">
      <Navbar bg="light" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/staff-dashboard">
            Orderistic
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/staff-dashboard">
              Home
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default StaffNav;
