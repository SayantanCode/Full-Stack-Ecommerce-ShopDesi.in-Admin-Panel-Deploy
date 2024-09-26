import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

const AdminProfileUpdate = ({ profile, onSave, onCancel }) => {
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedProfile);
  };

  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} align="center">
            <Avatar
              src={updatedProfile.picture}
              sx={{ width: 150, height: 150, mb: 2 }}
              alt="Profile Picture"
            />
            <Button variant="outlined" component="label">
              Change Picture
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) =>
                  setUpdatedProfile({
                    ...updatedProfile,
                    picture: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Edit Profile
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Name"
                name="name"
                value={updatedProfile.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={updatedProfile.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                name="phone"
                value={updatedProfile.phone}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Username"
                name="username"
                value={updatedProfile.username}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={updatedProfile.password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminProfileUpdate;
