import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import ClientLayout from "../layouts/ClientLayout";
import ErrorPage from "../pages/error-page/ErrorPage";
import Products from "../components/products/Products";
import ProductDetails from "../pages/product-details/ProductDetails";
import ReviewsPage from "../pages/review-page/ReviewsPage";
import ContactUs from "../pages/contact-us/ContactUs";
import FolmondiSpinner from "../components/snipnner/FolmondiSpinner";
import AdminDashboard from "../layouts/AdminDashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminStatistics from "../components/Dashboard/statistics/AdminStatistics";
import AddProductForm from "../components/Dashboard/product/AddProductForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "shop",
                element: <Products/>
            },
            {
                path: "product-details",
                element: <ProductDetails/>
            },
            {
                path: 'reviews',
                element: <ReviewsPage/>
            },
            {
                path: 'contact-us',
                element: <ContactUs/>
            },
            {
                path: 'spinner',
                element: <div>
                    <FolmondiSpinner variant="dots"  size="md"/> <br/>
                    <FolmondiSpinner variant="pulse" size="sm" text="অপেক্ষা করুন"/>
                </div>
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage/>
    },
    {
        path: 'dashboard1',
        element: <AdminDashboard/>
    },
    {
        path: 'dashboard',
        element: <DashboardLayout/>,
        children: [
            {
                index: true,
                element: <AdminStatistics/>
            },
            {
                path: 'add-product',
                element: <AddProductForm/>
            }
        ]
    }
])