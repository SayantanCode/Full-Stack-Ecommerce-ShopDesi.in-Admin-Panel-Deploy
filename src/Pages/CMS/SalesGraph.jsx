import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// data will come from orders. combine all the orders
const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 7000 },
  { name: "Jul", sales: 8000 },
  { name: "Aug", sales: 9000 },
  { name: "Sep", sales: 10000 },
];
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
const SalesGraph = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sales Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartTooltip />
                <Line type="monotone" dataKey="sales" stroke={theme.palette.primary.main} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
  );
};

export default SalesGraph;
