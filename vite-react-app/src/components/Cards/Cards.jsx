import axios from "axios";
import { axiosURL } from "../../settings/url";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import getAllProperties from "../../state/properties";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./index.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cards() {
  // const dispatch = useDispatch();
  // const properties = useSelector((state) => state.properties);
  const [properties, setProperties] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${axiosURL}/api/properties`)
      .then((propiedades) => {
        console.log("PROPIEDADES", propiedades.data);
        setProperties(propiedades.data);
        // dispatch(getAllProperties(propiedades.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {properties.map((house) => {
        return (
          <Card style={{ width: "50%" }}>
            <Row>
              <Col md={4}>
                <Row>
                  <Card.Img src={house.image} />
                </Row>
                {user.is_admin ? (
                  <Row>
                    <Col md={5}>
                      <Button style={{ borderRadius: "25px" }}>Editar</Button>
                    </Col>
                    <Col md={5}>
                      <Button style={{ borderRadius: "25px" }}>Eliminar</Button>
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
              </Col>

              <Col md={8}>
                <Row>
                  <Col className="border p-3">
                    <Card.Text>${house.price}</Card.Text>
                  </Col>
                  <Col className="border p-3">
                    <Card.Text>{house.locality}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col className="border p-3">
                    <Card.Text>{house.square_meters}m2</Card.Text>
                  </Col>
                  <Col className="border p-3">
                    <Card.Text>{house.bedrooms} dorm.</Card.Text>
                  </Col>
                  <Col className="border p-3">
                    <Card.Text>{house.baths} baños</Card.Text>
                  </Col>
                </Row>

                <Row>
                  <Col className="border p-3">
                    <Card.Text>{house.description}</Card.Text>
                  </Col>
                </Row>

                <Row>
                  <Col className="border border-info p-3">
                    <Card.Text>ver mas y favoritos</Card.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        );
      })}
    </Container>
  );
}

export default Cards;
