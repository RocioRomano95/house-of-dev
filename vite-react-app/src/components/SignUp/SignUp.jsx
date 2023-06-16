import React from "react";
import useInput from "../../hooks/useInput";
import axios from "axios";
import { axiosURL } from "../../settings/url";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./index.css";
import Swal from "sweetalert2";

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
<<<<<<< HEAD
          lastName: lastName.value,
=======
<<<<<<< HEAD
          lastname: lastname.value,
=======
          lastname: lastName.value,
>>>>>>> refs/remotes/origin/develop
>>>>>>> develop
          password: password.value,
          phone: phone.value,
          email: email.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RES DE LOGIN", res.data.email);
        Swal.fire({
          icon: "success",
          title: `Tu registro se ha realizado con éxito`,
        });
        navigate("/login");
      })
      .catch((error) => {
        if (email.value) {
          Swal.fire({
            icon: "error",
            title: `El email ya se encuentra registrado`,
          });
        }
        console.log(error);
      });
  };

  return (
    <div className="signup" style={{ height: "100vh", width: "100%" }}>
      <div className="col1" style={{ height: "100%", width: "40%" }}></div>
      <div className="card-float" style={{ width: "15em" }}>
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
                  {...name}
                  type="text"
                  placeholder="Nombre"
                  style={{ borderRadius: "25px" }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  required
                  {...lastName}
                  type="text"
                  placeholder="Apellido"
                  style={{ borderRadius: "25px" }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  required
                  {...email}
                  type="text"
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  required
                  {...phone}
                  type="text"
                  placeholder="Celular"
                  style={{ borderRadius: "25px" }}
                />
              </Form.Group>
              <div className="col-12">
                <Button
                  variant="outline-info"
                  size="lg"
                  type="submit"
                  style={{ borderRadius: "25px" }}
                >
                  Sing up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className="col3" style={{ height: "100%", width: "60%" }}>
        <img
          style={{ height: "100%", width: "100%" }}
          src="Maskgroup.png"
          alt="House"
        />
      </div>
    </div>
  );
}
