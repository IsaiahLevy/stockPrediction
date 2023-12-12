import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Now you can use Line chart from react-chartjs-2

const SentimentGraph = ({ company }) => {
  const [sentimentData, setSentimentData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7430/api/company-sentiment")
      .then((response) => {
        const companyData = response.data.filter((d) => d.company === company);
        setSentimentData(companyData);
      })
      .catch((error) => console.error("Error fetching sentiment data:", error));
  }, [company]);

  const data = {
    labels: sentimentData.map((d) => d.year_month),
    datasets: [
      {
        label: `Monthly Sentiment for ${company}`,
        data: sentimentData.map((d) => d.average_sentiment_score),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default SentimentGraph;
