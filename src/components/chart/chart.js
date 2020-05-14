import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import { FormGroup, Label, CustomInput } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";

import styles from "./chart.module.css";

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
              (date === 0 ? " (Most recent)" : ""),
          },
        }}
      />
    </div>
  ) : null;
};

const LineChart = (props) => {
  const timeline = props.timeline;
  const startDate = props.start;
  const endDate = props.end;

  return timeline.length > 0 ? (
    <div className={styles.chart}>
      <Line
        data={{
          labels: timeline.filter((update) => {
            const compareDate = new Date(update.updated_at).setHours(0,0,0,0);
            return compareDate >= startDate && compareDate <= endDate;
          }).map((data) => new Date(data.updated_at).toLocaleDateString()).reverse(),
          datasets: [
            {
              data: timeline.filter((update) => {
                const compareDate = new Date(update.updated_at).setHours(0,0,0,0);
                return compareDate >= startDate && compareDate <= endDate;
              }).map((data) => data.confirmed).reverse(),
              label: "Confirmed",
              borderColor: "#007bff",
            },
            {
              data: timeline.filter((update) => {
                const compareDate = new Date(update.updated_at).setHours(0,0,0,0);
                return compareDate >= startDate && compareDate <= endDate;
              }).map((data) => data.recovered).reverse(),
              label: "Recovered",
              borderColor: "#28a745",
            },
            {
              data: timeline.filter((update) => {
                const compareDate = new Date(update.updated_at).setHours(0,0,0,0);
                return compareDate >= startDate && compareDate <= endDate;
              }).map((data) => data.active).reverse(),
              label: "Active",
              borderColor: "#dc3545",
            },
            {
              data: timeline.filter((update) => {
                const compareDate = new Date(update.updated_at).setHours(0,0,0,0);
                return compareDate >= startDate && compareDate <= endDate;
              }).map((data) => data.deaths).reverse(),
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
  const [startDate, setStartDate] = useState(new Date('01/21/2020'));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (props.timeline.length > 0) {
      setBar(document.getElementById("bar").value);
    }
  }, [endDate, props.timeline.length, startDate]);

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
        start={new Date(startDate).setHours(0,0,0,0)}
        end={new Date(endDate).setHours(0,0,0,0)}
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
