import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  Spinner,
  Container,
  Row,
  Col,
} from "reactstrap";
import CountUp from "react-countup";

import styles from "./cards.module.css";

const Cards = (props) => {
  const {Global, Countries, date} = props.data
  console.log(Global);
  return (
    <div>
      <Container className={styles.cont}>
        {!Global ? (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        ) : (
          <Row xs="1" sm="2">
            <Col className={styles.cols}>
              <Card body inverse color="primary">
                <CardTitle>Confirmed</CardTitle>
                <h4>
                  <CountUp
                    start={0}
                    end={Global.TotalConfirmed}
                    duration={1}
                    separator=","
                  />
                </h4>
                <CardText>{new Date(date).toDateString()}</CardText>
              </Card>
            </Col>
            <Col className={styles.cols}>
              <Card body inverse color="success">
                <CardTitle>Recovered</CardTitle>
                <h4>
                  <CountUp
                    start={0}
                    end={Global.TotalRecovered}
                    duration={1}
                    separator=","
                  />
                </h4>
                <CardText>{new Date(date).toDateString()}</CardText>
              </Card>
            </Col>
            <Col className={styles.cols}>
              <Card body inverse color="danger">
                <CardTitle>Active</CardTitle>
                <h4>
                  <CountUp
                    start={0}
                    end={
                      Global.TotalConfirmed -
                      Global.TotalRecovered -
                      Global.TotalDeaths
                    }
                    duration={1}
                    separator=","
                  />
                </h4>
                <CardText>{new Date(date).toDateString()}</CardText>
              </Card>
            </Col>
            <Col className={styles.cols}>
              <Card body inverse color="dark">
                <CardTitle>Deaths</CardTitle>
                <h4>
                  <CountUp
                    start={0}
                    end={Global.TotalDeaths}
                    duration={1}
                    separator=","
                  />
                </h4>
                <CardText>{new Date(date).toDateString()}</CardText>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cards;
