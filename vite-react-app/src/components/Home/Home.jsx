import React from "react";
import NavBar from "../Navbar/NavBar";
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import "./style.css";

function Home() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <NavBar />
      {user.is_admin ? (
        <>
          <Container>
            <Row className="header-admin">
              <h3
                className="d-flex justify-content-start "
                style={{ textTransform: "uppercase", fontSize: "1.5em" }}
              >
                Propiedades
              </h3>
              <hr />
            </Row>
            <Row>
              <div className="d-flex justify-content-end m-2 p-3">
                <Link to="/create-property">
                  Agregar <br />
                  propiedad
                </Link>
              </div>
            </Row>
          </Container>
        </>
      ) : (
        <></>
      )}
      <Cards />
    </>
  );
}

export default Home;
