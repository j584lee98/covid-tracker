import React, {useState, useEffect} from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./chart.module.css";

const Chart = () => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }

    // console.log(dailyData);

    fetchAPI();
  });

  const lineChart = (
    <Line
      data={{
        labels: "",
        datasets: [{}, {}]
      }}
    />
  )

  return (
    <div>
      <h1>Chart</h1>
    </div>
  )
}

export default Chart;