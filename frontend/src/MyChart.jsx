import * as React from "react";
import { useState, useEffect } from "react";
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

        // Update the data array
        let updatedData = [...uData, newData];
        if (updatedData.length > 10) {
          updatedData.shift(); // Remove the oldest point
        }

        // Update the x-axis labels
        let newLabelIndex =
          xLabels.length > 0
            ? parseInt(xLabels[xLabels.length - 1].split(" ")[1]) + 1
            : 1;
        let updatedLabels = [...xLabels, `Page ${newLabelIndex}`];
        if (updatedLabels.length > 10) {
          updatedLabels.shift(); // Remove the oldest label
        }

        setUData(updatedData);
        setXLabels(updatedLabels);
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
      <button onClick={addValueHandle}>Click ME</button>
      <br />
    </div>
  );
}

export default MyChart;
