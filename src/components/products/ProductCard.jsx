import { useState } from "react";
import { Link } from "react-router";

export default function ProductCard({ product }) {
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [cartAdded, setCartAdded] = useState(false);

    const handleAddToCart = () => {
        if (!product.inStock) return;
        setCartAdded(true);
        setTimeout(() => setCartAdded(false), 2000);
    };

    const variants = [
      { label: "১২ কেজি", price: 1440 },
      { label: "২৪ কেজি", price: 2880 },
    ];
    return (
        <Link to={`/product-details`} className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-base-200 overflow-hidden">
            {/* Product Image */}
            <figure className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div
                    className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded bg-(--orange-hot)"
                >
                    -{product.discount}%
                </div>
            </figure>

            <div className="card-body p-4 gap-3">
                {/* Name */}
                <h3 className="font-bold text-base text-base-content leading-tight">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">Per Kg - </span>
                    <span className="font-bold text-lg text-(--orange-hot)">
                        ৳{product?.price_after_discount}
                        {/* ৳{product.variants[selectedVariant].price.toLocaleString()} */}
                    </span>
                    <span className="text-sm line-through text-base-content/40">
                        ৳{product?.price}
                    </span>
                </div>

                {/* Variant pills */}
                <div className="flex gap-2 flex-wrap">
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
                </div>

                {/* Out of stock / Delivery */}
                {!product.quantity ? (
                    <p className="text-sm font-semibold" style={{ color: "#e53e3e" }}>
                        Out of Stock
                    </p>
                ) : product?.delivery ? (
                    <p className="text-xs text-base-content/50 leading-snug">{product.delivery}</p>
                ) : null}
                <p className="text-xs text-base-content/50 leading-snug">ডেলিভারির আনুমানিক সময় ৭ই মে ইনশাআল্লাহ</p>
                {/* Buttons */}
                <div className="card-actions mt-1 gap-2">
                    <button className="btn-secondary w-full">
                        Add to Cart
                    </button>
                    <button className="btn-primary w-full">
                        Order Now
                    </button>
                </div>
            </div>
        </Link>
    );
}