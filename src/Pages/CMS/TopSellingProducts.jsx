import React from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';

const topSellingProductsData = [
  {
    name: 'T-Shirt',
    unitsSold: 150,
    revenue: '$12,000',
    image: '/images/tshirt.png',
  },
  {
    name: 'Shirt',
    unitsSold: 120,
    revenue: '$9,000',
    image: '/images/shirt.png',
  },
  {
    name: 'Jeans',
    unitsSold: 100,
    revenue: '$8,000',
    image: '/images/jeans.png',
  },
  // Add more top-selling products here
];

const TopSellingProducts = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Top Selling Products
      </Typography>
      <List>
        {topSellingProductsData.map((product, index) => (
          <ListItem key={index} divider>
            <ListItemAvatar>
              <Avatar
                src={product.image}
                alt={product.name}
                sx={{ width: 56, height: 56 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Units Sold: ${product.unitsSold} | Revenue: ${product.revenue}`}
              sx={{ml: 2}}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopSellingProducts;
