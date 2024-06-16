import * as React from "react";
import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

function MyChart() {
  const [uData, setUData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  function addValueHandle() {
    axios
      .get("http://127.0.0.1:8000/api/random")
      .then((response) => {
        const newData = response.data.number;
        setUData([...uData, newData]);
        setXLabels([...xLabels, `Page ${uData.length + 1}`]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div className="my-chart">
      <LineChart
        width={500}
        height={300}
        series={[{ data: uData, label: "uv" }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
      <br />
      <button onClickCapture={addValueHandle}>Click ME</button>
    </div>
  );
}

export default MyChart;
