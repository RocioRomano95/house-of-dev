import React, { useState } from "react";
//import useInput from "../hooks/useInput";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./index.css" ;
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (<div className="container-fluid" style={{ height: "120px" , width: "100vw" }}>
    <Navbar expand="lg" >
  <Navbar.Brand href="#home" className="mr-auto">House of dev</Navbar.Brand>
  <Form inline >
  <FormControl type="text" placeholder="Buscar" className={`mr-sm-2 rounded-pill ${isSearchExpanded ? 'expanded' : ''}`} onClick={handleSearchClick} />
  </Form>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link href="#alquiler">Alquileres</Nav.Link>
      <Nav.Link href="#venta">En Venta</Nav.Link>
      <Nav.Link href="#citas">Mis Citas</Nav.Link>
      <Nav.Link href="#favoritos">Favoritos</Nav.Link>
      <Nav.Link href="#perfil">Mi Perfil</Nav.Link>
    </Nav>
    <Form inline className="ml-auto">
      <Button variant="outline-Info rounded-pill" className="btn-login">Login</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
</div>)}


export default NavBar;
