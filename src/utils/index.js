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