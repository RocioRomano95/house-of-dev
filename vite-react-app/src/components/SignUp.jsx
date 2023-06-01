import React from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import { axiosURL } from "../settings/url";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function SignUp() {
  const name = useInput();
  const lastName = useInput();
  const password = useInput();
  const phone = useInput();
  const email = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${axiosURL}/api/users/signup`,
        {
          name: name.value,
          lastName: lastName.value,
          password: password.value,
          phone: phone.value,
          email: email.value,
        },
        { withCredentials: true }
      )
      .then((res) => navigate("/"))
      .catch((error) => console.log(error));
  };

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control required {...name} type="text" placeholder="Nombre" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            required
            {...lastName}
            type="text"
            placeholder="Apellido"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control required {...email} type="text" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            required
            {...password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control required {...phone} type="text" placeholder="Celular" />
        </Form.Group>
        <div className="col-12">
          <Button variant="outline-info" size="lg" type="submit">
            Sing up
          </Button>
        </div>
      </Form>
    </Card>
  );
}
