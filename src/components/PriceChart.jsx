import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function PriceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        {/* FIXED: High contrast solid grid lines */}
        <CartesianGrid 
          stroke="#475569" 
          strokeDasharray="0" 
          vertical={true} 
          horizontal={true} 
          opacity={0.6} 
        />
        
        <XAxis 
          dataKey="date" 
          stroke="#94a3b8" 
          fontSize={12} 
          axisLine={true} 
          tickLine={true} 
          tick={{fill: '#cbd5e1'}}
        />
        <YAxis 
          stroke="#94a3b8" 
          fontSize={12} 
          domain={['auto', 'auto']} 
          axisLine={true} 
          tickLine={true} 
          tick={{fill: '#cbd5e1'}}
        />
        
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1e293b', 
            border: '1px solid #475569', 
            borderRadius: '12px', 
            color: '#fff' 
          }}
          itemStyle={{ color: '#3b82f6' }}
        />
        
        {/* Thick Electric Blue Line */}
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#3b82f6" 
          strokeWidth={4} 
          dot={{ r: 5, fill: '#3b82f6', stroke: '#0f172a', strokeWidth: 2 }} 
          activeDot={{ r: 8, strokeWidth: 0 }}
          animationDuration={1500} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;