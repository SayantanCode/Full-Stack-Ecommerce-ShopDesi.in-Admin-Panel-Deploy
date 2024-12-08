import {
  Add,
  Delete,
  Edit,
  MoreVert,
  Schedule
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import moment from "moment/moment";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getProducts,
  updateProductStatus,
} from "../../Redux/Slice/crudSlice";

// Define a styled component for the "On Deal" badge
const DealBadge = styled("div")(({ theme }) => ({
  marginLeft: theme.spacing(1),
  padding: "4px 8px",
  borderRadius: "4px",
  background: "linear-gradient(45deg, red, white)",
  color: "white",
  fontWeight: "bold",
  fontSize: "10px",
  textTransform: "uppercase",
  zIndex: 1,
  animation: "slantFlash 2s linear infinite",
  "@keyframes slantFlash": {
    "0%": {
      backgroundPosition: "0% 0%",
    },
    "100%": {
      backgroundPosition: "100% 100%",
    },
  },
  backgroundSize: "200% 200%",
}));

const ProductPage = () => {
  const dispatch = useDispatch();
  const { loading, productsData } = useSelector((state) => state.Crud);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // States for local pagination
  const [page, setPage] = useState(0); // TablePagination uses zero-based indexing
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  useEffect(() => {
    // Fetch all products without pagination parameters
    dispatch(getProducts());
  }, [dispatch]);

  // State for Menu and Dialogs
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusSubMenuOpen, setStatusSubMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleStatusChange = (status) => {
    if (!selectedProduct) return;

    dispatch(updateProductStatus({ id: selectedProduct._id, data: { status } }))
      .unwrap()
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        dispatch(getProducts());
      })
      .catch((error) => {
        toast.error("An error occurred while updating the status.");
      });

    setStatusSubMenuOpen(false);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;

    dispatch(deleteProduct(selectedProduct._id))
      .unwrap()
      .then((response) => {
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        dispatch(getProducts());
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the product.");
      });

    handleMenuClose();
    setDeleteModalOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to first page on search
  };
  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (array, comparator) => {
    const stabilizedArray = array.map((el, index) => [el, index]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
  
    const aValueNum = isNaN(parseFloat(aValue)) ? aValue : parseFloat(aValue);
    const bValueNum = isNaN(parseFloat(bValue)) ? bValue : parseFloat(bValue);
  
    if (typeof aValueNum === 'number' && typeof bValueNum === 'number') {
      return bValueNum - aValueNum;
    } else {
      const aValueStr = String(aValue).toLowerCase();
      const bValueStr = String(bValue).toLowerCase();
  
      if (bValueStr < aValueStr) {
        return -1;
      }
      if (bValueStr > aValueStr) {
        return 1;
      }
      return 0;
    }
  };
  
  
  
  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!productsData?.products) return [];
    return productsData.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productsData, searchQuery]);
  const sortedProducts = sortData(
    filteredProducts,
    getComparator(order, orderBy)
  );
  // Paginate the filtered products
  const paginatedProducts = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: { xs: 0, sm: 2 }, my: 5 }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4">Products List</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          {/* Search Bar */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ minWidth: 200 }}
          />
          {/* <Tooltip title="Filter">
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip> */}
          <Link to="/admin/products/add" style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<Add />}>
              Add Product
            </Button>
          </Link>
        </Box>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table aria-label="products table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSortRequest("name")}
                >
                  Product Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleSortRequest("category")}
                >
                  Category
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "subCategory"}
                  direction={orderBy === "subCategory" ? order : "asc"}
                  onClick={() => handleSortRequest("subCategory")}
                >
                  Sub Category
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "brand"}
                  direction={orderBy === "brand" ? order : "asc"}
                  onClick={() => handleSortRequest("brand")}
                >
                  Brand
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel 
                  active={orderBy === "mrp"}
                  direction={orderBy === "mrp" ? order : "asc"}
                  onClick={() => handleSortRequest("mrp")}
                >

                  M.R.P
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
              <TableSortLabel 
                  active={orderBy === "costPrice"}
                  direction={orderBy === "costPrice" ? order : "asc"}
                  onClick={() => handleSortRequest("costPrice")}
                >

                  Cost Price
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
              <TableSortLabel 
                  active={orderBy === "sellingPrice"}
                  direction={orderBy === "sellingPrice" ? order : "asc"}
                  onClick={() => handleSortRequest("sellingPrice")}
                >

                  Selling Price
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "discount"}
                  direction={orderBy === "discount" ? order : "asc"}
                  onClick={() => handleSortRequest("discount")}
                >
                  Discount
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "stock"}
                  direction={orderBy === "stock" ? order : "asc"}
                  onClick={() => handleSortRequest("stock")}
                >
                  Stock
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleSortRequest("status")}
                >
                  Status
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.length > 0 ? (
              sortedProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={product.image[0]}
                          alt={product.name}
                          sx={{
                            mr: { xs: 1, sm: 2 },
                            width: { xs: 32, sm: 48 },
                            height: { xs: 32, sm: 48 },
                          }}
                        >
                          {product.name.charAt(0)}
                        </Avatar>
                        {product.name}
                      </Box>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.subCategory}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.mrp}</TableCell>
                    <TableCell>{product.costPrice}</TableCell>
                    <TableCell>{product.sellingPrice}</TableCell>

                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        position="relative"
                        width={"100px"}
                      >
                        {Math.round(product.discount * 100) / 100}%
                        {/* Conditionally render "On Deal" badge */}
                        {product.dealEnd && <DealBadge>On Deal</DealBadge>}
                      </Box>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color={
                          product.status === "Active"
                            ? "success.main"
                            : product.status === "Inactive"
                            ? "error.main"
                            : "warning.main"
                        }
                      >
                        {product.status === "Active" ? (
                          "Active"
                        ) : product.status === "Inactive" ? (
                          "Inactive"
                        ) : (
                          <>
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Schedule fontSize="small" sx={{ mr: 1 }} />
                              Scheduled On{" "}
                              {moment(product.launchDate).format(
                                "DD-MM-YYYY hh:mm A"
                              )}
                            </span>
                          </>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, product)}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={
                          Boolean(anchorEl) &&
                          selectedProduct?.name === product.name
                        }
                        onClose={handleMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        sx={{ zIndex: 10002 }}
                      >
                        <MenuItem onClick={() => setStatusSubMenuOpen(true)}>
                          <Schedule fontSize="small" sx={{ mr: 1 }} />
                          Update Status
                        </MenuItem>
                        {statusSubMenuOpen && (
                          <Menu
                            anchorEl={anchorEl}
                            open={statusSubMenuOpen}
                            onClose={() => setStatusSubMenuOpen(false)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            sx={{ zIndex: 10003 }}
                          >
                            <MenuItem
                              onClick={() => handleStatusChange("Active")}
                            >
                              Active
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleStatusChange("Inactive")}
                            >
                              Inactive
                            </MenuItem>
                          </Menu>
                        )}
                        <Link
                          to={`/products/${product._id}/edit`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <MenuItem>
                            <Edit fontSize="small" sx={{ mr: 1 }} />
                            Edit Product
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={handleDelete}>
                          <Delete fontSize="small" sx={{ mr: 1 }} />
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              loading? <TableRow><TableCell>Loading...</TableCell></TableRow>:<TableRow><TableCell>No Products Found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Pagination */}
      <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[2, 5, 10, 15, 20]}
        labelRowsPerPage="Products per page"
        sx={{ mt: 2 }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

export default ProductPage;
