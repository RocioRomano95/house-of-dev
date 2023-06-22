import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Image,
  Col,
  Row,
} from "react-bootstrap";
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
import { BsPersonCircle } from "react-icons/bs";

function NavBar() {
  const [searchInput, setSearchInput] = useState(""); //Estado para el buscador
  const [categoryToggle, setCategoryToggle] = useState("categorias");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleSearchClick = (e) => {
    //escribo mi locacion
    setSearchInput(e.target.value);
  }; //Esta funcion manejadora lo que hace es que al pasarla por un evento onChange, que esta en mi barra de busqueda, cambia el valor ingresado por el usuario por medio de la propiedad value y con el setsearchInput setea el estado inicial de searchInput quien luego va ser utilizada en el accion(getLocation).

  const handleSubmitClick = (e) => {
    e.preventDefault();
    dispatch(getLocation(searchInput));
    dispatch(getCategories(""));
  }; //Esta funcion es enviado por el evento onsubmit en mi form que es la barra de busqueda, enviando con el dispatch la accion (getLocation) y el estado actual de searchInput que ya fue anteriormente setada por setsearchInput para de esta manera actualizar el estado en la store.

  const handleClick = (state) => {
    dispatch(getState(state)); //alquiler o venta
    navigate("/");
  }; //con el dispatch envio la accion seteada al reducer y asi cambiar el estado estado inicial, esta funcion handleClick la llamo en los links de venta y alquiler en el evento onclik ahi paso por argumento la palabra que quiero que me setee mi action("alquiler", "venta").

  const handleClickFilter = () => {
    //boton limpiar
    dispatch(getCategories("")); //seteo categorias
    dispatch(getLocation("")); //seteo locacion
    setSearchInput(""); //seteo mi buscador
    setCategoryToggle("Categorias"); //seteo mi estado del boton limpiar
  };

  const handleClickCategories = (category) => {
    dispatch(getCategories(category)); //Aqui traigo mis categorias(alquiler, casa, ph, terreno)
    dispatch(getLocation(""));
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
      <Navbar
        expand="lg"
        className={user.is_admin ? "navbar-admin" : "custom-navbar"}
      >
        {" "}
        {}
        <Navbar.Brand>
          <Link to={"/"}>
            <Image src="Group177.svg" alt="Logo" className="logo-image" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Dropdown>
            <Dropdown.Toggle md={4} className="dropdown" id="dropdown-basic">
              {categoryToggle}
            </Dropdown.Toggle>
            <Dropdown.Menu md={4}>
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

          <Form className="d-flex dropdown" inline onSubmit={handleSubmitClick}>
            <FormControl
              value={searchInput}
              type="text"
              placeholder="Indique la zona"
              className="dropdown"
              onChange={handleSearchClick}
            />
            <Button className="dropdown" type="submit">
              Buscar
            </Button>
          </Form>

          <Button className="dropdown" onClick={handleClickFilter}>
            Limpiar
          </Button>

          <Nav className="m-auto">
            <Nav.Link className="navbar-link">
              <p onClick={() => handleClick("alquiler")}>Alquiler</p>
            </Nav.Link>
            <Nav.Link className="navbar-link">
              <p onClick={() => handleClick("venta")}> En venta</p>
            </Nav.Link>
            {user.email ? (
              <>
                <Nav.Link
                  className="navbar-link"
                  href={user.is_admin ? "/accept-visit" : "/user-visits"}
                >
                  Citas
                </Nav.Link>
                <Nav.Link className="navbar-link" href="#favoritos">
                  Favoritos
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
          {user.email ? (
            <>
              <Nav.Link className="navbar-link" href="edit-user">
                <BsPersonCircle className="icono-perfil" />
                {user.name}
              </Nav.Link>

              <Form inline className="ml-auto">
                <Link to="/logout">
                  <Button
                    variant="outline-Info rounded-pill"
                    className=""
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Button>
                </Link>
              </Form>
            </>
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
    </div>
  );
}
export default NavBar;
