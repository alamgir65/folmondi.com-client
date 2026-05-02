import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import ClientLayout from "../layouts/ClientLayout";
import ErrorPage from "../pages/error-page/ErrorPage";
import Products from "../components/products/Products";
import ProductDetails from "../pages/product-details/ProductDetails";
import ReviewsPage from "../pages/review-page/ReviewsPage";

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
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage/>
    }
])