import React, { useEffect, useState } from "react";
import "./acceptVisit.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { axiosURL } from "../../settings/url";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AcceptVisit = () => {
  const [visits, setVisits] = useState([]);
  const [acceptedVisit, setAcceptedVisit] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // Estado para controlar el filtrado

  const fetchAllVisits = () => {
    axios
      .get(`${axiosURL}/api/visits/all-visits`)
      .then((visit) => {
        setVisits(visit.data);
        console.log("VISIT DATA", visit.data);
      })
      .catch((error) => alert("error", error));
  };

  useEffect(() => {
    fetchAllVisits();
  }, [acceptedVisit]);

  console.log("VISITS después del fetch", visits);

  const handleAccept = async (id, index) => {
    try {
      const visitAccepted = await axios.put(
        `${axiosURL}/api/admin/accept-visit`,
        {
          id: id,
          is_booked: true,
        },
        { withCredentials: true }
      );
      // visits[index] = visitAccepted;
      // console.log("VISIT ACCEPTED", visitAccepted);
      // setAcceptedVisit([...acceptedVisit, index]);

      // Actualiza el estado acceptedVisit para agregar el índice de la visita aceptada
      setAcceptedVisit([...acceptedVisit, index]);

      // Filtra las visitas para eliminar la visita aceptada de la lista
      // const filteredVisits = visits.filter(
      //   (visit, visitIndex) => visitIndex !== index
      // );
      // setVisits(filteredVisits);
    } catch (error) {
      console.log("Error", error);
    }
  };

  console.log("acceptedVisit", acceptedVisit);

  const filterVisits = (visit) => {
    if (showHistory) {
      return visit.is_booked;
    } else {
      return !visit.is_booked;
    }
  };

  return (
    <Container>
      <Row>
        <div>
          <div className="d-flex justify-content-end">
            <Link
              style={{ textDecoration: "none", margin: "10px" }}
              onClick={() => setShowHistory(false)}
            >
              Solicitud de citas
            </Link>
            <Link
              style={{ textDecoration: "none", margin: "10px" }}
              onClick={() => setShowHistory(true)}
            >
              Historial de citas
            </Link>
          </div>
          {visits.filter(filterVisits).map((visit, index) => {
            return (
              <Card className="card-visit">
                <Card.Text className="card-text">
                  <Card.Title>Datos de propiedad</Card.Title>

                  <Card.Text>{visit.property.state}</Card.Text>
                  <Card.Text>{visit.property.locality}</Card.Text>
                  <Card.Text>{visit.property.address}</Card.Text>
                  <Card.Text>{visit.property.description}</Card.Text>
                </Card.Text>

                <Card.Text>
                  <Card.Title>Datos de Usuario</Card.Title>

                  <Card.Text>
                    {visit.user.name}
                    {visit.user.lastname}
                  </Card.Text>
                  <Card.Text>{visit.user.phone}</Card.Text>
                  <Card.Text>{visit.user.email}</Card.Text>
                </Card.Text>
                <Card.Text>
                  <Card.Text>{visit.hour}</Card.Text>
                  <Card.Text>{visit.date}</Card.Text>
                </Card.Text>
                <Col key={visit.id}>
                  {visit.is_booked ? (
                    <Card.Text>Visita aceptada</Card.Text>
                  ) : (
                    <>
                      <Card.Text>Visita por aceptar</Card.Text>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleAccept(visit.id, index)}
                        type="submit"
                        style={{ borderRadius: "25px" }}
                      >
                        accept
                      </Button>
                    </>
                  )}
                </Col>
              </Card>
            );
          })}
        </div>
      </Row>
    </Container>
  );
};

export default AcceptVisit;
