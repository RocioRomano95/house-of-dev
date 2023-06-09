import React from "react";
import { axiosURL } from "../settings/url";
import useInput from "../hooks/useInput";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useNavigate } from "react-router";
import axios from "axios";

function CreateProperty() {
  const description = useInput();
  const address = useInput();
  const price = useInput();
  const image = useInput();
  const locality = useInput();
  const bedrooms = useInput();
  const baths = useInput();
  const square_meters = useInput();
  const post_date = useInput();
  const state = useInput();

  const navigate = useNavigate();

  const handleCreate = () => {
    axios
      .post(`${axiosURL}/api/admin/create`, {
        description: description.value,
        address: address.value,
        price: price.value,
        image: image.value,
        locality: locality.value,
        bedrooms: bedrooms.value,
        baths: baths.value,
        square_meters: square_meters.value,
        post_date: post_date.value,
        state: state.value,
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container
      className="d-flex justify-content-center p-3"
      style={{ fontSize: "0.9em" }}
    >
      <Card style={{ width: "80%", borderRadius: 0 }}>
        <h3>Crear Propiedad</h3>
        <Form className="container" onSubmit={handleCreate}>
          <div className="row">
            <Form.Group className="p-2" controlId="formBasicDescription">
              <Row>
                <Col md={3}>
                  <Form.Label>Descripcion</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    {...description}
                    type="text"
                    placeholder="description"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="p-2" controlId="formBasicAddress">
              <Row>
                <Col md={3}>
                  <Form.Label>Direccion</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    {...address}
                    type="text"
                    placeholder="address"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="p-2" controlId="formBasicPrice">
              <Row>
                <Col md={3}>
                  <Form.Label>Precio</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control {...price} type="number" placeholder="price" />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="p-2 " controlId="formBasicImage">
              <Row>
                <Col md={3}>
                  <Form.Label>URL imagen</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control {...image} type="url" placeholder="image" />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="p-2" controlId="formBasicLocality">
              <Row>
                <Col md={3}>
                  <Form.Label>Localidad</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    {...locality}
                    type="text"
                    placeholder="locality"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="p-2" controlId="formBasicBedrooms">
              <Row>
                <Col md={3}>
                  <Form.Label>Habitaciones</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    {...bedrooms}
                    type="number"
                    placeholder="bedrooms"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="p-2" controlId="formBasicBaths">
              <Row>
                <Col md={3}>
                  <Form.Label>Baños</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control {...baths} type="number" placeholder="baths" />
                </Col>
              </Row>
            </Form.Group>{" "}
            <Form.Group className="p-2" controlId="formBasicSquareMeters">
              <Row>
                <Col md={3}>
                  <Form.Label>Metros cuadrados</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    {...square_meters}
                    type="number"
                    placeholder="square meters"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="p-2" controlId="formBasicPostDate">
              <Row>
                <Col md={3}>
                  <Form.Label>Fecha de publicacion</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control
                    {...post_date}
                    type="date"
                    placeholder="post date"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="p-2" controlId="formBasicState">
              <Row>
                <Col md={3}>
                  <Form.Label>Estado(alquiler o venta)</Form.Label>
                </Col>
                <Col md={9}>
                  <Form.Control {...state} type="text" placeholder="state" />
                </Col>
              </Row>
            </Form.Group>
            <Button
              className="button-card"
              style={{ background: "#123ac8" }}
              type="submit"
            >
              Listo!
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default CreateProperty;
