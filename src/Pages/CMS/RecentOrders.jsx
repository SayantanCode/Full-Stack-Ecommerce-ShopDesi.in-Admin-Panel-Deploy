import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';

const recentOrdersData = [
  { id: 'ORD001', customer: 'John Doe', date: '2024-08-10', status: 'Delivered', total: '$120.00' },
  { id: 'ORD002', customer: 'Jane Smith', date: '2024-08-11', status: 'Processing', total: '$75.50' },
  { id: 'ORD003', customer: 'Alice Brown', date: '2024-08-12', status: 'Shipped', total: '$89.99' },
  // Add more orders as needed
];

const RecentOrders = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Recent Orders
        <Link to="/admin/orders">
        <Button variant="contained" color="primary" sx={{ ml: 2, float: "right" }}>
          View All
        </Button>
        </Link>
      </Typography>
      {/* <Divider/> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell>Total</TableCell>
              {/* <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrdersData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                {/* <TableCell>{order.status}</TableCell> */}
                <TableCell>{order.total}</TableCell>
                {/* <TableCell>
                  <Button variant="contained" color="primary">
                    View
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentOrders;
