import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";

const Cards = ({data: {Global, Countries, Date}}) => {
  console.log(Global)
  if (!Global) {
    return "Loading data...";
  }
  return (
    <div>
      <Card body inverse color="primary">
        <CardTitle>Confirmed</CardTitle>
        <CardText>{Global.TotalConfirmed}</CardText>
      </Card>
      <Card body inverse color="success">
        <CardTitle>Recovered</CardTitle>
        <CardText>{Global.TotalRecovered}</CardText>
      </Card>
      <Card body inverse color="danger">
        <CardTitle>Active</CardTitle>
        <CardText>{Global.TotalConfirmed - Global.TotalRecovered - Global.TotalDeaths}</CardText>
      </Card>
      <Card body inverse color="dark">
        <CardTitle>Deaths</CardTitle>
        <CardText>{Global.TotalDeaths}</CardText>
      </Card>
    </div>
  );
};

export default Cards;
