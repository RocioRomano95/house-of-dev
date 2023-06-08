import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { axiosURL } from "../../settings/url";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

const PropertyDetail = () => {
  const [property, setProperty] = useState({});
  const { id } = useParams();

  console.log("ID PROPERTY", id);

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
          <ListGroup.Item>{property.address}</ListGroup.Item>
          <ListGroup.Item>{property.price}</ListGroup.Item>
          <ListGroup.Item>{property.locality}</ListGroup.Item>
          <ListGroup.Item>{property.bedrooms}</ListGroup.Item>
          <ListGroup.Item>{property.baths}</ListGroup.Item>
          <ListGroup.Item>{property.square_meters}</ListGroup.Item>
          <ListGroup.Item>{property.post_date}</ListGroup.Item>
          <ListGroup.Item>{property.state}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default PropertyDetail;
