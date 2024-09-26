import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { Edit, Delete, Visibility, Receipt, Search, ClearRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../Redux/Slice/crudSlice';
import { toast } from 'react-toastify';

const OrderManagementPage = () => {
  const dispatch = useDispatch();
  const { loading, orderList } = useSelector((state) => state.Crud);

  useEffect(() => {
    dispatch(getOrders()); // Fetch orders from API
  }, [dispatch]);

  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [status, setStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (orderList) {
      setOrders(orderList);
    }
  }, [orderList]);

  const handleEditClick = (orderId, itemIndex, currentStatus) => {
    setEditMode(orderId);
    setEditItemIndex(itemIndex);
    setStatus(currentStatus);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDoneClick = (orderId, itemIndex, productId) => {
    const updatedOrders = orders.map((order) =>
      order._id === orderId
        ? {
            ...order,
            orderItems: order.orderItems.map((item, index) =>
              index === itemIndex ? { ...item, status } : item
            ),
          }
        : order
    );
    setOrders(updatedOrders);
    setEditMode(null);
    setEditItemIndex(null);
    dispatch(updateOrderStatus({ id: orderId, data: { status, productId } }))
    .unwrap()
    .then((response) => {
      dispatch(getOrders());
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };

  const handleCancelClick = () => {
    setEditMode(null);
    setEditItemIndex(null);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleGenerateInvoice = (orderId) => {
    console.log('Generating invoice for order ID:', orderId);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(order.createdAt).toLocaleDateString().includes(searchTerm)
  );

  return (
    <Box sx={{ p: 3, my: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Order Management
      </Typography>

      <TextField
        label="Search Orders"
        variant="outlined"
        sx={{ width: '50%', mb: 3 }}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchTerm && (
                <IconButton onClick={() => setSearchTerm('')}>
                  <ClearRounded />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id} sx={{ verticalAlign: 'top' }}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {order.orderItems.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        {item.name} -{' '}
                        {editMode === order._id && editItemIndex === index ? (
                          <>
                            <Select
                              value={status}
                              onChange={handleStatusChange}
                              sx={{ mr: 2 }}
                            >
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="Processing">Processing</MenuItem>
                              <MenuItem value="Shipped">Shipped</MenuItem>
                              <MenuItem value="Delivered">Delivered</MenuItem>
                            </Select>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleDoneClick(order._id, index, item.productId)}
                              sx={{ mr: 1 }}
                            >
                              Done
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={handleCancelClick}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            {item.status || 'Pending'}
                            <IconButton
                              onClick={() =>
                                handleEditClick(order._id, index, item.status)
                              }
                              sx={{ ml: 2 }}
                            >
                              <Edit />
                            </IconButton>
                          </>
                        )}
                      </Typography>
                    </Box>
                  ))}
                </TableCell>
                <TableCell>{order.orderItems.reduce((total, item) => total + item.quantity, 0)}</TableCell>
                <TableCell>{`₹${order.totalAmount}`}</TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(order)}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Generate Invoice">
                    <IconButton
                      color="default"
                      onClick={() => handleGenerateInvoice(order._id)}
                    >
                      <Receipt />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for viewing order details */}
      <Dialog open={Boolean(selectedOrder)} onClose={handleCloseDetails}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6">
                Customer: {selectedOrder.user}
              </Typography>
              <Typography>
                Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </Typography>
              <Typography>Total Amount: ₹{selectedOrder.totalAmount}</Typography>
              <Box mt={2}>
                <Typography variant="h6">Products:</Typography>
                {selectedOrder.orderItems.map((item, index) => (
                  <Box key={index} mb={1}>
                    <Typography>- {item.name}</Typography>
                    <Typography variant="body2">
                      Status: {item.status || 'Pending'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderManagementPage;
