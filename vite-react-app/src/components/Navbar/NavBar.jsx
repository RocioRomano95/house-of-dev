import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosURL } from "../../settings/url";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../state/user";
import { getState } from "../../state/properties";
import { getLocation } from "../../state/location";
import { getCategories } from "../../state/categories";
import Dropdown from "react-bootstrap/Dropdown";
import useInput from "../../hooks/useInput"; //!Este hook podria usarlarlo en en la funcion handleSearchClick?

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const [categoryToggle, setCategoryToggle] = useState("categorias");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useSelector((state) => state.location);
  const categories = useSelector((state) => state.categories);

  console.log("LOCATION", searchInput);

  const handleSearchClick = (e) => {
    setSearchInput(e.target.value);
    //tigres
  }; //Esta funcion manejadora lo que hace es que al pasarla por un evento onChange, que esta en mi barra de busqueda, cambia el valor ingresado por el usuario por medio de la propiedad value y con el setsearchInput setea el estado inicial de searchInput quien luego va ser utilizada en el accion(getLocation).

  const handleSubmitClick = (e) => {
    e.preventDefault();
    dispatch(getLocation(searchInput));
  }; //Esta funcion es enviado por el evento onsubmit en mi form que es la barra de busqueda, enviando con el dispatch la accion (getLocation) y el estado actual de searchInput que ya fue anteriormente setada por setsearchInput para de esta manera actualizar el estado en la store.

  const handleClick = (state) => {
    dispatch(getState(state)); //alquiler o venta
    navigate("/");
  }; //con el dispatch envio la accion seteada al reducer y asi cambiar el estado estado inicial, esta funcion handleClick la llamo en los links de venta y alquiler en el evento onclik ahi paso por argumento la palabra que quiero que me setee mi action("alquiler", "venta").

  const handleClickFilter = () => {
    dispatch(getCategories(""));
    dispatch(getLocation(""));
    setCategoryToggle("Categorias");
  };

  const handleClickCategories = (category) => {
    dispatch(getCategories(category));
    setCategoryToggle(category);
    setSearchInput("");
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
          <Navbar.Brand
            href="#home"
            className="mr-auto custom-svg-container"
          ></Navbar.Brand>
          {/*     <Form inline onSubmit={handleSearchClick}>
            <FormControl
              type="text"
              placeholder="Buscar"
              className={`mr-sm-2 rounded-pill custom-input`}
               onKeyDown={handleSearchClick} 
            />
          </Form> */}
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
            </Form>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar expand="lg" className="custom-navbar">
          <Navbar.Brand href="#home" className="mr-auto custom-svg-container">
            <Image src="Group177.svg" alt="Logo" className="logo-image" />
          </Navbar.Brand>
          <Form inline onSubmit={handleSubmitClick}>
            <FormControl
              value={searchInput}
              type="text"
              placeholder="Indique la zona"
              className={`mr-sm-2 rounded-pill custom-input`}
              onChange={handleSearchClick}
            />
            <Button type="submit">Search</Button>
          </Form>
          <Button onClick={handleClickFilter}>Sin filtro</Button>

          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {categoryToggle}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleClickCategories("departamento")}
              >
                Departamento
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleClickCategories("ph")}>
                PH
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleClickCategories("casa")}>
                Casa
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleClickCategories("terreno")}>
                Terreno
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link className="navbar-link">
                <p onClick={() => handleClick("alquiler")}>Alquiler</p>
              </Nav.Link>
              <Nav.Link className="navbar-link">
                <p onClick={() => handleClick("venta")}> En venta</p>
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
