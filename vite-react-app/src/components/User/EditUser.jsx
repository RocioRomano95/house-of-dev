import React from "react";
import axios from "axios";
import NavBar from "../Navbar/NavBar";
import { axiosURL } from "../../settings/url";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Form, Container, TabContainer, Button, Card } from "react-bootstrap";
import { setLogin } from "../../state/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";


export default function EditUser() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lastname,setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${axiosURL}/api/users/edit-user/`, {name,lastname,email,phone,id:user.id}, {withCredentials: true })
      .then((userEdit) => {
        
        console.log("usuario editado", userEdit);
        Swal.fire({
          icon: "success",
          title: `Edicion exitosa`,
        });
      dispatch(setLogin(userEdit.data));  //envio la informacion a redux
        
      })
      .catch((error) => {
        console.log("error", error);
      });
    }
  
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
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Container fluid>
            <Form className="mb-3" onSubmit={handleSubmit}>
              <Button variant="primary" type="submit">
                Editar
              </Button>
              <Form.Control onChange={handleNameChange} value={name} />
              <Form.Control onChange={handleLastnameChange} value={lastname} />
              <Form.Control onChange={handlePhoneChange} value={phone} />
              <Form.Control
                onChange={handleEmailChange}
                type="email"
                value={email}
              />
              <Form.Control onChange={handleImageChange} value={image} />
            </Form>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}
