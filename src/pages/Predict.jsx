import React, { useState } from 'react';
import Predictnav from '../components/Predictnav';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import './Predict.css';

function Predict() {
  const [data, setData] = useState([]);

  // The simplest possible way to get the numbers
  async function getData() {
    try {
      const res = await fetch('https://laughing-space-orbit-x5qgjvp7wgw53x9p-5000.app.github.dev/predict/tcs');
      const json = await res.json();
      
      // Turn [10, 20] into [{p: 10}, {p: 20}] so the chart can read it
      const formatted = json.forecast.map(num => ({ p: num }));
      setData(formatted);
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Make sure your Flask server is running on Port 5000 and is set to PUBLIC!");
    }
  }

  return (
    <div className="pagebg">
      <Predictnav />
      <h2>Stock Prediction Dashboard</h2>

      {/* Basic Section for the Chart */}
      <section className="chart-box">
        <button onClick={getData} className="predict-btn">
          Get Forecast
        </button>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis hide={true} domain={['auto', 'auto']} /> 
              <Line type="monotone" dataKey="p" stroke="#00d2ff" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default Predict;