import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getDeals,
  addDeal,
  updateDeal,
  deleteDeal,
} from "../../Redux/Slice/crudSlice"; // Assuming your actions are in the same folder
import { toast } from "react-toastify";

const DealsPage = () => {
  const dispatch = useDispatch();
  const { loading, deals, productsData } = useSelector((state) => state.Crud);

  const [modalOpen, setModalOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({
    product: "",
    discountedPercentage: "",
    dealStart: dayjs(),
    dealEnd: dayjs().add(2, "day"), // Default to 2 days later
  });
  const [editingDeal, setEditingDeal] = useState(null);

  // Fetch products and deals on component mount
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getDeals());
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // If the input field is "discountedPercentage", apply the specific logic
    if (name === "discountedPercentage") {
      // Remove any non-numeric characters
      const numericValue = value.replace(/[^0-9]/g, '');
  
      // Convert the numeric value to an integer and clamp between 0 and 100
      const clampedValue = Math.max(0, Math.min(100, parseInt(numericValue || '0')));
  
      // Update state for discountedPercentage
      setNewDeal((prevDeal) => ({ ...prevDeal, [name]: clampedValue.toString() }));
    } else {
      // For other inputs, keep the original logic
      setNewDeal((prevDeal) => ({ ...prevDeal, [name]: value }));
    }
  };
  

  // Handle date and time changes
  const handleDateChange = (name, value) => {
    setNewDeal((prevDeal) => ({ ...prevDeal, [name]: value }));
  };

  // Handle adding or editing a deal
  const handleAddDeal = () => {
    if (
      !newDeal.product ||
      !newDeal.discountedPercentage ||
      !newDeal.dealStart ||
      !newDeal.dealEnd
    ) {
      toast.error("All fields are required");
      return;
    }

    if (editingDeal) {
      dispatch(updateDeal({ id: editingDeal._id, data: newDeal }))
        .unwrap()
        .then((response) => {
          if (!response.success) {
            toast.error(response.message);
            return;
          }
          toast.success(response.message);
          dispatch(getDeals());
        })
        .catch((error) => console.log(error));
    } else {
      dispatch(addDeal(newDeal))
        .unwrap()
        .then((response) => {
          if (!response.success) {
            toast.error(response.message);
            return;
          }
          toast.success(response.message);
          dispatch(getDeals());
        })
        .catch((error) => console.log(error));
    }

    setNewDeal({
      product: "",
      discountedPercentage: "",
      dealStart: dayjs(),
      dealEnd: dayjs().add(2, "day"),
    });
    setModalOpen(false);
  };

  // Handle editing an existing deal
  const handleEditDeal = (deal) => {
    setEditingDeal(deal);
    setNewDeal({
      ...deal,
      product: deal.product._id,
      dealStart: dayjs(deal.dealStart),
      dealEnd: dayjs(deal.dealEnd),
    });
    setModalOpen(true);
  };

  // Handle deleting a deal
  const handleDeleteDeal = (dealId) => {
    dispatch(deleteDeal(dealId))
      .unwrap()
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        dispatch(getDeals());
      })
      .catch((error) => console.log(error));
  };

  // Open the modal to add a new deal
  const handleOpenModal = () => {
    setEditingDeal(null);
    // setNewDeal({ product: '', discountedPercentage: '', dealStart: dayjs(), dealEnd: dayjs().add(2, 'day') });
    setModalOpen(true);
  };

  return (
    <>
      {/* {console.log(newDeal)} */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Deals Page
        </Typography>

        {/* Add Deal Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Add Deal
          </Button>
        </Box>

        {/* Deals Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Product</strong>
                </TableCell>
                <TableCell>
                  <strong>Discount</strong>
                </TableCell>
                <TableCell>
                  <strong>Start Date</strong>
                </TableCell>
                <TableCell>
                  <strong>End Date</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deals?.map((deal) => (
                <TableRow key={deal._id}>
                  <TableCell>{deal.product.name}</TableCell>
                  <TableCell>{deal.discountedPercentage}</TableCell>
                  <TableCell>
                    {dayjs(deal.dealStart).format("YYYY-MM-DD HH:mm")}
                  </TableCell>
                  <TableCell>
                    {dayjs(deal.dealEnd).format("YYYY-MM-DD HH:mm")}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEditDeal(deal)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteDeal(deal._id)}
                      color="secondary"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Adding/Editing Deal */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {editingDeal ? "Edit Deal" : "Add Deal"}
            </Typography>

            {/* Product Dropdown */}
            <FormControl fullWidth variant="outlined">
              <InputLabel>Product</InputLabel>
              <Select
                label="Product"
                name="product"
                value={newDeal?.product}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              >
                {/* {editingDeal? null: <MenuItem value="">Select Product</MenuItem>} */}
                {Object.keys(productsData).length > 0 &&
                  productsData?.products.map((product) => (
                    <MenuItem key={product._id} value={product._id}>
                      {product.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Discount"
              name="discountedPercentage"
              value={newDeal?.discountedPercentage}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              inputProps={{
                min: 0,
                max: 100,
                pattern: "[0-9]*",
                maxLength: 3,
              }}
              InputProps={{
                endAdornment: <>%</>,
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                value={newDeal.dealStart}
                onChange={(value) => handleDateChange("dealStart", value)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
                sx={{ width: "100%", mt: 2 }}
              />
              <DateTimePicker
                label="End Date"
                value={newDeal.dealEnd}
                onChange={(value) => handleDateChange("dealEnd", value)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
                sx={{ width: "100%", mt: 2 }}
              />
            </LocalizationProvider>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddDeal}
              >
                {editingDeal ? "Save Changes" : "Add Deal"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setModalOpen(false);
                  setNewDeal({
                    product: "",
                    discountedPercentage: "",
                    dealStart: dayjs(),
                    dealEnd: dayjs().add(2, "day"), // Default to 2 days later
                  });
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default DealsPage;
