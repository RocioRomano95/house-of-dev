import React from 'react'
import axios from "axios";
import { axiosURL } from "../../settings/url";
import NavBar from "../Navbar/NavBar";
import { useEffect, useState } from "react";
import { Form, Container, Button, Card, ListGroup, FormControl } from "react-bootstrap";
import { useSelector , useDispatch} from "react-redux";
import Swal from "sweetalert2";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getSelectProperty } from '../../state/selectProperty';


export default function EditProperty() {

const propertySelected = useSelector((state) => state.propertySelected);
console.log(propertySelected)
const dispatch= useDispatch() ;

  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [locality, setLocality] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [baths, setBaths] = useState("");
  const [square_meters, setSquareMeters] = useState("");
  const [post_date, setPostDate] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  axios
  .put(
    `${axiosURL}/api/admin/edit-property`,
    {description, address, price, image, locality, bedrooms, baths, square_meters, post_date ,state, id:propertySelected.id  },
    { withCredentials: true }
  )
  .then((propertyEdit) => {
    Swal.fire({
      icon: "success",
      title: `Guardado`,
    });
    dispatch(getSelectProperty(propertyEdit.data)); 
  })
  .catch((error) => {
    console.log("error", error);
  }); 
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.value);
  };
  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
  };
  const handleBedroomsChange = (e) => {
    setBedrooms(e.target.value);
  };
  const handleBathsChange = (e) => {
    setBaths(e.target.value);
  };
  const handleSquareMetersChange = (e) => {
    setSquareMeters(e.target.value);
  };
  const handlePostDateChange = (e) => {
    setPostDate(e.target.value);
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    setDescription(propertySelected.description);
    setAddress(propertySelected.address);
    setPrice(propertySelected.price);
    setImage(propertySelected.image);
    setLocality(propertySelected.locality);
    setBedrooms(propertySelected.bedrooms);
    setBaths(propertySelected.baths);
    setSquareMeters(propertySelected.square_meters);
    setPostDate(propertySelected.post_date);
    setState(propertySelected.state);

  }, [propertySelected]);

  return (
    <div className="caja1">
      <NavBar />
      <Container fluid>
       
        <Form onSubmit={handleSubmit}> 
        <Row>
          <Col sm={6}>
           <img src={image} type="url" rounded className="my-5 border rounded" style={{ float: 'left', width: '100%' }}
              variant="top"/>
          </Col>
          <Col md={1} />
          <Col sm={4} >
            <ListGroup className="my-5 " /* variant="flush" */>
              <ListGroup.Item
                style={{ fontFamily: "Montserrat", color: "#123AC8" }}
              >
                $
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                  }}
                  onChange={handlePriceChange}
                  value={price}
                >
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ fontFamily: "Montserrat", color: "#123AC8" }}
              >
                Descripción:
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                  onChange={handleDescriptionChange}
                  value={description}
                >
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Dirección:
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                  onChange={handleAddressChange}
                  value={address}
                >
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Localidad:
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                  onChange={handleLocalityChange}
                  value={locality}
                >
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Habitaciones:
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                  onChange={handleBedroomsChange}
                  value={bedrooms}
                >
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Baños:
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                  onChange={handleBathsChange}
                  value={baths}
                >
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                M²:
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                  onChange={handleSquareMetersChange}
                  value={square_meters}
                >
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Publicado:
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                  onChange={handlePostDateChange}
                  value={post_date}
                >
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Estado:
                <Form.Control
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                  onChange={handleStateChange}
                  value={state}
                >
                </Form.Control>
              </ListGroup.Item>
            </ListGroup>
            <Row direction="horizontal">
            {/*   <Col xs={8} md={2} /> */}
              <Col xs={1} md={4}>
              </Col>
              <Col xs={8} md={4}>
                <Button className="rounded btn-circle closer-to-top" style={{ marginBottom: '200px' }} type='submit'>Guardar</Button>
              </Col>
              <Col xs={8} md={4} />
            </Row>
          </Col>
          </Row>
          </Form>
       
      </Container>
</div>
  )
}
