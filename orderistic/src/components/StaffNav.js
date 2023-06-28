import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

function StaffNav({ showForm }) {
  const [error, setError] = React.useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/staff-login");
    } catch (errorName) {
      setError("Failed to log out");
      console.log(errorName);
    }
  }
  return (
    <Navbar style={{boxShadow: "1px 0px 5px 1px rgba(0, 0, 0, 0.05)", backgroundColor: "white"}} className="sticky-top nav-bar">
      <Container>
        <Navbar.Brand as={Link} to="/staff-menu">
          Orderistic
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/staff-menu">
            Home
          </Nav.Link>
        </Nav>
        <Button className="btn" variant="light" onClick={showForm} style={{ backgroundColor: "white", border: "0", boxShadow: "none" }}>Add Item</Button>
        <Button variant="light" onClick={handleLogout} style={{ backgroundColor: "white", border: "0", boxShadow: "none" }}>
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
}

export default StaffNav;
