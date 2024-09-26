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
import { getCarousel, addCarousel, updateCarousel, deleteCarousel } from '../../Redux/Slice/crudSlice'

const CarouselPage = () => {
  const dispatch = useDispatch();
  const {loading, carousel } = useSelector((state) => state.Crud);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCarouselItem, setNewCarouselItem] = useState({
    title: '',
    image: null,
  });
  const [editingCarouselItem, setEditingCarouselItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getCarousel()); // Fetch the carousel items on component mount
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCarouselItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCarouselItem((prevItem) => ({ ...prevItem, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }else{
      setNewCarouselItem((prevItem) => ({ ...prevItem, image: editingCarouselItem?.image }));
      setImagePreview(editingCarouselItem?.image);
    }
  };

  // Handle adding or editing a carousel item using FormData
const handleAddOrUpdateCarouselItem = () => {
    if (!newCarouselItem.title) return; // Ensure title is provided
  
    const formData = new FormData();
    formData.append('title', newCarouselItem.title); // Always append the title
  
    if (newCarouselItem.image && newCarouselItem.image !== editingCarouselItem?.image) {
      // Append image only if a new image is selected
      formData.append('image', newCarouselItem.image);
    }
  
    if (editingCarouselItem) {
      // Dispatch update action with the form data
      dispatch(updateCarousel({ id: editingCarouselItem._id, data: formData }))
      .unwrap()
      .then((response) => {
        if(!response.success){
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        dispatch(getCarousel());
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      // Dispatch add action with the form data
      dispatch(addCarousel(formData)).
      unwrap()
      .then((response) => {
        if(!response.success){
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        dispatch(getCarousel());
      })
      .catch((error) => {
        console.error(error);
      });
    }
  
    // Reset the form after submission
    setNewCarouselItem({ title: '', image: null });
    setImagePreview(null);
    setModalOpen(false);
  };
  

  // Handle editing
  const handleEditCarouselItem = (item) => {
    setEditingCarouselItem(item);
    setNewCarouselItem({
      title: item.title,
      image: item.image, // Keep image unchanged unless user uploads a new one
    });
    setImagePreview(item.image); // Show current image as preview
    setModalOpen(true);
  };

  // Handle deleting
  const handleDeleteCarouselItem = (itemId) => {
    dispatch(deleteCarousel(itemId))
    .unwrap()
    .then((response) => {
      if(!response.success){
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      dispatch(getCarousel());
    })
    .catch((error) => {
      console.error('Error deleting carousel item:', error);
    });
  };

  // Open modal to add a new carousel item
  const handleOpenModal = () => {
    setEditingCarouselItem(null);
    setNewCarouselItem({ title: '', image: null });
    setImagePreview(null);
    setModalOpen(true);
  };

  return (
    <>
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Carousel Items
      </Typography>

      {/* Add Carousel Item Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenModal}>
          Add Carousel Item
        </Button>
      </Box>

      {carousel.length>0?(
        <>
      {/* Carousel Items Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {carousel?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <img loading='lazy' src={item.image} alt={item.title} style={{ width: '100px', height: 'auto' }} />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditCarouselItem(item)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCarouselItem(item._id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
      </>):
      (<>
        {loading?<Skeleton variant="rectangular" width="100%" height={300} />:<Typography variant="h6" gutterBottom>No Carousel Items</Typography>}
      </>)}

      {/* Modal for Adding/Editing Carousel Item */}
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
            {editingCarouselItem ? 'Edit Carousel Item' : 'Add Carousel Item'}
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={newCarouselItem.title}
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
            <Button variant="contained" color="primary" onClick={handleAddOrUpdateCarouselItem}>
              {editingCarouselItem ? 'Save Changes' : 'Add Carousel Item'}
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

export default CarouselPage;
