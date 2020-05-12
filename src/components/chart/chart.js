import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import styles from "./chart.module.css";

const Chart = (props) => {
  const timeline = props.timeline;
  console.log(timeline)
  const lineChart = timeline.length ? (
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
  ) : null;
  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
