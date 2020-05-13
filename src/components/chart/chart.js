import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import styles from "./chart.module.css";
import { FormGroup, Label, CustomInput } from "reactstrap";

const BarChart = (props) => {
  const timeline = props.timeline;
  const date = props.date;
  return timeline.length && date >= 0 ? (
    <div className={styles.chart}>
      <Bar
        data={{
          labels: ["Confirmed", "Recovered", "Active", "Deaths"],
          datasets: [
            {
              label: "Current count",
              data: [
                timeline[date].confirmed,
                timeline[date].recovered,
                timeline[date].active,
                timeline[date].deaths,
              ],
              backgroundColor: ["#007bff", "#28a745", "#dc3545", "#343a40"],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            fontSize: 16,
            text:
              "Update: " +
              new Date(timeline[date].updated_at).toLocaleString() +
              (date === 0 ? " (Up-to-date)" : "")
          },
        }}
      />
    </div>
  ) : null;
};

const LineChart = (props) => {
  const timeline = props.timeline;
  return timeline.length > 0 ? (
    <div className={styles.chart}>
      <Line
        data={{
          labels: timeline.map((data) => data.date).reverse(),
          datasets: [
            {
              data: timeline.map((data) => data.confirmed).reverse(),
              label: "Confirmed",
              borderColor: "#007bff",
            },
            {
              data: timeline.map((data) => data.recovered).reverse(),
              label: "Recovered",
              borderColor: "#28a745",
            },
            {
              data: timeline.map((data) => data.active).reverse(),
              label: "Active",
              borderColor: "#dc3545",
            },
            {
              data: timeline.map((data) => data.deaths).reverse(),
              label: "Deaths",
              borderColor: "#343a40",
            },
          ],
        }}
      />
    </div>
  ) : null;
  // <h4>No cases found.</h4>
};

const Chart = (props) => {
  const timeline = props.timeline;
  const [barValue, setBar] = useState(0);
  const [lineValue, setLine] = useState(0);

  useEffect(() => {
    if (props.timeline.length > 0) {
      setBar(document.getElementById("bar").value);
      setLine(document.getElementById("line").value);
    }
  }, [props.timeline.length]);

  return (
    <div className={styles.container}>
      <BarChart
        timeline={timeline}
        date={timeline.length - 1 - parseInt(barValue)}
      />
      {timeline.length > 0 ? (
        <FormGroup>
          <Label for="bar">Custom Range</Label>
          <CustomInput
            type="range"
            id="bar"
            name="bar"
            min="0"
            max={timeline.length - 1}
            defaultValue={timeline.length - 1}
            onChange={(e) => setBar(e.target.value)}
          />
        </FormGroup>
      ) : null}
      <LineChart
        timeline={timeline}
        date={timeline.length - 1 - parseInt(lineValue)}
      />
      {timeline.length > 0 ? (
        <FormGroup>
          <Label for="line">Custom Range</Label>
          <CustomInput
            type="range"
            id="line"
            name="line"
            min="0"
            max={timeline.length - 1}
            defaultValue={timeline.length - 1}
            onChange={(e) => setLine(e.target.value)}
          />
        </FormGroup>
      ) : null}
      <p className="text-muted">
        Source:{" "}
        <a href={"https://about-corona.net/"}>https://about-corona.net/</a>
      </p>
    </div>
  );
};

export default Chart;
