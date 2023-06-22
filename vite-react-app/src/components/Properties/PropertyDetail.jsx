import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { axiosURL } from "../../settings/url";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../Navbar/NavBar";
import Container from "react-bootstrap/Container";
import Footer from "../Footer/Footer";
import { Button } from "react-bootstrap";
import "./index.css";
import { CiHeart } from "react-icons/ci";

const PropertyDetail = () => {
  const [property, setProperty] = useState({});
  const { id } = useParams();

  const fetchProperties = (id) => {
    axios
      .get(`${axiosURL}/api/properties/${id}`)
      .then((fetchedProperty) => {
        setProperty(fetchedProperty.data);
        console.log("fetch property", fetchedProperty.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProperties(id);
  }, []);

  return (
    <div className="caja1">
      <NavBar />
      <Container fluid>
        <Row>
          <Col sm={6}>
            <Card.Img
              className="my-5 border rounded image1"
              variant="top"
              src={property.image}
            />
          </Col>
          <Col md={1} />
          <Col sm={4}>
            <ListGroup className="my-5 " /* variant="flush" */>
              <ListGroup.Item
                style={{ fontFamily: "Montserrat", color: "#123AC8" }}
              >
                $
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                  }}
                >
                  {property.price}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ fontFamily: "Montserrat", color: "#123AC8" }}
              >
                Descripción:
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  {property.description}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Dirección:
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  {property.address}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Localidad:
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  {property.locality}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Habitaciones:
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  {property.bedrooms}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Baños:
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  {property.baths}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                M²:
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  {property.square_meters}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Publicado:
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  {property.post_date}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  fontFamily: "Montserrat",
                  color: "#123AC8",
                }}
              >
                Estado:
                <span
                  style={{
                    fontFamily: "Montserrat",
                    color: "#123AC8",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  {property.state}
                </span>
              </ListGroup.Item>
            </ListGroup>
            <Row direction="horizontal">
              <Col xs={8} md={2} />
              <Col xs={1} md={4}>
                <Button className="rounded-circle btn-circle">
                  <CiHeart />
                </Button>
              </Col>
              <Col xs={8} md={4}>
                <Button
                  variant="outline-primary"
                  size="md"
                  type="submit"
                  style={{ borderRadius: "25px" }}
                >
                  Agendar cita
                </Button>
              </Col>
              <Col xs={8} md={4} />
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer flex-grow-1 />
    </div>
  );
};

export default PropertyDetail;
