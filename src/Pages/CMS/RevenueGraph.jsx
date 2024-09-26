import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
const Revenue = () => {
    const theme = useTheme();
    const data = [  
      { name: 'Jan', revenue: 4000 },
      { name: 'Feb', revenue: 3000 },
      { name: 'Mar', revenue: 2000 },
      { name: 'Apr', revenue: 2780 },
      { name: 'May', revenue: 1890 },
      { name: 'Jun', revenue: 2390 },
      { name: 'Jul', revenue: 3490 },
    ];
    return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Revenue Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartTooltip />
                <Bar dataKey="revenue" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
    )
}

export default Revenue