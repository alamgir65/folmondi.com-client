import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import ClientLayout from "../layouts/ClientLayout";
import ErrorPage from "../pages/error-page/ErrorPage";
import Products from "../components/products/Products";
import ProductDetails from "../pages/product-details/ProductDetails";
import ReviewsPage from "../pages/review-page/ReviewsPage";
import ContactUs from "../pages/contact-us/ContactUs";
import FolmondiSpinner from "../components/snipnner/FolmondiSpinner";
import DashboardLayout from "../layouts/DashboardLayout";
import AddProductForm from "../components/Dashboard/product/AddProductForm";
import AllProducts from "../components/Dashboard/inventory/AllProducts";
import AddCategoryForm from "../components/Dashboard/category/AddCategoryForm";
import Categories from "../components/Dashboard/category/Categories";
import AddPackage from "../components/Dashboard/packages/AddPackage";
import ManagePackages from "../components/Dashboard/packages/ManagePackages";
import CheckoutPage from "../pages/checkout-page/CheckoutPage";
import CartPage from "../pages/cart/Cartpage";
import ManageOrders from "../components/Dashboard/orders/Manageorders";
import OrderTrackPage from "../pages/track-order/OrderTrackpage";
import AboutUs from "../pages/about-us/AboutUs";
import TermsAndConditions from "../pages/terms-conditions/Termsandconditions";
import PrivacyPolicy from "../pages/privacy-policy/PrivacyPolicy";
import StatisticsPage from "../components/Dashboard/statistics/StatisticsPage";
import AdminLogin from "../pages/admin-login/Adminlogin";
import PrivateRoutes from "./PrivateRoutes";

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
                path: "product-details/:id",
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
            },
            {
                path: 'checkout',
                element: <CheckoutPage/>
            },
            {
                path: 'cart',
                element: <CartPage/>
            },
            {
                path: 'track-order',
                element: <OrderTrackPage/>
            },
            {
                path: 'about-us',
                element: <AboutUs/>
            },
            {
                path: 'terms-conditions',
                element: <TermsAndConditions/>
            },
            {
                path: 'privacy-policy',
                element: <PrivacyPolicy/>
            },
            {
                path: 'admin/login',
                element: <AdminLogin/>
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage/>
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashboardLayout/></PrivateRoutes>,
        children: [
            {
                index: true,
                // element: <AdminStatistics/>
                element: <StatisticsPage/>
            },
            {
                path: 'add-product',
                element: <AddProductForm/>
            },
            {
                path: 'all-products',
                element: <AllProducts/>
            },
            {
                path: 'add-category',
                element: <AddCategoryForm/>
            },
            {
                path: 'manage-categories',
                element: <Categories/>
            },
            {
                path: 'add-package',
                element: <AddPackage/>
            },
            {
                path: 'manage-packages',
                element: <ManagePackages/>
            },
            {
                path: 'manage-orders',
                element: <ManageOrders/>
            }
            
        ]
    }
])