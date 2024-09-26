import React, { useState } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Edit, Delete, Visibility, Add, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([
    {
      id: '1',
      title: 'Understanding React Context',
      author: 'Jane Smith',
      date: '2024-08-15',
      status: 'Published',
    },
    {
      id: '2',
      title: 'A Guide to JavaScript ES6 Features',
      author: 'John Doe',
      date: '2024-08-10',
      status: 'Draft',
    },
    // Add more blogs as needed
  ]);

  const [editMode, setEditMode] = useState(null);
  const [status, setStatus] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditClick = (blogId, currentStatus) => {
    setEditMode(blogId);
    setStatus(currentStatus);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDoneClick = (blogId) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === blogId ? { ...blog, status } : blog
    );
    setBlogs(updatedBlogs);
    setEditMode(null);
  };

  const handleCancelClick = () => {
    setEditMode(null);
  };

  const handleDeleteClick = (blogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  const handleViewDetails = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseDetails = () => {
    setSelectedBlog(null);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Blog Management
      </Typography>

      {/* <TextField
        label="Search Blogs"
        variant="outlined"
        sx={{width: '50%', mb: 3, mr: 2 }}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      /> */}
    <Link to="/admin/blogs/add">
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        sx={{ mb: 3 }}
        onClick={() => console.log('Redirect to Add Blog Page')}
      >
        Add New Blog
      </Button>
    </Link>

      <TableContainer component={Paper}>
        <Table aria-label="blog table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              {/* <TableCell>Author</TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                {/* <TableCell>{blog.author}</TableCell> */}
                <TableCell>{blog.date}</TableCell>
                <TableCell>
                  {editMode === blog.id ? (
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      sx={{ mr: 2 }}
                    >
                      <MenuItem value="Published">Published</MenuItem>
                      <MenuItem value="Draft">Draft</MenuItem>
                      <MenuItem value="Archived">Archived</MenuItem>
                    </Select>
                  ) : (
                    blog.status
                  )}
                </TableCell>
                <TableCell>
                  {editMode === blog.id ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDoneClick(blog.id)}
                        sx={{ mr: 1 }}
                      >
                        Done
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleEditClick(blog.id, blog.status)
                        }
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="default"
                        onClick={() => handleViewDetails(blog)}
                        sx={{ mr: 1 }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteClick(blog.id)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for viewing blog details */}
      <Dialog open={Boolean(selectedBlog)} onClose={handleCloseDetails}>
        <DialogTitle>Blog Details</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <Box>
              <Typography variant="h6">{selectedBlog.title}</Typography>
              {/* <Typography>Author: {selectedBlog.author}</Typography> */}
              <Typography>Date: {selectedBlog.date}</Typography>
              <Typography>Status: {selectedBlog.status}</Typography>
              {/* Blog content can be displayed here */}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogListPage;
