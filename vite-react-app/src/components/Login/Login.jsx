import React from "react";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { axiosURL } from "../../settings/url";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../Login/login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/user";

function Login() {
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      .then((user) => {
        dispatch(setLogin(user.data));
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="login" style={{ height: "100vh", width: "100%" }}>
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
              <Link to="/signup">
                <Card.Link href="#">Registrate aqui</Card.Link>
              </Link>
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
