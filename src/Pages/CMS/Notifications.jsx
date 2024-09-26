import React, { useState, useEffect } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  Divider,
  ListItemIcon,
  Box,
  ListItemText,
  Tooltip,
  List,
} from "@mui/material";
import {
  Notifications,
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
// import "./NotificationMenu.css"; // Assuming you're using a separate CSS file for styling

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", isNew: true },
    { id: 2, message: "Product added successfully", isNew: true },
    { id: 3, message: "User registered", isNew: true },
    { id: 4, message: "Order shipped", isNew: true },
    { id: 5, message: "Order delivered", isNew: true },
    { id: 6, message: "Order canceled", isNew: false },
    { id: 7, message: "Order completed", isNew: false },
    { id: 8, message: "Order refunded", isNew: false },
    { id: 9, message: "Order returned", isNew: false },
    { id: 10, message: "Order canceled", isNew: false },
    { id: 11, message: "Order completed", isNew: false },
    { id: 12, message: "Order refunded", isNew: false },
    { id: 13, message: "Order returned", isNew: false },
  ]);

  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    const unreadCount = notifications.filter((notif) => notif.isNew).length;
    if (unreadCount > 0) {
      setHasNewNotifications(true);
    }
  }, [notifications]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setHasNewNotifications(false); // Stop animation and hide badge when the menu is opened
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotifications(
      notifications.map((notif) => ({
        ...notif,
        isNew: false,
      }))
    ); // Mark all notifications as read when the menu closes
    setHasNewNotifications(false); // Stop animation and hide badge when the menu is opened
  };

  const handleClearNotifications = () => {
    setNotifications([]); // Clear all notifications
    // setAnchorEl(null);
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id)); // Delete only the specified notification
  };

  const open = Boolean(anchorEl);
  const unreadCount = notifications.filter((notif) => notif.isNew).length;

  return (
    <Box>
      <IconButton
        id="notification-icon"
        color="inherit"
        onClick={handleMenuOpen}
        className={hasNewNotifications ? "shake" : ""}
      >
        <Badge
          badgeContent={hasNewNotifications ? unreadCount : 0}
          color="secondary"
        >
          <Notifications />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: 300,
            maxHeight: 400,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h6">Notifications</Typography>
          <Box>
            <Tooltip title="Clear Notifications">
              <IconButton size="small" onClick={handleClearNotifications}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton size="small" onClick={handleMenuClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notif) => (
              <MenuItem key={notif.id}>
                <ListItemIcon>
                  <CheckCircleIcon
                    color={notif.isNew ? "secondary" : "inherit"}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="body2"
                    color={notif.isNew ? "secondary" : "text.primary"}
                  >
                    {notif.message}
                  </Typography>
                </ListItemText>
                <ListItemIcon onClick={() => handleDeleteNotification(notif.id)}>
                  <DeleteIcon />
                </ListItemIcon>
              </MenuItem>
            ))}
          </List>
        ) : (
          <MenuItem>
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationMenu;
