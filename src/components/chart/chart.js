import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import styles from "./chart.module.css";

const Chart = (props) => {
  const timeline = props.timeline;
  const BarChart =
    timeline.length > 0 ? (
      <div className={styles.chart}>
        <Bar
          data={{
            labels: ["Confirmed", "Recovered", "Active", "Deaths"],
            datasets: [
              {
                label: "Current count",
                data: [
                  timeline[0].confirmed,
                  timeline[0].recovered,
                  timeline[0].active,
                  timeline[0].deaths,
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
                "Last Update: " +
                new Date(timeline[0].updated_at).toLocaleString(),
            },
          }}
        />
      </div>
    ) : null;
  const lineChart =
    timeline.length > 0 ? (
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
    ) : (
      <h4>No cases found.</h4>
    );

  return (
    <div className={styles.container}>
      {BarChart}
      {lineChart}
      <p className="text-muted">
        Source:{" "}
        <a href={"https://about-corona.net/"}>https://about-corona.net/</a>
      </p>
    </div>
  );
};

export default Chart;
