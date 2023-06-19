import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useSelector, useState } from "react-redux";
import { axiosURL } from "../../settings/url";
import { useParams } from "react-router";

const Visits = () => {
  const [properties, setProperties] = useState({});
  const user = useSelector((state) => state.user);

  const { id } = useParams();

  const fetchProperties = (id) => {
    axios
      .get(`${axiosURL}/api/visits/create/${id}`)
      .then((properties) => {
        setProperties(properties.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Card>
        <Card.Title>Agenda tu cita</Card.Title>
        <Form>
          <Form.Group>
            <Form.Label>usuario</Form.Label>
            <Form.Control type="hidden" value={user.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Propiedad</Form.Label>
            <Form.Control type="hidden" value={properties.id} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hora</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
          <Button type="submit">Agendar</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Visits;
