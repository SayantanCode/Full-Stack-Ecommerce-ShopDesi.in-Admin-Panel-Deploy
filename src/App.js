import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Pages/CMS/Loader";
import Layout from "./Pages/Layouts/Layout";
import ProductPage from "./Pages/CMS/Products";
import AddProduct from "./Pages/CMS/AddProduct";
import DashboardPage from "./Pages/CMS/Dashboard";
import BrandManagement from "./Pages/CMS/BrandPage";
import CategoryManagement from "./Pages/CMS/CategoryPage";
import EditProduct from "./Pages/CMS/EditProduct";
import AddBlog from "./Pages/CMS/AddBlog";
import AnalyticsPage from "./Pages/CMS/AnalyticsPage";
import OrderManagement from "./Pages/CMS/OrdersPage";
import CustomersPage from "./Pages/CMS/CustomersPage";
import BlogListPage from "./Pages/CMS/BlogPage";
import AdminProfile from "./Pages/CMS/ProfilePage";
import LoginPage from "./Pages/CMS/LoginPage";
import DealsPage from "./Pages/CMS/Deals";
import SubCategoryPage from "./Pages/CMS/SubCategoryPage";
import CarouselPage from "./Pages/CMS/CarouselPage";
import ReviewPage from "./Pages/CMS/ReviewsPage";
import NotFoundPage from "./Pages/CMS/NotFound";
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#3498db', // Blue
    },
    secondary: {
      main: '#f1c40f', // Yellow
    },
    background: {
      default: '#f4f4f4', // Light Gray
      paper: '#fff', // White
    },
    text: {
      primary: '#333', // Dark Gray
      secondary: '#666', // Medium Gray
    },
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },
  },
});


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66d9ef', // Light Blue
    },
    secondary: {
      main: '#ffc107', // Light Yellow
    },
    background: {
      default: '#333', // Dark Gray
      paper: '#444', // Darker Gray
    },
    text: {
      primary: '#fff', // White
      secondary: '#ccc', // Light Gray
    },
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },
  },
});
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token"); // Retrieve token from session storage
  if (!token) {
    // If there's no token, redirect to login
    return <Navigate to="/" />;
  }

  return children; // If authenticated, return the children components
};
const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(prefersDarkMode ? darkTheme : lightTheme);
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);
  useEffect(() => {
    if(window.location.pathname === "/" || window.location.pathname !== "/admin") {
      window.location.pathname = "/admin"
    }
  }, [])
  const toggleTheme = () => {
    setFade(true);
    setTimeout(() => {
      if (themeMode === lightTheme) {
        setThemeMode(darkTheme);
      } else {
        setThemeMode(lightTheme);
      }
      setTimeout(() => {
        setFade(false);
      }, 500);
    }, 500);
  };
  return (
    <>
      <ThemeProvider theme={themeMode}>
        <div style={{ opacity: fade ? 0.2 : 1, transition: "opacity 500ms ease-in-out" }}>
          <CssBaseLine />
          {loading ? (
            <Loader />
          ) : (
            <BrowserRouter basename="/admin">
              <Routes>
                <Route path="/" element={<LoginPage themeMode={themeMode} toggleTheme={toggleTheme} />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout themeMode={themeMode} toggleTheme={toggleTheme}>
                      <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/carousel" element={<CarouselPage />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/deals" element={<DealsPage />} />
                        <Route path="/products/add" element={<AddProduct />} />
                        <Route path="products/:product_id/edit" element={<EditProduct />} />
                        <Route path="brands" element={<BrandManagement />} />
                        <Route path="categories" element={<CategoryManagement />} />
                        <Route path="sub-categories" element={<SubCategoryPage />} />
                        <Route path="orders" element={<OrderManagement />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="customers" element={<CustomersPage />} />
                        <Route path="reviews" element={<ReviewPage/>} />
                        {/* <Route path="*" element={<NotFoundPage />} /> */}
                        {/* <Route path="blogs" element={<BlogListPage />} /> */}
                        {/* <Route path="blogs/add" element={<AddBlog />} /> */}
                        <Route path="profile" element={<AdminProfile />} />
                      </Routes>
                    </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={themeMode.palette.mode === "dark" ? "dark" : "light"}
              />
            </BrowserRouter>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
