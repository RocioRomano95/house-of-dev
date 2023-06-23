import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { axiosURL } from "../../settings/url";
import "./addVisits.css";

const AddVisits = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log("ID", id);
    const visitData = {
      userId: user.id,
      date: formData.get("date"),
      hour: formData.get("time"),
      propertyId: id,
    };

    axios
      .post(`${axiosURL}/api/visits/create/${id}`, visitData)
      .then((visit) => {
        console.log("CREATE VISIT", visit.data);
        // Realizar cualquier acción necesaria después de agendar la cita
        alert("solicitaste tu visita, se te enviara un correo cuando confirme");
        navigate("/");
      })
      .catch((error) => {
        if (error.response.data == "Ya existe una cita") {
          alert("ya has creado una cita con esta propiedad");
        }
      });
  };

  return (
    <Container className="m-3 d-flex justify-content-center">
      <Card className="card-visit" style={{ width: "70%" }}>
        <Form onSubmit={handleSubmit}>
          <Card.Title>Agenda tu cita</Card.Title>
          <Form.Group>
            <Form.Label>Usuario : </Form.Label>
            <br />
            <Form.Control type="hidden" name="userId" />
            <span>{user.name}</span>
          </Form.Group>
          <hr />
          <Form.Group>
            <Form.Label>Propiedad nº:</Form.Label>
            <Form.Control type="hidden" name="propertyId" />
            <span>{id} </span>
          </Form.Group>
          <hr />
          <Form.Group>
            <Form.Label>Elige una fecha</Form.Label>
            <Form.Control type="date" name="date" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Elige un horario</Form.Label>
            <Form.Control type="time" name="time" />
          </Form.Group>
          <Button type="submit">Agendar</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddVisits;
