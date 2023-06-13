import axios from "axios";
import { axiosURL } from "../../settings/url";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./index.css";
import { useSelector } from "react-redux";

function Cards() {
  const [refreshDelete, setRefreshDelete] = useState(true);
  const [properties, setProperties] = useState([]);
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state.properties);
  console.log("STATE", state);

  const handleDelete = (id) => {
    axios
      .delete(`${axiosURL}/api/admin/delete-property/${id}`)
      .then((property) => {
        property.data;
        setRefreshDelete(!refreshDelete);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${axiosURL}/api/properties`)
      .then((propiedades) => {
        const filterByState = propiedades.data.filter((house) => {
          return house.state == state;
        });
        console.log("PROPIEDADES", propiedades.data);
        setProperties(filterByState);
      })
      .catch((err) => console.log(err));
  }, [refreshDelete, state]);

  return (
    <Container>
      {properties.map((house) => {
        return (
          <Card className="m-2" style={{ width: "50%", borderRadius: 0 }}>
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
                      <Button
                        onClick={() => {
                          handleDelete(house.id);
                        }}
                        style={{ borderRadius: "25px" }}
                      >
                        Eliminar
                      </Button>
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
                  <Col className="border border-info p-3 d-flex justify-content-end">
                    <Button
                      variant="outline-info "
                      size="sm"
                      type="submit"
                      style={{ borderRadius: "40px" }}
                    >
                      Fa
                    </Button>
                    <Link to={`/property/${house.id}`}>
                      <Button
                        variant="outline-info"
                        size="md"
                        type="submit"
                        style={{ borderRadius: "25px" }}
                      >
                        ver más
                      </Button>
                    </Link>
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
