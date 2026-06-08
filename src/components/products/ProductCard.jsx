import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import { set_product_to_LS } from "../../utils";

const notify = () => toast.success("Product added to the Cart!");
const notify2 = () => toast.success("Product already in the Cart!");

export default function ProductCard({ product }) {

    const handleAddToCart = () => {
        const item_details = {
          product_name: product?.name,
          free_delivery: product.free_delivery,
          product_quantity: product?.min_order,
          product_price: product.price_after_discount,
          package_price: product.price_after_discount * product.min_order,
          product_id: product._id,
          package_quantity: product?.min_order,
          package_count: 1,
          product_image: product?.images?.[0]
        }
        if(set_product_to_LS(item_details)){
          notify();
        }
        else notify2();
      };
    return (
        <div  className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-base-200 overflow-hidden">
            {/* Product Image */}
            <Link to={`/product-details/${product._id}`} className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                    src={product?.image || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div
                    className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded bg-(--orange-hot)"
                >
                    -{product.discount}%
                </div>
            </Link>
            <Toaster/>
            <div className="card-body p-4 gap-3">
                {/* Name */}
                <div className="flex justify-between gap-2">
                    <h3 className="font-bold text-lg text-base-content leading-tight">
                    {product.name}
                </h3>
                {
                    product.free_delivery == "Yes" && <p className="text-green-700">Free Delivery</p>
                }
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    {/* <span className="text-base font-bold">
                            প্রতি কেজি - </span> */}
                    <span className="font-bold text-lg text-(--orange-hot)">
                        ৳{product?.price_after_discount}
                        {/* ৳{product.variants[selectedVariant].price.toLocaleString()} */}
                    </span>
                    <span className="text-sm line-through text-base-content/40">
                        ৳{product?.price}
                    </span>
                </div>
                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-(--base-color)">
                            সর্বনিম্ন অর্ডার - {product?.min_order} Kg
                    </span>
                </div>

                {/* Variant pills */}
                {/* <div className="flex gap-2 flex-wrap">
                    {variants.map((v, i) => (
                        <button
                            key={i}
                            onClick={() => product.quantity && setSelectedVariant(i)}
                            disabled={!product.quantity}
                            className={`rounded-full border-2 px-3 py-1.5 text-center transition-all duration-200 ${!product.quantity
                                    ? "opacity-50 cursor-not-allowed border-base-300"
                                    : selectedVariant === i
                                        ? i === 0
                                            ? "border-(--orange-mid) bg-white"
                                            : "border-green-400 bg-green-50"
                                        : "border-base-300 bg-base-100 cursor-pointer hover:border-(--orange-mid) hover:bg-white"
                                }`}
                            style={{ minWidth: 90 }}
                        >
                            <div className="text-xs font-bold text-base-content leading-tight">{v.label}</div>
                            <div
                                className="text-xs font-semibold"
                                style={{
                                    color: !product.quantity
                                        ? "#9ca3af"
                                        : selectedVariant === i
                                            ? i === 0 ? "#e53e3e" : "#38a169"
                                            : "#9ca3af",
                                }}
                            >
                                ৳{v.price.toLocaleString()}
                            </div>
                        </button>
                    ))}
                </div> */}

                {/* Out of stock / Delivery */}
                {!product.quantity ? (
                    <p className="text-sm font-semibold" style={{ color: "#e53e3e" }}>
                        Out of Stock
                    </p>
                ) : product?.delivery ? (
                    <p className="text-xs text-base-content/50 leading-snug">{product.delivery}</p>
                ) : null}
                <p className="text-xs text-base-content/50 leading-snug">{product?.delivery_time || product?.short_description || "Kichu nai"}</p>
                {/* Buttons */}
        
                <div className="card-actions mt-1 gap-2">
                    {
                        product.quantity ? <button onClick={handleAddToCart} className="btn-secondary w-full">
                        Add to Cart
                    </button> : null
                    }
                    <Link to={`/product-details/${product._id}`} className="btn-primary text-center w-full">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}