//accept-visit
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

  useEffect(() => {
    const fetchAllVisits = () => {
      axios
        .get(`${axiosURL}/api/visits/all-visits`)
        .then((visit) => {
          setVisits(visit.data);
          console.log("VISIT DATA", visit.data);
        })
        .catch((error) => alert("error", error));
    };
    fetchAllVisits();
  }, []);

  console.log("VISITS dspues del fetch", visits);

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
      visits[index] = visitAccepted;
      console.log("VISIT ACCEPTED", visitAccepted);
      setAcceptedVisit([...acceptedVisit, index]);
    } catch (error) {
      console.log("Errrooor", error);
    }
  };
  console.log("acceptedVisit", acceptedVisit);

  return (
    <Container>
      <Row>
        <div>
          {/* <Link>
        <Button>Solicitud de citas </Button>
        </Link>
        <Link>
        <Button>Historial de citas</Button>
      </Link> */}
          {visits.map((visit, index) => {
            return (
              <>
                <Col>
                  <Card className="card-visit">
                    {/* {visit.is_booked ? (
                      <Card.Text>Visita aceptada</Card.Text>
                    ) : (
                      <>
                        <Card.Text>visita por aceptar</Card.Text>
                        <Button
                          onClick={() => handleAccept(visit.id, index)}
                          type="submit"
                        >
                          accept
                        </Button>
                      </>
                    )} */}
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
              </>
            );
          })}
        </div>
      </Row>
    </Container>
  );
};

export default AcceptVisit;

{
  /*
<Card style={{ margin: "20px", background: "#fe4236" }}>
              {visit.is_booked ? (
                <Card.Text>Visita aceptada</Card.Text>
              ) : (
                <>
                  <Card.Text>visita por aceptar</Card.Text>
                  <Button
                    onClick={() => handleAccept(visit.id, index)}
                    type="submit"
                  >
                    accept
                  </Button>
                </>
              )}
              <Card.Text>
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
              <Card.Text>{visit.hour}</Card.Text>
              <Card.Text>{visit.date}</Card.Text>
            </Card> */
}
