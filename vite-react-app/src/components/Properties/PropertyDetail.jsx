import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { axiosURL } from "../../settings/url";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";


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
    <>
    <Card style={{ width: "18rem" }}>
      <Card.Title>Title</Card.Title>
      <ListGroup variant="flush">
        <ListGroup.Item>{property.description}</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>
  </>
  )
};

export default PropertyDetail;