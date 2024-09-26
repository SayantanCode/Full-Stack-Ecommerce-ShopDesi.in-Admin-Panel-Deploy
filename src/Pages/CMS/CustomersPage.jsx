import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Avatar,
    TableSortLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, updateCustomerStatus, deleteCustomer } from '../../Redux/Slice/authSlice';
import { toast } from 'react-toastify';

const CustomersPage = () => {
    const dispatch = useDispatch();
    const { customers } = useSelector((state) => state.Auth);
    const [customersData, setCustomersData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State for delete confirmation modal
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    useEffect(() => {
        if (customers && customers.length > 0) {
            setCustomersData(customers);
        }
    }, [customers]);

    const handleEditCustomer = (customerId) => {
        dispatch(updateCustomerStatus(customerId))
            .unwrap()
            .then((response) => {
                if (!response.success) {
                    toast.error(response.message);
                } else {
                    toast.success(response.message);
                    dispatch(getCustomers());
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteCustomer = () => {
        if (selectedCustomerId) {
            dispatch(deleteCustomer(selectedCustomerId))
                .unwrap()
                .then((response) => {
                    if (!response.success) {
                        toast.error(response.message);
                    } else {
                        toast.success(response.message);
                        dispatch(getCustomers());
                    }
                    handleCloseDialog();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleOpenDialog = (customerId) => {
        setSelectedCustomerId(customerId);
        setOpenConfirmDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenConfirmDialog(false);
        setSelectedCustomerId(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortRequest = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
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
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const filteredCustomers = customersData.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCustomers = sortData(filteredCustomers, getComparator(order, orderBy));

    return (
        <Box sx={{ p: 3, mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Customers
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                    sx={{ width: '50%' }}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'avatar'}
                                    direction={orderBy === 'avatar' ? order : 'asc'}
                                    onClick={() => handleSortRequest('avatar')}
                                >
                                    Avatar
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleSortRequest('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'}
                                    onClick={() => handleSortRequest('email')}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'phone'}
                                    direction={orderBy === 'phone' ? order : 'asc'}
                                    onClick={() => handleSortRequest('phone')}
                                >
                                    Phone
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'address'}
                                    direction={orderBy === 'address' ? order : 'asc'}
                                    onClick={() => handleSortRequest('address')}
                                >
                                    Address
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'isActive'}
                                    direction={orderBy === 'isActive' ? order : 'asc'}
                                    onClick={() => handleSortRequest('isActive')}
                                >
                                    Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => (
                            <TableRow key={customer._id}>
                                <TableCell>
                                    <Avatar src={customer.avatar} alt={customer.name}>
                                        {customer.name[0]}
                                    </Avatar>
                                </TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label="edit customer" onClick={() => handleEditCustomer(customer._id)}>
                                        <Typography variant="body2">Toggle Status</Typography>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" aria-label="delete customer" onClick={() => handleOpenDialog(customer._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={sortedCustomers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[1, 5, 10, 25, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page"
            />

            {/* Confirmation Modal */}
            <Dialog
                open={openConfirmDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this customer? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCustomer} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CustomersPage;
