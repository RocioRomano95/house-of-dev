import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Image } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosURL } from "../../settings/url";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../state/user";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); //con este hook puedo traer la informacion del usuario
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get(`${axiosURL}/api/users/logout`, { withCredentials: true })
      .then((res) => {
        console.log("LOGOUT", res.data);
        dispatch(setLogOut({}));
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ height: "120px", width: "100vw" }}>
      <Navbar expand="lg">
        <Navbar.Brand href="#home" className="mr-auto">
          <Image src="logoNavbar.png" alt="Logo" className="logo-image" />
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Buscar"
            className={`mr-sm-2 rounded-pill ${
              isSearchExpanded ? "expanded" : ""
            }`}
            onClick={handleSearchClick}
          />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link href="#alquiler">Alquileres</Nav.Link>
            <Nav.Link href="#venta">En Venta</Nav.Link>
            <Nav.Link href="#citas">Mis Citas</Nav.Link>
            <Nav.Link href="#favoritos">Favoritos</Nav.Link>
            <Nav.Link href="#perfil">Mi Perfil</Nav.Link>
          </Nav>
          {user.email ? (
            <Form inline className="ml-auto">
              <Link to="/logout">
                <Button
                  variant="outline-Info rounded-pill"
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </Link>
            </Form>
          ) : (
            <Form inline className="ml-auto">
              <h3> {user.name}</h3>
              <Link to="/login">
                <Button
                  variant="outline-Info rounded-pill"
                  className="btn-login"
                >
                  Log in
                </Button>
              </Link>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
