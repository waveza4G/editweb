import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
];

const chartStyle = {
    margin: "auto",
    padding: "1rem",
  }

function SalesBarChart() {
    return (
        <div style={chartStyle}>
        <ResponsiveContainer width="50%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
}

export default SalesBarChart;
