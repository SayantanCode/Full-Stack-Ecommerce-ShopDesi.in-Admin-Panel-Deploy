import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, parse, addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';
import { Paper, Box, Button, Grid, Typography, TextField, Select, MenuItem, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TodayIcon from '@mui/icons-material/Today';

const CustomCalendar = ({ tasks, onAddTask, onDateSelect }) => {
  const theme = useTheme();  // Access the current theme
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskInput, setTaskInput] = useState('');
  const [view, setView] = useState('month'); // Default to monthly view
  const [customDate, setCustomDate] = useState('');
  useEffect(() => {
    onDateSelect(format(new Date(), 'yyyy-MM-dd'));
  }, []);
  const handleAddTask = () => {
    if (taskInput) {
      onAddTask(format(selectedDate, 'yyyy-MM-dd'), taskInput);
      setTaskInput('');
    }
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    onDateSelect(format(day, 'yyyy-MM-dd'));
  };

  const prevPeriod = () => {
    if (view === 'month') {
      setCurrentMonth(subMonths(currentMonth, 1));
    } else if (view === 'week') {
      setCurrentMonth(subWeeks(currentMonth, 1));
    }
  };

  const nextPeriod = () => {
    if (view === 'month') {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else if (view === 'week') {
      setCurrentMonth(addWeeks(currentMonth, 1));
    }
  };

  const jumpToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
    setCurrentDate(new Date());
    onDateSelect(format(new Date(), 'yyyy-MM-dd'));
  };

  const handleCustomDateChange = (e) => {
    const selected = parse(e.target.value, 'yyyy-MM-dd', new Date());
    setCurrentMonth(selected);
    setSelectedDate(selected);
    onDateSelect(format(selected, 'yyyy-MM-dd'));
  };

  const renderCells_V1 = () => {
    const start = view === 'month' ? startOfMonth(currentMonth) : startOfWeek(currentMonth);
    const end = view === 'month' ? endOfMonth(start) : endOfWeek(start);
    const rows = [];
    let days = [];
    let day = startOfWeek(start);
  
    while (day <= end) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <Grid item key={day} sx={{ width: 75, height: 75, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', borderRadius: '5px', backgroundColor: isSameDay(day, selectedDate) ? theme.palette.primary.light : isSameMonth(day, start) ? theme.palette.background.paper : theme.palette.action.hover, color: day.getDay() === 0 ? theme.palette.error.main : theme.palette.text.primary, border: isSameDay(day, currentDate) ? `2px solid ${theme.palette.secondary.main}` : `1px solid ${theme.palette.divider}`, }} onClick={() => handleDateClick(cloneDay)} >
            {isSameMonth(day, start) ? formattedDate : ''}
            {tasks.some(task => isSameDay(parse(task.date, 'yyyy-MM-dd', new Date()), day)) && (
              <Typography sx={{ color: theme.palette.success.main }}>✔</Typography>
            )}
          </Grid>
        );
        day = addDays(day, 1);
      }
      rows.push(<Grid container justifyContent="space-between" key={day}>{days}</Grid>);
      days = [];
    }
    return <Box>{rows}</Box>;
  };

  const renderCells_V2 = () => {
    const start = view === 'month' ? startOfMonth(currentMonth) : startOfWeek(currentMonth);
    const end = view === 'month' ? endOfMonth(start) : endOfWeek(start);
    const rows = [];
    let days = [];
    let day = startOfWeek(start);
    let prevMonth = subMonths(start, 1);
    let nextMonth = addMonths(start, 1);
  
    while (day <= end) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        let month = day.getMonth();
        let year = day.getFullYear();
        if (month < start.getMonth()) {
          month = prevMonth.getMonth();
          year = prevMonth.getFullYear();
        } else if (month > start.getMonth()) {
          month = nextMonth.getMonth();
          year = nextMonth.getFullYear();
        }
        days.push(
          <Grid item key={day} sx={{ width: { xs: 42, md: 75 }, height: {xs: 42, md: 75}, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', borderRadius: '5px', backgroundColor: isSameDay(day, selectedDate) ? theme.palette.primary.light : isSameMonth(day, start) ? theme.palette.background.paper : theme.palette.action.hover, color: day.getDay() === 0 ? theme.palette.error.main : theme.palette.text.primary, border: isSameDay(day, currentDate) ? `2px solid ${theme.palette.secondary.main}` : `1px solid ${theme.palette.divider}`, }} onClick={() => handleDateClick(cloneDay)} >
            {formattedDate}
            {tasks.some(task => isSameDay(parse(task.date, 'yyyy-MM-dd', new Date()), day)) && (
              <Typography sx={{ color: theme.palette.success.main }}>✔</Typography>
            )}
          </Grid>
        );
        day = addDays(day, 1);
      }
      rows.push(<Grid container justifyContent="space-between" key={day}>{days}</Grid>);
      days = [];
    }
    return <Box>{rows}</Box>;
  };


  const renderWeekDays = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        {weekDays.map((day, index) => (
          <Grid item key={index} sx={{ width: { xs: 42, md: 75 }, height: {xs: 30, md: 75}, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            {day}
          </Grid>
        ))}
      </Grid>
    );
  };


  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2, }}>
        <Button onClick={prevPeriod}>Prev</Button>
        <Typography variant="h6">{format(currentMonth, 'MMMM yyyy')}</Typography>
        <Button onClick={nextPeriod}>Next</Button>
      </Grid>

      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Select value={view} onChange={(e) => setView(e.target.value)} displayEmpty variant="outlined" sx={{ minWidth: 120 }}>
          <MenuItem value="week">Weekly View</MenuItem>
          <MenuItem value="month">Monthly View</MenuItem>
          {/* <MenuItem value="custom">Custom Date</MenuItem> */}
        </Select>
        <Button variant="contained" onClick={jumpToToday} startIcon={<TodayIcon />}>
          Jump to Today
        </Button>
      </Grid>

      {view === 'custom' && (
        <TextField
          type="date"
          value={customDate}
          onChange={handleCustomDateChange}
          fullWidth
          variant="outlined"
          label="Jump to Date"
        />
      )}

      {renderWeekDays()}
      {renderCells_V2()}

      <Box mt={2}>
        <TextField
          label="Add Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button startIcon={<AddIcon />} onClick={handleAddTask} sx={{ mt: 2 }} fullWidth variant="contained">
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default CustomCalendar;
