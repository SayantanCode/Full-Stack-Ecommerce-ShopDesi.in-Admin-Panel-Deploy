import React, { useEffect, useState } from "react";
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
import { getProductDetails, getCategories, getSubCategories, getBrands, updateProduct } from "../../Redux/Slice/crudSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const dispatch = useDispatch();
  const {product_id}= useParams();
  const navigate = useNavigate();
  // const productId = product_id
  // const productId = window.location.pathname.split("/")[2];
  const {loading, productDetails, categories, subCategories, brands } = useSelector((state) => state.Crud);
  useEffect(() => {
    dispatch(getProductDetails(product_id));
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getBrands());
  },[])
  const [productData, setProductData] = useState({
    name:"",
    description: "",
    costPrice: "",
    sellingPrice: "",
    mrp: "",
    category: "",
    subCategory: "",
    brand: "",
    stock: "",
  });
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  useEffect(() => {
    if (productDetails.length > 0) {
      setProductData({
        name: productDetails[0].name,
        description: productDetails[0].description,
        costPrice: productDetails[0].costPrice,
        sellingPrice: productDetails[0].sellingPrice,
        oldPrice: productDetails[0]?.oldPrice,
        mrp: productDetails[0].mrp,
        category: productDetails[0].categoryId,
        subCategory: productDetails[0].subCategoryId,
        brand: productDetails[0].brandId,
        stock: productDetails[0].stock,
      });
      
      setFilteredSubCategories(subCategories?.filter((subCategory) => subCategory.category === productDetails[0].categoryId));
    }
  }, [productDetails]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  useEffect(() => {
    if (productDetails.length > 0) {
      setExistingImages(productDetails[0].image);
    }
  }, [productDetails]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setProductData((prev) => ({ ...prev, category, subCategory: "" }));
    setFilteredSubCategories(subCategories.filter((subCategory) => subCategory.category === category));
  };

  const handlePriceChange = (e, field) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    setProductData((prev) => ({ ...prev, [field]: numericValue }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("costPrice", productData.costPrice);
    formData.append("sellingPrice", productData.sellingPrice);
    formData.append("mrp", productData.mrp);
    formData.append("category", productData.category);
    formData.append("subCategory", productData.subCategory);
    formData.append("brand", productData.brand);
    formData.append("stock", productData.stock);

    images.forEach((image) => formData.append("image", image));

    existingImages.forEach((image) => formData.append("oldImages[]", image));
    if(existingImages.length===0 && images.length===0){
      toast.error("Please add at least one image to update the product");
      return
    }
    dispatch(updateProduct({id: product_id, data: formData}))
    .unwrap()
    .then((res) => {
      if(!res.success){
        toast.error(res.message)
      }
      else{
        toast.success(res.message)
        setTimeout(() => navigate("/admin/products"), 3000)
      }
    })
    // Submit formData via API
  };

  return (
    <Box sx={{ p: 3, my: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Product
      </Typography>

      {productDetails.length > 0 && productDetails.map((product) => (
        <>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cost Price"
            value={productData.costPrice}
            onChange={(e) => handlePriceChange(e, "costPrice")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Selling Price"
            value={productData.oldPrice ? productData.oldPrice : productData.sellingPrice}
            onChange={(e) => handlePriceChange(e, "sellingPrice")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Max Retail Price"
            value={productData.mrp}
            onChange={(e) => handlePriceChange(e, "mrp")}
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
              value={productData?.category}
              onChange={handleCategoryChange}
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
              value={productData?.subCategory}
              onChange={(e) =>
                setProductData((prev) => ({ ...prev, subCategory: e.target.value }))
              }
              label="Subcategory"
              disabled={!product.categoryId}
            >
              {filteredSubCategories?.map((subcategory) => (
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
              value={productData.brand}
              onChange={(e) =>
                setProductData((prev) => ({ ...prev, brand: e.target.value }))
              }
              label="Brand"
            >
              {brands.map((brand) => (
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() =>
                      setProductData((prev) => ({
                        ...prev,
                        stock: Math.max(0, parseInt(prev.stock) - 1),
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
                      setProductData((prev) => ({
                        ...prev,
                        stock: Math.min(100000, parseInt(prev.stock) + 1),
                      }))
                    }
                    disabled={productData.stock >= 100000}
                  >
                    <Add />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={productData.stock}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value === "" ? 0 : Math.max(0, Math.min(100000, parseInt(value)));
              setProductData((prev) => ({
                ...prev,
                stock: isNaN(numericValue) ? 0 : numericValue,
              }));
            }}
          />
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
              {/* {setExistingImages(() => product.image)} */}
              {existingImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    m: 1,
                  }}
                >
                  <img
                    src={image}
                    alt={`Existing Image ${index + 1}`}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={() => handleRemoveExistingImage(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "red",
                    }}
                  >
                    <Cancel />
                  </IconButton>
                </Box>
              ))}
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
                    alt={`Uploaded Image ${index + 1}`}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "red",
                    }}
                  >
                    <Cancel />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
        </>
      ))}

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update Product
        </Button>
      </Box>
    </Box>
  );
};

export default EditProduct;
