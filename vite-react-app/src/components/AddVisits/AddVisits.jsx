import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { axiosURL } from "../../settings/url";

const AddVisits = () => {
  const user = useSelector((state) => state.user);

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
      })
      .catch((error) => {
        if (error.response.data == "Ya existe una cita") {
          alert("ya has creado una cita con esta propiedad");
        }
      });
  };

  return (
    <div>
      <Card>
        <Card.Title>Agenda tu cita</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="hidden" name="userId" value={user.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Propiedad</Form.Label>
            <Form.Control type="hidden" name="propertyId" value={id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" name="date" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hora</Form.Label>
            <Form.Control type="time" name="time" />
          </Form.Group>
          <Button type="submit">Agendar</Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddVisits;
