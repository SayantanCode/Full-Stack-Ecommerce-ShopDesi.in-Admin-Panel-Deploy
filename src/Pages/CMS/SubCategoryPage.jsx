import React, { useEffect, useState } from "react";
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
  Skeleton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../../Redux/Slice/crudSlice";
import { toast } from "react-toastify";
const SubCategoryPage = () => {
  const dispatch = useDispatch();
  const { loading, categories, subCategories } = useSelector(
    (state) => state.Crud
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    category: "",
  });
  const [editingSubCategory, setEditingSubCategory] = useState(null);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubCategory((prevSubCategory) => ({
      ...prevSubCategory,
      [name]: value,
    }));
  };

  // Handle adding or editing a new subcategory
  const handleAddorUpdateSubCategory = () => {
    if (!newSubCategory.name || !newSubCategory.category) {
      toast.error("All fields are required");
      return;
    }

    if (editingSubCategory) {
      dispatch(updateSubCategory({id:editingSubCategory._id, data:newSubCategory}))
        .unwrap()
        .then((response) => {
          if (!response.success) {
            toast.error(response.message);
            return;
          }
          toast.success(response.message);
          setEditingSubCategory(null);
          setNewSubCategory({ name: "", category: "" });
          setModalOpen(false);
          dispatch(getSubCategories());
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error.message)
        });
    } else {
      dispatch(addSubCategory(newSubCategory))
        .unwrap()
        .then((response) => {
          if (!response.success) {
            toast.error(response.message);
          }
          toast.success(response.message);
          setNewSubCategory({ name: "", category: "" });
          setModalOpen(false);
          dispatch(getSubCategories());
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error.message)
        });
    }
  };

  // Handle editing an existing subcategory
  const handleEditingSubCategory = (subCategory) => {
    setEditingSubCategory(subCategory);
    setNewSubCategory({
      name: subCategory.name,
      category: subCategory.category,
    });
    setModalOpen(true);
  };

  // Handle deleting a subcategory
  const handleDeleteSubCategory = (subCategoryId) => {
    dispatch(deleteSubCategory(subCategoryId))
      .unwrap()
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        dispatch(getSubCategories());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Open the modal to add a new subcategory
  const handleOpenModal = () => {
    setEditingSubCategory(null);
    setNewSubCategory({ name: "", categoryId: "" });
    setModalOpen(true);
  };

  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Sub Categories
      </Typography>

      {/* Add Subcategory Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
        >
          Add Subcategory
        </Button>
      </Box>

      {subCategories.length > 0 ? (
        <>
          {/* Subcategories Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Subcategory Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Category</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subCategories?.map((subCategory) => (
                  <TableRow key={subCategory._id}>
                    <TableCell>{subCategory.name}</TableCell>
                    <TableCell>
                      {
                        categories.find(
                          (category) => category._id === subCategory.category
                        )?.name
                      }
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleEditingSubCategory(subCategory)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteSubCategory(subCategory._id)}
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
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            No Subcategories Found Or Added Yet
          </Typography>
        </>
      )}

      {/* Modal for Adding/Editing Subcategory */}
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
            {editingSubCategory ? "Edit Subcategory" : "Add Subcategory"}
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newSubCategory.category}
              onChange={handleInputChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Subcategory Name"
            name="name"
            value={newSubCategory.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddorUpdateSubCategory}
            >
              {editingSubCategory ? "Save Changes" : "Add Subcategory"}
            </Button>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SubCategoryPage;
