import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Skeleton
} from '@mui/material';
import {Add, Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, addBrand, updateBrand, deleteBrand } from '../../Redux/Slice/crudSlice';
import { toast } from 'react-toastify';
const BrandManagement = () => {
  const dispatch = useDispatch();
  const { loading, brands, addBrandLoad } = useSelector((state) => state.Crud);
  // const [brands, setBrands] = useState([{ name: 'Brand 1', logo: 'https://picsum.photos/200', description: 'Brand 1 description' }, { name: 'Brand 2', logo: 'https://picsum.photos/200', description: 'Brand 2 description' }]);
  const [newBrand, setNewBrand] = useState({ name: '', logo: '', description: '' });
  const [editBrand, setEditBrand] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const handleAddBrand = () => {
      dispatch(addBrand(newBrand))
      .unwrap()
      .then((response) => {
        if(!response.success){
          toast.error(response.message);
        }else{
          toast.success(response.message);
          setNewBrand({ name: '', logo: '', description: '' });
          dispatch(getBrands());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditBrand = () => {
    dispatch(updateBrand({id: editBrand._id, data: {name: editBrand.name, logo: editBrand.logo, description: editBrand.description}}))
    .unwrap()
    .then((response) => {
      if(!response.success){
        toast.error(response.message);
      }else{
        toast.success(response.message);
        setEditBrand(null);
        setOpenDialog(false);
        dispatch(getBrands());
      }
    })
    setOpenDialog(false);
  };

  const handleDeleteBrand = (id) => {
    // DELETE request to remove a brand
    dispatch(deleteBrand(id))
    .unwrap()
    .then((response) => {
      if(!response.success){
        toast.error(response.message);
      }else{
        toast.success(response.message);
        dispatch(getBrands());
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <Box sx={{ my: { xs: 5, md: 6 }, p: { xs: 0, sm: 2 } }}>
      <Typography variant = "h4" sx={{ mb: 2 }}>Brand Management</Typography>

      {/* Add Brand Form */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Brand Name"
          value={newBrand.name}
          onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
          style={{ marginRight: 16 }}
          onKeyDown={(e) => { if (e.key === 'Enter') { handleAddBrand(); } }}
        />
        <TextField
          label="Logo URL"
          value={newBrand.logo}
          onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.value })}
          style={{ marginRight: 16 }}
          onKeyDown={(e) => { if (e.key === 'Enter') { handleAddBrand(); } }}
        />
        <TextField
          label="Description"
          value={newBrand.description}
          onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
          style={{ marginRight: 16 }}
          onKeyDown={(e) => { if (e.key === 'Enter') { handleAddBrand(); } }}
        />  
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddBrand} disabled={addBrandLoad}>
        {addBrandLoad ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : 'Add Brand'}
      </Button>
      </div>

      {/* Brand List Table */}
      {brands.length > 0 ? (
        <>
        <Paper>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Logo</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand._id}>
              <TableCell>{brand.name}</TableCell>
              <TableCell><img src={brand.logo} alt={brand.name} style={{ width: 50 }} /></TableCell>
              <TableCell>{brand.description}</TableCell>
              <TableCell>
                <IconButton onClick={() => { setEditBrand(brand); setOpenDialog(true); }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteBrand(brand._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
        </>
      ):(
        <>
        {loading?<Skeleton variant="rectangular" width="100%" height={300} />:<Typography variant="h6" gutterBottom>No Brands found or added yet</Typography>}
        </>
      )}
      {/* Edit Brand Dialog */}
      {editBrand && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogContent>
            <TextField
              label="Brand Name"
              value={editBrand.name}
              onChange={(e) => setEditBrand({ ...editBrand, name: e.target.value })}
              fullWidth
              sx={{my:2}}
            />
            <TextField
              label="Logo URL"
              value={editBrand.logo}
              onChange={(e) => setEditBrand({ ...editBrand, logo: e.target.value })}
              fullWidth
              sx={{mb:2}}
            />
            <TextField
              label="Description"
              value={editBrand.description}
              onChange={(e) => setEditBrand({ ...editBrand, description: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditBrand} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default BrandManagement;
