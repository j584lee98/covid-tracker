import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./chart.module.css";
import { FormGroup, Label, CustomInput } from "reactstrap";
import "react-calendar/dist/Calendar.css";

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
              (date === 0 ? " (Up-to-date)" : ""),
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
};

const Chart = (props) => {
  const timeline = props.timeline;
  const [barValue, setBar] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (props.timeline.length > 0) {
      setBar(document.getElementById("bar").value);
    }
  }, [props.timeline.length]);

  return (
    <div>
      <BarChart
        timeline={timeline}
        date={timeline.length - 1 - parseInt(barValue)}
      />
      {timeline.length > 0 ? (
        <FormGroup className={styles.bar}>
          <Label for="bar">Report Date</Label>
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
      />
      {timeline.length > 0 ? (
        <div>
          <div className={styles.block}>
            <div className={styles.inner}>
              <p>From:</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                withPortal
              />
            </div>
            <div className={styles.inner}>
              <p>To:</p>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                withPortal
              />
            </div>
          </div>
        </div>
      ) : null}
      <p className="text-muted">
        Source:{" "}
        <a href={"https://about-corona.net/"}>https://about-corona.net/</a>
      </p>
    </div>
  );
};

export default Chart;
