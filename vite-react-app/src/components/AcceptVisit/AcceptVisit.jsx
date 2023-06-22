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
  }, []);

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
      const filteredVisits = visits.filter(
        (visit, visitIndex) => visitIndex !== index
      );
      setVisits(filteredVisits);
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
          <Link>
            <Button onClick={() => setShowHistory(false)}>
              Solicitud de citas
            </Button>
          </Link>
          <Link>
            <Button onClick={() => setShowHistory(true)}>
              Historial de citas
            </Button>
          </Link>
          {visits.filter(filterVisits).map((visit, index) => {
            return (
              <Col key={visit.id}>
                {" "}
                {/* Agregué una clave única a la etiqueta Col */}
                {visit.is_booked ? (
                  <Card.Text>Visita aceptada</Card.Text>
                ) : (
                  <>
                    <Card.Text>Visita por aceptar</Card.Text>
                    <Button
                      onClick={() => handleAccept(visit.id, index)}
                      type="submit"
                    >
                      accept
                    </Button>
                  </>
                )}
                <Card className="card-visit">
                  <Card.Text className="card-text">
                    <Card.Text>{visit.property.state}</Card.Text>
                    <Card.Text>{visit.property.locality}</Card.Text>
                    <Card.Text>{visit.property.address}</Card.Text>
                    <Card.Text>{visit.property.description}</Card.Text>
                  </Card.Text>

                  <Card.Text>
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
                </Card>
              </Col>
            );
          })}
        </div>
      </Row>
    </Container>
  );
};

export default AcceptVisit;
