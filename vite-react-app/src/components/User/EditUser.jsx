import React from "react";
import axios from "axios";
import NavBar from "../Navbar/NavBar";
import { axiosURL } from "../../settings/url";
import { useEffect, useState } from "react";
import { Form, Container, Button, Card, ListGroup } from "react-bootstrap";
import { setLogin } from "../../state/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./index.css";
import { GoPencil } from "react-icons/go";

export default function EditUser() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${axiosURL}/api/users/edit-user/`,
        { name, lastname, email, phone, id: user.id },
        { withCredentials: true }
      )
      .then((userEdit) => {
        console.log("usuario editado", userEdit);
        Swal.fire({
          icon: "success",
          title: `Edicion exitosa`,
        });
        dispatch(setLogin(userEdit.data)); //envio la informacion a redux
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setLastname(user.lastname);
    setPhone(user.phone);
  }, [user]);

  return (
    <div>
      <NavBar />
      <div>
        <Container className="custom-container ">
          <Card className="gap-3 mb-3 ">
            <Card.Body>
              <Card.Title
                className="d-md-block mb-3"
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Mi perfil
              </Card.Title>
              <ListGroup.Item
                style={{ fontFamily: "Montserrat", color: "#123AC8" }}
              >
                <Form onSubmit={handleSubmit}>
                  <Button
                    className="d-md-block gap-3 mb-3"
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                    }}
                    type="submit"
                  >
                    Editar <GoPencil />
                  </Button>
                  <Card.Img
                    className=" border rounded image1 image-size d-md-block gap-3 mb-3"
                    variant="rigth"
                    onChange={handleImageChange}
                    value={image}
                    src="/fotoPerfil.svg"
                    alt="foto perfil"
                  />
                  Nombre
                  <Form.Control
                    className="d-md-flex gap-10 mb-3"
                    style={{
                      fontFamily: "Montserrat",
                      color: "#123AC8",
                      fontWeight: "bold",
                    }}
                    onChange={handleNameChange}
                    value={name}
                  />
                  Apellido
                  <Form.Control
                    className="d-md-block gap-3 mb-3"
                    style={{
                      fontFamily: "Montserrat",
                      color: "#123AC8",
                      fontWeight: "bold",
                    }}
                    onChange={handleLastnameChange}
                    value={lastname}
                  />
                  Email
                  <Form.Control
                    className="d-md-block gap-3 mb-3"
                    onChange={handleEmailChange}
                    type="email"
                    style={{
                      fontFamily: "Montserrat",
                      color: "#123AC8",
                      fontWeight: "bold",
                    }}
                    value={email}
                  />
                  Telefono
                  <Form.Control
                    className="d-md-block gap-3 mb-3"
                    onChange={handlePhoneChange}
                    style={{
                      fontFamily: "Montserrat",
                      color: "#123AC8",
                      fontWeight: "bold",
                    }}
                    value={phone}
                  />
                </Form>
                {/*  <Card.Img
              className="my-5 border rounded image1"
              variant="top"
              onChange={handleImageChange} value={image}
              src={image}/> */}
                {/*   <Form.Control onChange={handleImageChange} value={image} />
            </Form> */}
              </ListGroup.Item>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
