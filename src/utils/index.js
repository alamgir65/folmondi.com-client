// const cloudinaryapi = https://api.cloudinary.com/v1_1/demo/image/upload;

import axios from "axios";
import Swal from "sweetalert2";

export const cloudinary_image_upload = async (image_data) => {
  // console.log('From function:', image_data);
  const formData = new FormData();
  formData.append('file', image_data);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
  // console.log('Cloudinary response:', data);
  return data?.secure_url || null;
}


export const fetchData = async (url) => {
  const res = await axios.get(url);
  return res.data;
};


// cart localstorage operations

export const get_product_from_LS = () => {
  const cart = JSON.parse(localStorage.getItem('folmondi_cart')) || [];
  return cart;
}

export const set_product_to_LS = (product) => {
  const cart = get_product_from_LS();

  const exists = cart.find((item) => item._id === product._id && item.package_quantity === product.package_quantity);

  if (exists) return false;
  product.cart_id = crypto.randomUUID();
  const new_cart = [...cart, product];

  localStorage.setItem("folmondi_cart", JSON.stringify(new_cart));
  return true;
};

export const remove_product_from_LS = (cart_id) => {
    const cart = get_product_from_LS();

    const updated = cart.filter(
        item => item.cart_id !== cart_id
    );

    localStorage.setItem(
        "folmondi_cart",
        JSON.stringify(updated)
    );

    return updated;
};

export const clear_cart = () => {
  localStorage.removeItem("folmondi_cart");
};

export const discount_calculate = (mainAmount, disAmount) => {
  return Math.round(((mainAmount - disAmount) / mainAmount) * 100);
};



// set order in local storage 
export const get_orders_from_LS = () => {
  const orders = JSON.parse(localStorage.getItem('folmondi_orders')) || []
  return orders;
}

export const set_orders_to_LS = (trackingId) => {
  if (!trackingId) return false;
  const orders = get_orders_from_LS();
  const exists = orders.find((item) => item == trackingId);
  if (exists) return false;
  const new_cart = [...orders, trackingId];
  localStorage.setItem("folmondi_orders", JSON.stringify(new_cart));
  return true;
};


// cart operations
export const updateQty = (id, delta, setCart,cart) => {
    const updatedCart = cart.map(item =>
        item.cart_id === id
            ? {
                ...item,
                package_count: Math.max(
                    1,
                    item.package_count + delta
                )
            }
            : item
    );

    setCart(updatedCart);

    localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
    );
};

export const removeItem = (id,setCart) => {
        Swal.fire({
            title: "Do you want to remove this product?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Remove",
            denyButtonText: `Don't remove`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed){
                const updatedCart = remove_product_from_LS(id);
                setCart(updatedCart);
                Swal.fire("Removed!", "", "success");
            }
            else if (result.isDenied) Swal.fire("Product doesn't removed", "", "info");
        });
    }


// selected cart 
export const get_selected_cart_items = () => {
  const cart = JSON.parse(localStorage.getItem('folmondi_selected_cart')) || [];
  return cart;
}

export const set_item_to_selected_cart = (item) => {
  const cart = get_selected_cart_items();
  const new_cart = [...cart, item];
  localStorage.setItem("folmondi_selected_cart", JSON.stringify(new_cart));
};



export const fmt = (n) => `৳${Number(n).toLocaleString()}`;