import React from 'react';
import { Box, Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const activityFeedData = [
  { message: 'John Doe placed an order for $120.00', time: '2 hours ago' },
  { message: 'Product T-Shirt was added to inventory', time: '5 hours ago' },
  { message: 'Admin updated the product details for Shirt', time: '1 day ago' },
  // Add more activities as needed
];

const ActivityFeed = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Activity Feed
      </Typography>
      <List>
        {activityFeedData.map((activity, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={activity.message}
              secondary={activity.time}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ActivityFeed;
