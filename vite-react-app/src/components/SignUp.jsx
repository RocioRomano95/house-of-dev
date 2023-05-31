import React from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import { axiosURL } from "../settings";
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
    console.log("name",name.value )
    console.log("lastname", lastName.value)
  

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
      
      .then(() => navigate("/home")) // pendiente:crear ruta p/el navigate
      .cath((error) => console.log(error));
  };

  return (
    <div className="container-fluid p-3" style={{ background: "#2B2D42" }}>
      <Card className="container-fluid p-3 card-form" style={{ width: "50rem" }}>
        <Form className="container" onSubmit={handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 p-2 col-6" controlId="formBasicEmail">
              <div className="container">
                <div className="row">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    {...name}
                    type="text"
                    placeholder="name"
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 p-2" controlId="formBasicEmail">
              <Form.Label>lastname</Form.Label>
              <Form.Control
                required
                {...lastName}
                type="text"
                placeholder="lastName"
              />
            </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicEmail">
              <Form.Label>email</Form.Label>
              <Form.Control
                required
                {...email}
                type="text"
                placeholder="email"
              />
            </Form.Group>
            <Form.Group className="mb-3 p-2 col-8" controlId="formBasicEmail">
              <Form.Label>password</Form.Label>
              <Form.Control
                required
                {...password}
                type="text"
                placeholder="direction"
              />
            </Form.Group>
            <Form.Group className="mb-3 p-2 col-4" controlId="formBasicEmail">
              <Form.Label>phone number</Form.Label>
              <Form.Control
                required
                {...phone}
                type="number"
                placeholder="code"
              />
            </Form.Group>
            <div className="col-12">
              <Button variant="secondary" size="lg" type="submit">
                send
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
  }  