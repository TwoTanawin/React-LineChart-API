import * as React from "react";
import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

function MyChartv3() {
  const [uData, setUData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  function addValueHandle() {
    axios
      .get("http://127.0.0.1:8000/api/random")
      .then((response) => {
        const newData = response.data.number;
        console.log("Fetched data:", newData);

        setUData((prevData) => {
          let updatedData = [...prevData, newData];
          if (updatedData.length > 10) {
            updatedData.shift(); // Remove the oldest point
          }
          return updatedData;
        });

        setXLabels((prevLabels) => {
          let newLabelIndex =
            prevLabels.length > 0
              ? parseInt(prevLabels[prevLabels.length - 1].split(" ")[1]) + 1
              : 1;
          let updatedLabels = [...prevLabels, `Page ${newLabelIndex}`];
          if (updatedLabels.length > 10) {
            updatedLabels.shift(); // Remove the oldest label
          }
          return updatedLabels;
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const startFetchingData = () => {
    if (intervalId) clearInterval(intervalId); // Clear any existing interval
    const id = setInterval(() => {
      addValueHandle();
    }, 1000);
    setIntervalId(id);
  };

  const stopFetchingData = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId); // Clean up interval on unmount
    };
  }, [intervalId]); // Only re-run if intervalId changes

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
      <button onClick={startFetchingData}>Start Fetching</button>
      <button onClick={stopFetchingData}>Stop Fetching</button>
      <br />
    </div>
  );
}

export default MyChartv3;
