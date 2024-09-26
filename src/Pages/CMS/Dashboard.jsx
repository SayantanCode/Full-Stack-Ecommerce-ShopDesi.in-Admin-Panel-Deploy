import React, { useState } from 'react';
import { Grid, Box, Paper, Typography, Divider, IconButton, Button, Avatar } from '@mui/material';
import { CalendarToday, TrendingUp, ListAlt, BarChart, ShoppingCart, People, AttachMoney, ShoppingBag } from '@mui/icons-material';
import CustomCalendar from './TaskCalendar';
import SalesGraph from './SalesGraph.jsx';
import TopSellingProducts from './TopSellingProducts';
import RecentOrders from './RecentOrders';
import ActivityFeed from './ActivityFeed';
import TaskList from './TaskList.jsx';
import TopCustomers from './TopCustomers.jsx';
import Revenue from './RevenueGraph.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, getUserProfile } from '../../Redux/Slice/authSlice.js';
import { getOrders, getProducts } from '../../Redux/Slice/crudSlice.js';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { productsData, orderList } = useSelector((state) => state.Crud);
  const { customers } = useSelector((state) => state.Auth);
  useEffect(() => {
    // dispatch(getUserProfile());
    dispatch(getProducts());
    dispatch(getCustomers());
    dispatch(getOrders());
  },[])
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [filter, setFilter] = useState('selected');
  
  const handleAddTask = (date, task) => {
    setTasks([...tasks, { date, task }]);
  };
  const handleEditTask = (index, newValue) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].task = newValue;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  return (
    <Box sx={{ p: { xs: 0, md: 3 }, my:6}}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome back, Admin!
      </Typography>

      {/* Overview Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <TrendingUp/>
              </Avatar>
              <Box>
                <Typography variant="h6">$50,000</Typography>
                <Typography variant="body2">Total Revenue</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <ShoppingCart/>
              </Avatar>
              <Box>
                <Typography variant="h6">{orderList?.length}</Typography>
                <Typography variant="body2">Total Orders</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <People />
              </Avatar>
              <Box>
                <Typography variant="h6">{customers?.length}</Typography>
                <Typography variant="body2">Total Customers</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <ShoppingBag />
              </Avatar>
              <Box>
                <Typography variant="h6">{Object.keys(productsData).length>0 && productsData?.totalProducts}</Typography>
                <Typography variant="body2">Total Products</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        {/* Repeat similar blocks for Orders, Products, Customers, Low Stock */}
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Sales Analytics Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Revenue/>
        </Grid>
        <Grid item xs={12} lg={4}>
        {/* Top-Selling Products, Revenue by Category */}
          <TopSellingProducts />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Orders Overview and Top Customers */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <RecentOrders />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TopCustomers/>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      {/* Task Manager */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
            {/* Calendar */}
            <CustomCalendar tasks={tasks} onAddTask={handleAddTask} onDateSelect={handleDateSelect} />
        </Grid>
        <Grid item xs={12} lg={6}>
          {/* Task List */}
          <TaskList tasks={tasks} filter={filter} selectedDate={selectedDate} onFilterChange={handleFilterChange} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask}  />
        </Grid>
      </Grid>

      {/* <Divider sx={{ my: 3 }} /> */}
    </Box>
  );
};

export default DashboardPage;
