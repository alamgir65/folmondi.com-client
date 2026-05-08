// const cloudinaryapi = https://api.cloudinary.com/v1_1/demo/image/upload;

import axios from "axios";

export const cloudinary_image_upload = async (image_data) => {
    // console.log('From function:', image_data);
    const formData = new FormData();
    formData.append('file',image_data);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
    // console.log('Cloudinary response:', data);
    return data?.secure_url || null;
}


export const fetchData = async (url) => {
  const res = await axios.get(url);
  return res.data;
};


export const get_product_from_LS = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
}

export const set_product_to_LS = (product) => {
  const cart = get_product_from_LS();

  const exists = cart.find((item) => item._id === product._id && item.package_quantity === product.package_quantity);

  if (exists) return false;
  product.cart_id = crypto.randomUUID();
  const new_cart = [...cart, product];

  localStorage.setItem("cart", JSON.stringify(new_cart));
  return true;
};

export const remove_product_from_LS = (id) => {
  const cart = get_product_from_LS();

  const updated = cart.filter((item) => item.cart_id !== id);

  localStorage.setItem("cart", JSON.stringify(updated));
};

export const clear_cart = () => {
  localStorage.removeItem("cart");
};

export const discount_calculate = (mainAmount, disAmount) => {
  return Math.round(((mainAmount - disAmount) / mainAmount) * 100);
};