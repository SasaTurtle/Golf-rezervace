import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import authService from '../auth/auth.service'
import "bootstrap/dist/css/bootstrap.min.css";

export default function Menu() {

  function logout(e) {
    authService.logout();

  }
  if(localStorage.getItem("user") != null) {
   return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      Golf
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/myreservations">Moje Rezervace</Nav.Link>
            <Nav.Link href="/" onClick={logout}>Odhlásit se</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
   )
  }else{
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Golf
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Registrace</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}
