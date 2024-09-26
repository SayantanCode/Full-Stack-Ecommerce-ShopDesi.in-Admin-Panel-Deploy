import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Helper/helper";

export const addCarousel = createAsyncThunk(
  "Crud/addCarousel",
  async (data) => {
    try {
      const res = await axiosInstance.post("/api/admin/carousel/create", data);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const updateCarousel = createAsyncThunk(
  "Crud/updateCarousel",
  async ({ id, data }) => {
    try {
      // for (let [key, value] of data.entries()) {
      //   console.log(key, value);
      // }
      const res = await axiosInstance.post(
        `/api/admin/carousel/update/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const deleteCarousel = createAsyncThunk(
  "Crud/deleteCarousel",
  async (data) => {
    try {
      const res = await axiosInstance.delete(
        `/api/admin/carousel/delete/${data}`
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const getCarousel = createAsyncThunk(
  "Crud/getCarousel",
  async (data) => {
    try {
      const res = await axiosInstance.get("/api/admin/carousel/all");
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);

export const addCategory = createAsyncThunk(
  "Crud/addCategory",
  async (data) => {
    try {
      const res = await axiosInstance.post("/api/admin/category/create", data);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const updateCategory = createAsyncThunk(
  "Crud/updateCategory",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.post(
        `/api/admin/category/update/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "Crud/deleteCategory",
  async (data) => {
    try {
      const res = await axiosInstance.delete(
        `/api/admin/category/delete/${data}`
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const getCategories = createAsyncThunk(
  "Crud/getCategory",
  async (data) => {
    try {
      const res = await axiosInstance.get("/api/admin/category/all");
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "Crud/addSubCategory",
  async (data) => {
    try {
      const res = await axiosInstance.post(
        "/api/admin/subcategory/create",
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const updateSubCategory = createAsyncThunk(
  "Crud/updateSubCategory",
  async ({ id, data }) => {
    try {
      console.log(id, data);
      const res = await axiosInstance.post(
        `/api/admin/subcategory/update/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const deleteSubCategory = createAsyncThunk(
  "Crud/deleteSubCategory",
  async (id) => {
    try {
      const res = await axiosInstance.delete(
        `/api/admin/subcategory/delete/${id}`
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const getSubCategories = createAsyncThunk(
  "Crud/getSubCategory",
  async (data) => {
    try {
      const res = await axiosInstance.get("/api/admin/subcategory/all");
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const addBrand = createAsyncThunk("Crud/addBrand", async (data) => {
  try {
    const res = await axiosInstance.post("/api/admin/brand/create", data);
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const updateBrand = createAsyncThunk(
  "Crud/updateBrand",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.post(
        `/api/admin/brand/update/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const deleteBrand = createAsyncThunk("Crud/deleteBrand", async (id) => {
  try {
    const res = await axiosInstance.delete(`/api/admin/brand/delete/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const getBrands = createAsyncThunk("Crud/getBrand", async (data) => {
  try {
    const res = await axiosInstance.get("/api/admin/brand/all");
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const addProduct = createAsyncThunk("Crud/addProduct", async (data) => {
  try {
    const res = await axiosInstance.post("/api/admin/product/create", data);
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const updateProduct = createAsyncThunk(
  "Crud/updateProduct",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.post(
        `/api/admin/product/update/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const updateProductStatus = createAsyncThunk(
  "Crud/updateProductStatus",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.post(
        `/api/admin/product/update-status/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "Crud/deleteProduct",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/product/delete/${id}`);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const getProducts = createAsyncThunk("Crud/getProduct", async (data) => {
  try {
    const res = await axiosInstance.get("/api/admin/product/all", {
      params: data,
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const getProductDetails = createAsyncThunk(
  "Crud/getProductDetails",
  async (id) => {
    try {
      const res = await axiosInstance.get(`/api/admin/product/single/${id}`);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const addDeal = createAsyncThunk("Crud/addDeal", async (data) => {
  try {
    const res = await axiosInstance.post("/api/admin/deal/create", data);
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const updateDeal = createAsyncThunk(
  "Crud/updateDeal",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.post(
        `/api/admin/deal/update/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const deleteDeal = createAsyncThunk("Crud/deleteDeal", async (id) => {
  try {
    const res = await axiosInstance.delete(`/api/admin/deal/delete/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const getDeals = createAsyncThunk("Crud/getDeal", async (data) => {
  try {
    const res = await axiosInstance.get("/api/admin/deal/all");
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const getOrders = createAsyncThunk("Crud/getOrder", async (data) => {
  try {
    const res = await axiosInstance.get("/api/admin/orders/all", {
      params: data,
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const updateOrderStatus = createAsyncThunk(
  "Crud/updateOrderStatus",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.post(
        `/api/admin/orders/update-status/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
);
export const getReviews = createAsyncThunk(
  "Crud/getReviews", 
  async () => {
  try {
    const res = await axiosInstance.get("/api/admin/reviews/all");
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});
export const deleteReview = createAsyncThunk(
  "Crud/deleteReview",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/reviews/delete/${id}`);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }
)
export const crudSlice = createSlice({
  name: "Crud",
  initialState: {
    loading: false,
    carousel: [],
    categories: [],
    subCategories: [],
    brands: [],
    addBrandLoad: false,
    productsData: {},
    productDetails: [],
    deals: [],
    orderList: [],
    reviews: [], // only perform get and delete reviews
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // CAROUSEL
      .addCase(addCarousel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCarousel.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(addCarousel.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCarousel.pending, (state, action) => {
        state.loading = true;
        state.carousel = [];
      })
      .addCase(getCarousel.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.success) {
          state.carousel = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(getCarousel.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCarousel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCarousel.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateCarousel.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCarousel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCarousel.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(deleteCarousel.rejected, (state, action) => {
        state.loading = false;
      })
      // Categories
      .addCase(addCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
        state.categories = [];
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.success) {
          state.categories = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
      })
      // Sub Category
      .addCase(addSubCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSubCategories.pending, (state, action) => {
        state.loading = true;
        state.subCategories = [];
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        if (action.payload.success) {
          state.subCategories = action.payload.data;
        }
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSubCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSubCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
      })
      // Brand
      .addCase(addBrand.pending, (state, action) => {
        state.addBrandLoad = true;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        console.log(action.payload);
        state.addBrandLoad = false;
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.addBrandLoad = false;
      })
      .addCase(getBrands.pending, (state, action) => {
        state.loading = true;
        state.brands = [];
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.success) {
          state.brands = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateBrand.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteBrand.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
      })
      // Product
      .addCase(addProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
        state.productsData = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.success) {
          state.productsData = action.payload.data;
          // state.productsInfo = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProductDetails.pending, (state, action) => {
        state.loading = true;
        state.productDetails = {};
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        if (action.payload.success) {
          state.productDetails = action.payload.data;
        }
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProductStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addDeal.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(addDeal.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDeals.pending, (state, action) => {
        state.loading = true;
        state.deals = [];
      })
      .addCase(getDeals.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.success) {
          state.deals = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(getDeals.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDeal.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(getOrders.pending, (state, action) => {
        state.loading = true;
        state.orderList = [];
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        if (action.payload.success) {
          state.orderList = action.payload.data;
        }
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getReviews.pending, (state, action) => {
        state.loading = true;
        state.reviews = [];
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        if (action.payload.success) {
          state.reviews = action.payload.data;
        }
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;  
      })
      .addCase(deleteReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
