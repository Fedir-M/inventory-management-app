'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Just for a test example
const data = [
  { date: '07/10', value: 2 },
  { date: '07/17', value: 0 },
  { date: '07/24', value: 1 },
  { date: '07/31', value: 3 },
  { date: '08/07', value: 0 },
  { date: '08/14', value: 1 },
];

export function ProductChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#7c3aed"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
