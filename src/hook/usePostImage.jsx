import axios from "axios";
import React from "react";
const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
export default async function usePostImage(imageFile) {
  const res = await axios.post(image_hosting_api, imageFile, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return res.data.data.url;
}
