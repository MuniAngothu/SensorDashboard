import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SensorChart = ({ data, title, color, onHover }) => {
  const chartData = {
    labels: data.labels, // Time labels
    datasets: [
      {
        label: title,
        data: data.values, // Sensor values
        borderColor: color || "blue",
        borderWidth: 2,
        fill: false,
        spanGaps: true, // Ensure all points are connected
        pointRadius: 5, // Make data points detectable
        pointHoverRadius: 8, // On hover, make points larger for better interactivity
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: title,
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        title: { display: true, text: "Time", color: "#ffffff" },
      },
      y: {
        ticks: { color: "#ffffff" },
        title: { display: true, text: "Value", color: "#ffffff" },
      },
    },
    // Add onHover event to capture mouse hover over the chart
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        // Get the index of the hovered data point
        const index = chartElement[0].index;
        const time = data.labels[index]; // The time of the hovered data point
        const value = data.values[index]; // The value of the hovered data point

        // Call the onHover prop passed from parent with the hovered data
        onHover({ time, value });
      }
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SensorChart;
