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
import { CiHeart } from "react-icons/ci";
import { getSelectProperty } from "../../state/selectProperty";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";


function Cards() {
  const [refreshDelete, setRefreshDelete] = useState(true);
  const [properties, setProperties] = useState([]);
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state.properties);
  const location = useSelector((state) => state.location);
  const category = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("STATE", state);
  console.log("CATEGORIAS", category);

  const handleEdit = (house) => {
    console.log(house)

    dispatch(getSelectProperty(house))
  navigate("/edit-property")}
   

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
    console.log("Location=>", location);
    console.log("category=>", category);

    if (!location && !category) {
      axios
        .get(`${axiosURL}/api/properties`)
        .then((propiedades) => {
          const filterByState = propiedades.data.filter((house) => {
            return house.state == state; //venta o alquiler;
            //ahora necesito category y location
          });
          console.log("PROPIEDADES", propiedades.data);
          setProperties(filterByState);
        })
        .catch((err) => console.log(err));
    }
    if (location) {
      axios
        .get(`${axiosURL}/api/properties//search/${location}/${state}`)
        .then((properties) => {
          console.log("Properties location", properties.data);
          setProperties(properties.data);
        });
    }
    if (category) {
      axios
        .get(`${axiosURL}/api/properties/filter-category/${category}/${state}`)
        .then((properties) => {
          console.log("Properties location", properties.data);
          setProperties(properties.data);
        });
    }
  }, [refreshDelete, state, category, location]);

  return (
    <Container>
      <Row>
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
                    {user.is_admin ? (
                      <Row>
                        <Col md={5}>
                          <Button
                            onClick={() => {
                              handleEdit(house);
                            }}
                       
                            style={{
                              borderRadius: "25px",
                              marginTop: "10px",
                              marginRight: "5px",
                              marginBottom: "10px",
                              marginLeft: "5px",
                            }}
                          >
                            Editar
                          </Button>

                        </Col>
                        <Col md={5}>
                          <Button
                            onClick={() => {
                              handleDelete(house.id);
                            }}
                            style={{
                              borderRadius: "25px",
                              marginTop: "10px",
                              marginRight: "5px",
                              marginBottom: "10px",
                              marginLeft: "5px",
                            }}
                          >
                            Eliminar
                          </Button>
                        </Col>
                      </Row>
                    ) : (
                      <Col className="border border-info p-3 d-flex justify-content-end">
                        <Button className="rounded-circle btn-circle">
                          <CiHeart />
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
                    )}
                  </Row>
                </Col>
              </Row>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
}

export default Cards;
