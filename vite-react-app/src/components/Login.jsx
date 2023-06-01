import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { axiosURL } from "../settings/url";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Login() {
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${axiosURL}/api/users/login`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              required
              {...email}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              required
              {...password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Card.Body>
            <Button type="submit" variant="outline-info">
              Login
            </Button>
            <p>¿No tienes cuenta?</p>
            <Card.Link href="#">Registrate aqui</Card.Link>
          </Card.Body>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
