import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  CssBaseline,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Divider,
  Switch,
  Tooltip,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ViewCarousel,
  AccountCircle,
  Search,
  ShoppingCart,
  Inventory2,
  Category,
  Group,
  BarChart,
  InsertComment,
  Logout,
  BrandingWatermark,
  ShoppingBag,
  Newspaper,
  Storefront,
  LocalOffer,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { darkTheme } from "../../App";
import NotificationMenu from "../CMS/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../Redux/Slice/authSlice";
const drawerWidth = 240;

const Layout = ({ children, themeMode, toggleTheme }) => {
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getUserProfile());
    }, [dispatch]);
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const [appBarText, setAppBarText] = useState("Dashboard");
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    switch (location.pathname) {
      case "/admin/profile":
        setAppBarText("Profile");
        break;
      case "/admin/dashboard":
        setAppBarText("Dashboard");
        break;
      case "/admin/carousel":
        setAppBarText("Carousel");
        break;
      case "/admin/orders":
        setAppBarText("Orders");
        break;
      case "/admin/products":
        setAppBarText("Products");
        break;
      case "/admin/deals":
        setAppBarText("Deals");
        break;
      case "/admin/products/add":
        setAppBarText("Add Product");
        break;
      case `${location.pathname.match(/\/admin\/products\/\w+/)}/edit`:
        setAppBarText("Edit Product");
        break;
      case "/admin/brands":
        setAppBarText("Brands");
        break;
      case "/admin/categories":
        setAppBarText("Categories");
        break;
      case "/admin/sub-categories":
        setAppBarText("Sub Categories");
        break;
      // case "/admin/categories/add":
      //   setAppBarText("Add Category");
      //   break;
      // case `${location.pathname.match(/\/admin\/categories\/\w+/)}/edit`:
      //   setAppBarText("Edit Category");
      //   break;
      case "/admin/customers":
        setAppBarText("Customers");
        break;
      case "/admin/analytics":
        setAppBarText("Analytics");
        break;
      case "/admin/reviews":
        setAppBarText("Reviews");
        break;
      // case "/admin/blogs":
      //   setAppBarText("Blogs");
      //   break;
      // case "/admin/blogs/add":
      //   setAppBarText("Add Blog");
      //   break;
      // case `${location.pathname.match(/\/admin\/blogs\/\d+/)}/edit`:
      //   setAppBarText("Edit Blog");
      //   break;
      // case "/admin/orders/:id":
      //   setAppBarText("Order Details");
      //   break;
      // case "/admin/orders/:id/edit":
      //   setAppBarText("Edit Order");
      //   break;
      default:
        setAppBarText("Dashboard");
    }
  }, [location]);
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  // logout function
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/admin");
  }
  const DynamicNavLink = (props) => {
    return (
      themeMode.palette.mode === "dark" ?
      <NavLink
        to={props.to}
        style={({ isActive }) => ({
          backgroundColor: isActive ? "#66D9EF" : "transparent",
          color: isActive ? "black" : "white",
        })}
      >
        {props.children}
      </NavLink>:
      <NavLink
        to={props.to}
        style={({ isActive }) => ({
          backgroundColor: isActive ? "#3498db" : "transparent",
          color: isActive ? "white" : "black",
        })}
      >
        {props.children}
      </NavLink>
    );
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? drawerWidth : 56}px)`,
          ml: `${open ? drawerWidth : 56}px`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {appBarText}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Switch
            checked={themeMode === darkTheme}
            onChange={() => toggleTheme()}
          />
          {/* <IconButton color="inherit">
            <Search />
          </IconButton> */}
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton> */}
          {/* <NotificationMenu /> */}
          <DynamicNavLink to="/admin/profile">
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </DynamicNavLink>
        </Toolbar>
      </AppBar>
      {/* Sidebar Navigation Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 56,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: "border-box",
          },
        }}
        open={open}
      >
        
        <List>
        <Box sx={{ overflowX: "hidden" }}>
          <IconButton color="inherit" sx={{'&:hover':{borderRadius: '10px'}}}>
            <Avatar
              alt={user?.name}
              src={user?.avatar}
              sx={{ width: 40, height: 40 }}
            />
            <Typography
              variant="h6"
              sx={(theme) => ({
                marginLeft: 2,
                pr:3,
                opacity: open ? 1 : 0,
                width: open ? "auto" : 0,
                whiteSpace: "nowrap",
                transition: theme.transitions.create(["opacity", "width"], {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              })}
            >
            {user?.name?.length > 12 ? 
  `${user.name.substring(0, 12)}...` 
  : 
  user?.name}

            </Typography>
          </IconButton>
        </Box>
        <Divider sx={{ mt: 1 }} />
        <DynamicNavLink to="/admin/dashboard">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Dashboard" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <DashboardIcon/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Dashboard"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/carousel">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Carousel" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ViewCarousel/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Carousel"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/products">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Products" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ShoppingBag />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Products"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/deals">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Deals" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <LocalOffer />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Deals"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/orders">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Orders" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <ShoppingCart />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Orders"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/brands">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Brands" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Storefront />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Brands"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/categories">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Categories" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Category />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Categories"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/sub-categories">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Sub Categories" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Category sx={{ transform: "rotate(180deg)" }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Sub Categories"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/customers">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Customers" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Group />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Customers"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/analytics">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Analytics" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <BarChart />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Analytics"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <DynamicNavLink to="/admin/reviews">
            <ListItem components={<Button />} sx={{ overflowX: "hidden", backgroundColor:"inherit" }}>
              <Tooltip title="Reviews" placement="bottom">
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Newspaper />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Reviews"
                sx={(theme) => ({
                  opacity: open ? 1 : 0,
                  width: open ? "auto" : 0,
                  whiteSpace: "nowrap",
                  transition: theme.transitions.create(["opacity", "width"], {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                })}
              />
            </ListItem>
          </DynamicNavLink>
          <Divider />
          <ListItem onClick={handleLogout} components={<Button />} sx={{ overflowX: "hidden", '&:hover': { cursor: 'pointer' } }}>
            <Tooltip title="Logout" placement="bottom">
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Logout"
              sx={(theme) => ({
                opacity: open ? 1 : 0,
                width: open ? "auto" : 0,
                whiteSpace: "nowrap",
                transition: theme.transitions.create(["opacity", "width"], {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              })}
            />
          </ListItem>

          <Divider />
          {/* Add more items */}
        </List>
        {/* <Box
          sx={{
            position: "fixed",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "240px",
            height: "80px",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ my: 2 }}>
            LOGO
          </Typography>
        </Box> */}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: open
            ? `calc(${drawerWidth}px-200px)`
            : isMobile
            ? "-200px"
            : "-180px", // Adjust margin-left based on the sidebar state
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          flex: 1,
          width: `calc(100% - ${open ? drawerWidth : 56}px)`,
        }}
      >
        {children}
      </Box>
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          width: `calc(100% - ${open ? drawerWidth : 56}px)`,
          ml: `${open ? drawerWidth : 56}px`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          py: 2,
          px: 3,
          bgcolor: theme.palette.background.paper,
          boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Created by Sayantan Chakraborty. All
          rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
