import React from "react";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { axiosURL } from "../../settings/url";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../Login/login.css";

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
  /*{/* <div className="color-padre">
        <div className="color1"></div>
        <div className="color3"></div>

        <div className="color2"></div>
      </div> */

  return (
    <div className="container-fluid login" style={{ height: "100vh" }}>
      <div className="col1" style={{ height: "100%", width: "40%" }}></div>
      <div className="card-float container-fluid" style={{ width: "20em" }}>
        <Card className="row p-2" style={{ borderRadius: 0 }}>
          <Card.Img
            style={{ background: "#fe4236", borderRadius: 0 }}
            variant="top"
            src="LogoHOV.png"
          />
          <Card.Body style={{ background: "#ffffff" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  required
                  {...email}
                  type="email"
                  placeholder="Email"
                  style={{ borderRadius: "25px" }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  required
                  {...password}
                  type="password"
                  placeholder="Password"
                  style={{ borderRadius: "25px" }}
                />
              </Form.Group>

              <Button
                style={{ borderRadius: "25px" }}
                type="submit"
                variant="outline-info"
              >
                Login
              </Button>

              <p>¿No tienes cuenta?</p>
              <Card.Link href="#">Registrate aqui</Card.Link>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <div className="col3" style={{ height: "100%", width: "60%" }}>
        <img
          style={{ height: "100%", width: "100%" }}
          src="Maskgroup.png"
          alt="Geek Central Logo"
        />
      </div>
    </div>
  );
}

export default Login;
