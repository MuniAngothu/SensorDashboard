import React, { useState } from "react";
import SensorChart from "./SensorChart";
import useFetchSensorData from "./useFetchSensorData";
import { prepareChartData } from "./dataUtils";
import { motion } from "framer-motion"; // For animations
import "./app.css";

const App = () => {
  const apiUrl = "https://api.thingspeak.com/channels/1596152/feeds.json?results=40";
  const { feeds, loading } = useFetchSensorData(apiUrl);

  const [hoveredData, setHoveredData] = useState(null);
  const [hoveredChart, setHoveredChart] = useState(null);
  const [hoveredChartPosition, setHoveredChartPosition] = useState(0);

  if (loading)
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">Sensor Dashboard</h1>
        <div className="loader"></div>
      </div>
    );

  const ozoneData = prepareChartData(feeds, "field3");
  const temperatureData = prepareChartData(feeds, "field5");
  const pm25Data = prepareChartData(feeds, "field1");

  const handleHover = (chartName, { time, value }, position) => {
    setHoveredData({ time, value });
    setHoveredChart(chartName);
    setHoveredChartPosition(position);
  };

  return (
    <motion.div className="dashboard-container">
      <h1 className="dashboard-title">Sensor Dashboard</h1>

      <motion.div className="charts-container">
        <motion.div className="chart">
          <SensorChart
            data={ozoneData}
            title="Ozone"
            color="blue"
            onHover={(data) => handleHover('Ozone', data, 0)}
          />
        </motion.div>
        <motion.div className="chart">
          <SensorChart
            data={temperatureData}
            title="Temperature"
            color="red"
            onHover={(data) => handleHover('Temperature', data, 1)}
          />
        </motion.div>
        <motion.div className="chart">
          <SensorChart
            data={pm25Data}
            title="PM2.5"
            color="green"
            onHover={(data) => handleHover('PM2.5', data, 2)}
          />
        </motion.div>
      </motion.div>

      {/* Left Side: Data Display with Smooth Animation */}
      {hoveredData && (
        <motion.div
          className="data-display-left"
          initial={{ opacity: 0, x: -200 }}
          animate={{
            opacity: 1,
            x: 0,
            y: hoveredChartPosition * 300,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <h3>{hoveredChart} Data Info</h3>
          <p>Time: {hoveredData.time}</p>
          <p>Value: {hoveredData.value}</p>
        </motion.div>
      )}

      {/* Right Sidebar: Health Alerts */}
      {hoveredData && hoveredChart === "Ozone" && (
        <motion.div
          className="data-display-right"
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: 1,
            x: 0,
            y: hoveredChartPosition * 300,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <h3>Health Precaution</h3>
          <p>Ozone Value: {hoveredData.value}</p>
          {hoveredData.value > 400 ? (
            <div className="alert alert-danger">
              <strong>Warning:</strong> High Ozone Levels Detected!
              <br />
              Avoid outdoor activities, wear a mask if needed.
            </div>
          ) : (
            <div className="alert alert-info">
              Ozone levels are within safe limits. Stay healthy!
            </div>
          )}
        </motion.div>
      )}

      {hoveredData && hoveredChart === "Temperature" && (
        <motion.div
          className="data-display-right"
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: 1,
            x: 0,
            y: hoveredChartPosition * 300,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <h3>Health Precaution</h3>
          <p>Temperature Value: {hoveredData.value}</p>
          {hoveredData.value > 35 ? (
            <div className="alert alert-danger">
              <strong>Warning:</strong> High Temperature Detected!
              <br />
              Take necessary precautions to avoid heatstroke.
            </div>
          ) : (
            <div className="alert alert-info">
              Temperature is within safe limits. Stay cool!
            </div>
          )}
        </motion.div>
      )}

      {hoveredData && hoveredChart === "PM2.5" && (
        <motion.div
          className="data-display-right"
          initial={{ opacity: 0, x: 200 }}
          animate={{
            opacity: 1,
            x: 0,
            y: hoveredChartPosition * 300,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <h3>Health Precaution</h3>
          <p>PM2.5 Value: {hoveredData.value}</p>
          {hoveredData.value > 150 ? (
            <div className="alert alert-danger">
              <strong>Warning:</strong> Very High PM2.5 Levels Detected!
              <br />
              Avoid outdoor activities and stay indoors with filtered air.
            </div>
          ) : hoveredData.value > 100 ? (
            <div className="alert alert-warning">
              <strong>Warning:</strong> High PM2.5 Levels Detected!
              <br />
              Consider wearing a mask if going outside.
            </div>
          ) : (
            <div className="alert alert-info">
              PM2.5 levels are within safe limits. Stay healthy!
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default App;
