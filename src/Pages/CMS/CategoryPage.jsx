import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
  Skeleton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../Redux/Slice/crudSlice';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.Crud);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategoryItem, setNewCategoryItem] = useState({
    name: '',
    image: null,
  });
  const [editingCategoryItem, setEditingCategoryItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getCategories()); // Fetch the categories on component mount
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoryItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategoryItem((prevItem) => ({ ...prevItem, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    } else {
      setNewCategoryItem((prevItem) => ({ ...prevItem, image: editingCategoryItem?.image }));
      setImagePreview(editingCategoryItem?.image);
    }
  };

  // Handle adding or editing a category item using FormData
  const handleAddOrUpdateCategoryItem = () => {
    if (!newCategoryItem.name) return; // Ensure category name is provided

    const formData = new FormData();
    formData.append('name', newCategoryItem.name); // Always append the category name

    if (newCategoryItem.image && newCategoryItem.image !== editingCategoryItem?.image) {
      // Append image only if a new image is selected
      formData.append('image', newCategoryItem.image);
    }

    if (editingCategoryItem) {
      // Dispatch update action with the form data
      dispatch(updateCategory({ id: editingCategoryItem._id, data: formData }))
        .unwrap()
        .then((response) => {
          if (!response.success) {
            toast.error(response.message);
            return;
          }
          toast.success(response.message);
          dispatch(getCategories());
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Dispatch add action with the form data
      dispatch(addCategory(formData))
        .unwrap()
        .then((response) => {
          if (!response.success) {
            toast.error(response.message);
            return;
          }
          toast.success(response.message);
          dispatch(getCategories());
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Reset the form after submission
    setNewCategoryItem({ name: '', image: null });
    setImagePreview(null);
    setModalOpen(false);
  };

  // Handle editing
  const handleEditCategoryItem = (item) => {
    setEditingCategoryItem(item);
    setNewCategoryItem({
      name: item.name,
      image: item.image, // Keep image unchanged unless user uploads a new one
    });
    setImagePreview(item.image); // Show current image as preview
    setModalOpen(true);
  };

  // Handle deleting
  const handleDeleteCategoryItem = (itemId) => {
    dispatch(deleteCategory(itemId))
      .unwrap()
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        dispatch(getCategories());
      })
      .catch((error) => {
        console.error('Error deleting category item:', error);
      });
  };

  // Open modal to add a new category item
  const handleOpenModal = () => {
    setEditingCategoryItem(null);
    setNewCategoryItem({ name: '', image: null });
    setImagePreview(null);
    setModalOpen(true);
  };

  return (
    <>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>

        {/* Add Category Item Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenModal}>
            Add Category
          </Button>
        </Box>

        {categories?.length > 0 ? (
          <>
            {/* Categories Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Category Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Image</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {loading ? (
                  <TableBody>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <TableRow key={item}>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    {categories?.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <img loading="lazy" src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleEditCategoryItem(item)} color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteCategoryItem(item._id)} color="secondary">
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              No Categories Found Or Added Yet
            </Typography>
          </>
        )}

        {/* Modal for Adding/Editing Category Item */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {editingCategoryItem ? 'Edit Category' : 'Add Category'}
            </Typography>
            <TextField
              label="Category Name"
              name="name"
              value={newCategoryItem.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'block', marginTop: '16px' }}
            />
            {imagePreview && (
              <Box mt={2}>
                <Typography variant="subtitle1">Preview:</Typography>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '200px' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" onClick={handleAddOrUpdateCategoryItem}>
                {editingCategoryItem ? 'Save Changes' : 'Add Category'}
              </Button>
              <Button variant="outlined" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default CategoryPage;
