import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosURL } from "../../settings/url";
import { useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import NavBar from "../Navbar/NavBar";

function userVisits() {
  const user = useSelector((state) => state.user);
  const [visits, setVisits] = useState([]);

  console.log("STATE USER", user);

  useEffect(() => {
    axios
      .get(`${axiosURL}/api/users/user-visits/${user.id}`) //userId
      .then((citas) => {
        console.log("CITAS USUARIO", citas.data);
        setVisits(citas.data);
      })
      .catch((error) => console.log(error));
  }, [user.id]);

  return (
    <>
      <NavBar />
      <Row xs={1} md={3} className="g-4">
        {visits.map((visit) => {
          return (
            <Col key={visit.id}>
              <Card border="primary">
                <Card.Img variant="top" src={visit.property.image} />

                <Card.Body>
                  <Card.Title>{visit.property.address}</Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">
                    Fecha: {visit.date}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Hora: {visit.hour}
                  </Card.Subtitle>
                  <Card.Title>Descripción:</Card.Title>
                  <Card.Text> {visit.property.description}</Card.Text>
                  <span className="position-absolute top-0 end-0 p-2 bg-black text-white">
                    Cita {visit.is_booked ? "Agendada" : "Pendiente"}
                  </span>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default userVisits;
