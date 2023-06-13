import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosURL } from "../../settings/url";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getAllProperties from "../../state/properties";

const Rent_sale = () => {
  // const [filterProperties, setFilterProperities] = useState([]);
  const properties = useSelector((state) => state.properties);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();

  const filerRent_sale = (type) => {
    console.log(type);
    axios
      .get(`${axiosURL}/api/properties`)
      .then((properties) => {
        const filterByRent_sale = properties.data.filter((house) => {
          if (house.state == `${type}`) return house.state;
        });
        console.log("FILTER POR ALQUILER", filterByRent);
        dispatch(getAllProperties(filterByRent_sale));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    filerRent_sale(type);
  }, []);

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

                    <Button
                      variant="outline-info"
                      size="md"
                      type="submit"
                      style={{ borderRadius: "25px" }}
                    >
                      ver más
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        );
      })}
    </Container>
  );
};

export default Rent_sale;
