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
  IconButton,
  Rating,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, deleteReview } from '../../Redux/Slice/crudSlice';
import { toast } from 'react-toastify';
const ReviewPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews());
  },[])

  const { loading, reviews } = useSelector((state) => state.Crud);
  // const [reviews, setReviews] = useState([
  //   {
  //     id: 1,
  //     userName: 'John Doe',
  //     product: 'Laptop XYZ',
  //     reviewTitle: 'Great Product!',
  //     reviewContent: 'I am very happy with the laptop. It performs well and is very durable.',
  //     rating: 4,
  //   },
  //   {
  //     id: 2,
  //     userName: 'Jane Smith',
  //     product: 'Phone ABC',
  //     reviewTitle: 'Good Phone',
  //     reviewContent: 'The phone is decent, but the battery life could be better.',
  //     rating: 3,
  //   },
  //   // More sample reviews can be added here...
  // ]);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Handle delete dialog open
  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    // setReviews(reviews.filter((review) => review.id !== reviewToDelete.id));
    setDeleteDialogOpen(false);
    setReviewToDelete(null);
    dispatch(deleteReview(reviewToDelete._id))
    .unwrap()
    .then((response) => {
      if(!response.success){
        toast.error(response.message);
      }else{
        toast.success(response.message);
        dispatch(getReviews());
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>
        Customer Reviews
      </Typography>

      {/* Reviews Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell><strong>Review Title</strong></TableCell>
              <TableCell><strong>Review Content</strong></TableCell>
              <TableCell><strong>Rating</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.user.name}</TableCell>
                <TableCell>{review.product.name}</TableCell>
                <TableCell>{review.title}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <Rating name="read-only" value={review.rating} readOnly />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleDeleteClick(review)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this review? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewPage;
