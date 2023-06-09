import React from "react";
import { axiosURL } from "../settings/url";
import useInput from "../hooks/useInput";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
    <Card style={{ width: "50%" }}>
      <Form className="container" onSubmit={handleCreate}>
        <div className="row">
          <Form.Group className="mb-3 p-2" controlId="formBasicDescription">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              {...description}
              type="text"
              placeholder="Description"
            />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicAddress">
            <Form.Label>Direccion</Form.Label>
            <Form.Control {...address} type="text" placeholder="name" />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control {...price} type="number" placeholder="price" />
          </Form.Group>
          <Form.Group className="mb-3 p-2 " controlId="formBasicImage">
            <Form.Label>URL imagen</Form.Label>
            <Form.Control {...image} type="url" placeholder="image" />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicLocality">
            <Form.Label>Localidad</Form.Label>
            <Form.Control {...locality} type="text" placeholder="Locality" />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicBedrooms">
            <Form.Label>Habitaciones</Form.Label>
            <Form.Control {...bedrooms} type="number" placeholder="Bedrooms" />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicBaths">
            <Form.Label>Baños</Form.Label>
            <Form.Control {...baths} type="number" placeholder="Baths" />
          </Form.Group>{" "}
          <Form.Group className="mb-3 p-2" controlId="formBasicSquareMeters">
            <Form.Label>Metros cuadrados</Form.Label>
            <Form.Control
              {...square_meters}
              type="number"
              placeholder="Square Meters"
            />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicPostDate">
            <Form.Label>Fecha de publicacion</Form.Label>
            <Form.Control {...post_date} type="date" placeholder="Post date" />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicState">
            <Form.Label>Estado(alquiler o venta)</Form.Label>
            <Form.Control {...state} type="text" placeholder="State" />
          </Form.Group>
          <Button
            className="button-card"
            style={{ background: "#120910" }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default CreateProperty;
