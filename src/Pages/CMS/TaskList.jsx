import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Paper,
  Divider,
  Menu,
  MenuItem,
  TextField,
  Button,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { format, isSameDay, parse } from 'date-fns';
import { FilterList, Edit, Delete, Done, Clear } from '@mui/icons-material';

const TaskList = ({ tasks, filter, selectedDate, onFilterChange, onEditTask, onDeleteTask }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (index, task) => {
    setEditIndex(index);
    setEditValue(task.task);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditDone = () => {
    onEditTask(editIndex, editValue);
    setEditIndex(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'selected') {
      return isSameDay(parse(task.date, 'yyyy-MM-dd', new Date()), parse(selectedDate, 'yyyy-MM-dd', new Date()));
    }
    return true;
  });

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Task List</Typography>
        <Box>
          <Tooltip title="Filter">
            <IconButton onClick={handleFilterClick}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose} sx={{ mt: 1, zIndex:10002 }}>
            <MenuItem onClick={() => { onFilterChange('selected'); handleFilterClose(); }}>
              Show Tasks For Selected Dates
            </MenuItem>
            <MenuItem onClick={() => { onFilterChange('all'); handleFilterClose(); }}>
              Show All Tasks
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <List>
        {filteredTasks.map((task, index) => (
          <>
            <ListItem key={index}>
              {editIndex === index ? (
                <Box display="flex" alignItems="center" width="100%">
                  <TextField
                    value={editValue}
                    onChange={handleEditChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <IconButton onClick={handleEditDone}>
                    <Done />
                  </IconButton>
                  <IconButton onClick={handleEditCancel}>
                    <Clear />
                  </IconButton>
                </Box>
              ) : (
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <Box>
                    <Typography variant="subtitle1">{task.task}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {format(parse(task.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleEditClick(index, task)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDeleteTask(index)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
