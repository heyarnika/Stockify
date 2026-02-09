import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function PriceChart({ data }) {
  // Convert simple price list [100, 102...] to chart objects [{day: "Day 1", price: 100}...]
  const chartData = data.map((val, index) => ({
    day: `Day ${index + 1}`,
    price: typeof val === 'number' ? val.toFixed(2) : val
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
        <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} tickLine={false} axisLine={false} />
        <Tooltip 
            contentStyle={{ backgroundColor: '#1a202c', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#3b82f6' }}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#3b82f6" 
          strokeWidth={3} 
          dot={false} 
          animationDuration={2000} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;