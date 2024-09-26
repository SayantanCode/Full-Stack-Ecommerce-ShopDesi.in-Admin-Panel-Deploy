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
import {
  AttachMoney,
  ShoppingCart,
  People,
  TrendingUp,
  ShoppingBag,
  Money,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import SalesGraph from './SalesGraph';
import Revenue from './RevenueGraph';

const AnalyticsPage = () => {
  const theme = useTheme();

  const data = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
    { name: 'Jul', sales: 3490, revenue: 4300 },
  ];

  return (
    <Box sx={{ p:{ xs: 0, md: 3}, my:5}}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Business Analytics
      </Typography>
      
      <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <TrendingUp color="error" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">$80,000</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Money color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">$260,000</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <ShoppingCart color="secondary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4">1,234</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <People color="success" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6">Total Customers</Typography>
              <Typography variant="h4">567</Typography>
            </Box>
          </Paper>
        </Grid>

        
        
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>

        <Grid item xs={12} md={6}>
          <Revenue />
        </Grid>

        <Grid item xs={12} md={6}>
          <SalesGraph />
        </Grid>

      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
