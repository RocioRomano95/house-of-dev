import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { axiosURL } from "../../settings/url";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../Navbar/NavBar.jsx";
import Container from "react-bootstrap/Container";
import "./index.css";

import { HiOutlineMapPin } from "react-icons/hi2";


const PropertyDetail = () => {
  const [property, setProperty] = useState({});
  const { id } = useParams();

  const fetchProperties = (id) => {
    axios
      .get(`${axiosURL}/api/properties/${id}`)
      .then((fetchedProperties) => {
        setProperty(fetchedProperties.data);
        console.log("fetched property", fetchedProperties.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProperties(id);
  }, []);

  return (
    <div className="container d-flex flex-column min-vh-100">
      <NavBar className="h-100" />

      <Container>
      <Row>
        <Col sm={8}><Card.Img variant="top" src={property.image} /></Col>
        <Col sm={4}>  <ListGroup variant="flush" >
           <ListGroup.Item > <span style={{ fontWeight: 'bold' }}>$ </span>{property.price}</ListGroup.Item>
            <ListGroup.Item> <span style={{ fontWeight: 'bold' }}>Descripción: </span>{property.description}</ListGroup.Item>
            <ListGroup.Item> <span style={{ fontWeight: 'bold' }}>Dirección: </span>{property.address}</ListGroup.Item>
            <ListGroup.Item> <span style={{ fontWeight: 'bold' }}>Localidad: </span>{property.locality}</ListGroup.Item>
            <ListGroup.Item> <span style={{ fontWeight: 'bold' }}>Habitaciones: </span>{property.bedrooms}</ListGroup.Item>
            <ListGroup.Item> <span style={{ fontWeight: 'bold' }}>Baños: </span> {property.baths}</ListGroup.Item>
            <ListGroup.Item> <span style={{ fontWeight: 'bold' }}>M²:</span> {property.square_meters}</ListGroup.Item>
            <ListGroup.Item> <span style={{ fontWeight: 'bold' }}>Publicado:</span> {property.post_date}</ListGroup.Item>
            <ListGroup.Item> <span style={{ fontWeight: 'bold' }}>Estado: </span> {property.state}</ListGroup.Item>
          </ListGroup> </Col>
      </Row>
      </Container>
    </div>
  );
};

export default PropertyDetail;
