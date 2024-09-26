import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Typography, Grid, Paper, Avatar, CircularProgress, Input, IconButton,
} from '@mui/material';
import { Edit, Lock } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile, changePassword } from '../../Redux/Slice/authSlice'; // Assume these actions exist

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.Auth);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      avatar: user?.avatar || '',
    });
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    setProfileData((prevState) => ({ ...prevState, avatar: user?.avatar }));
    if (file) {
      setAvatarFile(file);
      setProfileData((prevState) => ({ ...prevState, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);
    formData.append('address', profileData.address);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    dispatch(updateUserProfile(formData))
      .unwrap()
      .then((response) => {
        if(!response.success){
          toast.error(response.message);
          dispatch(getUserProfile());
          return
        }
        dispatch(getUserProfile());
        setShowEditProfile(false);
        setShowChangePassword(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error('All fields are required!');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('New password and confirm password do not match!');
      return;
    }
    dispatch(changePassword({ oldPassword, newPassword }))
      .unwrap()
      .then((response) => {
        toast[response.success ? 'success' : 'error'](response.message);
        if (response.success) {
          setOldPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
        }
        dispatch(getUserProfile());
        setShowEditProfile(false);
        setShowChangePassword(false);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ my: 8 }}>
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} sx={{ p: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" sx={{ mb: 2 }}>Admin Profile</Typography>
            
            {/* Profile Avatar and Info */}
            <Avatar src={profileData.avatar} alt="Profile Avatar" sx={{ width: 100, height: 100, mb: 2 }} />
            
            {!showEditProfile && (
              <Box textAlign="center">
                <Typography variant="body1"><strong>Name:</strong> {profileData.name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {profileData.email}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {profileData.phone}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {profileData.address}</Typography>
              </Box>
            )}

            {/* Buttons to toggle form visibility */}
            {!showEditProfile && (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setShowEditProfile(true)}
                sx={{ mt: 2 }}
              >
                Update Profile
              </Button>
            )}

            {!showChangePassword && (
              <Button
                variant="outlined"
                startIcon={<Lock />}
                onClick={() => setShowChangePassword(true)}
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            )}

            {/* Edit Profile Form */}
            {showEditProfile && (
              <Box component="form" onSubmit={handleProfileSubmit} sx={{ mt: 3, width: '100%' }}>
                <Input type="file" onChange={handleAvatarUpload} accept="image/*" sx={{ mb: 2 }} />
                <TextField fullWidth label="Name" name="name" value={profileData.name} onChange={handleInputChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Email" name="email" value={profileData.email} onChange={handleInputChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Phone" name="phone" value={profileData.phone} onChange={handleInputChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Address" name="address" value={profileData.address} onChange={handleInputChange} sx={{ mb: 2 }} />
                
                <Box display="flex" justifyContent="space-between">
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => {setShowEditProfile(false); setProfileData((prevState) => ({ ...prevState, avatar: user?.avatar }));}}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}

            {/* Change Password Form */}
            {showChangePassword && (
              <Box component="form" onSubmit={handlePasswordChange} sx={{ mt: 3, width: '100%' }}>
                <TextField fullWidth label="Old Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Confirm New Password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} sx={{ mb: 2 }} />
                
                <Box display="flex" justifyContent="space-between">
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Change Password'}
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setShowChangePassword(false)}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminProfile;
