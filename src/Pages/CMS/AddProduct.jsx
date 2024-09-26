import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Add, Cancel, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getSubCategories, getBrands, addProduct } from "../../Redux/Slice/crudSlice"; // Replace with your actual action creators
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Consolidated product state
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    buyingPrice: "",
    sellingPrice: "",
    maxRetailPrice: "",
    category: "",
    subCategory: "",
    brand: "",
    stock: 0,
    launchDateTime: dayjs().add(2, 'day')
  });

  const [images, setImages] = useState([]);

  // Fetching categories, subcategories, and brands from the store
  const { categories, subCategories, brands } = useSelector((state) => state.Crud);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getBrands());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (e, field) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    setProductData((prevData) => ({
      ...prevData,
      [field]: numericValue,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Dispatch form data to API
    const formData = new FormData();
    formData.append("name", productData.productName);
    formData.append("description", productData.description);
    formData.append("costPrice", productData.buyingPrice);
    formData.append("sellingPrice", productData.sellingPrice);
    formData.append("mrp", productData.maxRetailPrice);
    formData.append("category", productData.category);
    formData.append("subCategory", productData.subCategory);
    formData.append("brand", productData.brand);
    formData.append("stock", productData.stock);
    if(productData.launchDateTime){
      formData.append("launchDate", productData.launchDateTime);
    }
    images.forEach((image) => {
      formData.append("image", image);
    });
    dispatch(addProduct(formData))
      .unwrap()
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        navigate("/admin/products");
      })
    // Submit logic
  };

  return (
    <Box sx={{ p: 3, my: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add New Product
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cost Price"
            name="buyingPrice"
            value={productData.buyingPrice}
            onChange={(e) => handlePriceChange(e, "buyingPrice")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Selling Price"
            name="sellingPrice"
            value={productData.sellingPrice}
            onChange={(e) => handlePriceChange(e, "sellingPrice")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Max Retail Price"
            name="maxRetailPrice"
            value={productData.maxRetailPrice}
            onChange={(e) => handlePriceChange(e, "maxRetailPrice")}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              label="Category"
            >
              {categories?.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Subcategory</InputLabel>
            <Select
              name="subCategory"
              value={productData.subCategory}
              onChange={handleInputChange}
              label="Subcategory"
              disabled={!productData.category}
            >
              {subCategories?.filter((subcategory) => subcategory.category === productData.category).map((subcategory) => (
                <MenuItem key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Brand</InputLabel>
            <Select
              name="brand"
              value={productData.brand}
              onChange={handleInputChange}
              label="Brand"
            >
              {brands?.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Stock"
            fullWidth
            name="stock"
            value={productData.stock}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() =>
                      setProductData((prevData) => ({
                        ...prevData,
                        stock: Math.max(0, parseInt(prevData.stock) - 1),
                      }))
                    }
                    disabled={productData.stock <= 0}
                  >
                    <Remove />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setProductData((prevData) => ({
                        ...prevData,
                        stock: Math.min(100000, parseInt(prevData.stock) + 1),
                      }))
                    }
                    disabled={productData.stock >= 100000}
                  >
                    <Add />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setProductData((prevData) => ({
                ...prevData,
                stock: Number.isNaN(value) ? 0 : Math.max(0, value),
              }));
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Schedule Date and Time For Product Launch"
              value={productData.launchDateTime}
              onChange={(newValue) =>
                setProductData((prevData) => ({
                  ...prevData,
                  launchDateTime: newValue,
                }))
              }
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Button variant="contained" component="label" startIcon={<Add />}>
              Upload Images
              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    m: 1,
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product Image ${index + 1}`}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    sx={{ position: "absolute", top: 0, right: 0, color: "red" }}
                  >
                    <Cancel />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProduct;
