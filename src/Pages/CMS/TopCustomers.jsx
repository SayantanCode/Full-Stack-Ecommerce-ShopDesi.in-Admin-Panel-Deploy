import React from 'react';
import { Box, Paper, List, ListItem, ListItemText, Typography, Avatar } from '@mui/material';

const customersData = [
  { name: 'John Doe', email: 'zXtJt@example.com', totalOrders: 10, revenue: 100.0, lastOrder: '2022-01-01', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Jane Smith', email: 'zXtJt@example.com', totalOrders: 5, revenue: 50.0, lastOrder: '2022-02-01', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'Bob Johnson', email: 'zXtJt@example.com', totalOrders: 3, revenue: 30.0, lastOrder: '2022-03-01', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  // Add more customers as needed
];

const TopCustomers = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Top Customers
      </Typography>
      <List>
        {customersData.map((customer, index) => (
          <ListItem key={index} divider>
            <Avatar sx={{ mr: 2 }} src={customer.image}>
              {customer.name.charAt(0)}
            </Avatar>
            <ListItemText
              primary={customer.name}
              secondary={`Total Orders: ${customer.totalOrders} | Revenue: $${customer.revenue} | Last Order: ${customer.lastOrder}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopCustomers;
