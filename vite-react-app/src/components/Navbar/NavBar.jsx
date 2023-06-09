import React, { useState } from "react";
//import useInput from "../hooks/useInput";
import { Navbar, Nav, Form, FormControl, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
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
      {user.is_admin ? (
        <Navbar expand="lg" className="navbar-admin">
          <Navbar.Brand href="#home" className="mr-auto custom-svg-container">
            <Image src="Group177.svg" alt="Logo" className="logo-image" />
          </Navbar.Brand>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Buscar"
              className={`mr-sm-2 rounded-pill custom-input ${
                isSearchExpanded ? "expanded" : ""
              }`}
              onClick={handleSearchClick}
            />
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link className="navbar-link" href="">
                Propiedades
              </Nav.Link>
              <Nav.Link className="navbar-link" href="">
                Mis citas
              </Nav.Link>
              <Nav.Link className="navbar-link" href="">
                Historial de citas
              </Nav.Link>
            </Nav>
            <Form inline className="ml-auto">
              <Link to="/logout">
                <Button
                  variant="outline-Info rounded-pill"
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </Link>
              {/*   <h4>{user.name}</h4> */}
            </Form>

          ) : (
            <Form inline className="ml-auto">
              <Link to="/login">
                <Button
                  variant="outline-Info rounded-pill"
                  className="btn-login"
                  type="submit"
                >
                  Iniciar sesión
                </Button>
              </Link>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>

          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar expand="lg" className="custom-navbar">
          <Navbar.Brand href="#home" className="mr-auto custom-svg-container">
            <Image src="Group177.svg" alt="Logo" className="logo-image" />
          </Navbar.Brand>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Buscar"
              className={`mr-sm-2 rounded-pill custom-input ${
                isSearchExpanded ? "expanded" : ""
              }`}
              onClick={handleSearchClick}
            />
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link className="navbar-link" href="#alquiler">
                Alquiler
              </Nav.Link>
              <Nav.Link className="navbar-link" href="#venta">
                En venta
              </Nav.Link>
              <Nav.Link className="navbar-link" href="#citas">
                Mis citas
              </Nav.Link>
              <Nav.Link className="navbar-link" href="#favoritos">
                Favoritos
              </Nav.Link>
              <Nav.Link className="navbar-link" href="#perfil">
                Mi perfil
              </Nav.Link>
            </Nav>
            {user.email ? (
              <Form inline className="ml-auto">
                <Link to="/logout">
                  <Button
                    variant="outline-Info rounded-pill"
                    className="btn-logout"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
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
                    Iniciar sesión
                  </Button>
                </Link>
              </Form>
            )}
          </Navbar.Collapse>
        </Navbar>
      )}

    </div>
  );
}

export default NavBar;
