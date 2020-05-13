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
  const global = props.data;
  return (
    <div>
      <Container className={styles.cont}>
        {!props.data ? (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        ) : (
          <Row xs="1" sm="2">
            <Col className={styles.cols}>
              <Card body inverse color="primary">
                <CardTitle onClick={() => console.log(global)}>Confirmed</CardTitle>
                <h4>
                  <CountUp
                    start={0}
                    end={global.confirmed}
                    duration={1}
                    separator=","
                  />
                </h4>
                <CardText>{new Date().toDateString()}</CardText>
              </Card>
            </Col>
            <Col className={styles.cols}>
              <Card body inverse color="success">
                <CardTitle>Recovered</CardTitle>
                <h4>
                  <CountUp
                    start={0}
                    end={global.recovered}
                    duration={1}
                    separator=","
                  />
                </h4>
                <CardText>{new Date(global.date).toDateString()}</CardText>
              </Card>
            </Col>
            <Col className={styles.cols}>
              <Card body inverse color="danger">
                <CardTitle>Active</CardTitle>
                <h4>
                  <CountUp
                    start={0}
                    end={global.active}
                    duration={1}
                    separator=","
                  />
                </h4>
                <CardText>{new Date(global.date).toDateString()}</CardText>
              </Card>
            </Col>
            <Col className={styles.cols}>
              <Card body inverse color="dark">
                <CardTitle>Deaths</CardTitle>
                <h4>
                  <CountUp
                    start={0}
                    end={global.deaths}
                    duration={1}
                    separator=","
                  />
                </h4>
                <CardText>{new Date(global.date).toDateString()}</CardText>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
  // }
};

export default Cards;
