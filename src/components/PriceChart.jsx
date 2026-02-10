import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function PriceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
        
        {/* XAxis now uses actual dates sent from Python */}
        <XAxis 
          dataKey="date" 
          stroke="#94a3b8" 
          fontSize={11} 
          tickLine={false} 
          axisLine={false}
          interval="preserveStartEnd" 
        />
        
        <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} tickLine={false} axisLine={false} />
        
        <Tooltip 
            contentStyle={{ backgroundColor: '#1a202c', border: 'none', borderRadius: '8px', color: '#fff' }}
            labelStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
            itemStyle={{ color: '#3b82f6' }}
        />
        
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#3b82f6" 
          strokeWidth={3} 
          dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} 
          animationDuration={2000} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;