import axios from "axios";

const imgBBHostingKey = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const imgBBHostingUrl = `https://api.imgbb.com/1/upload?key=${imgBBHostingKey}`;

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axios.post(imgBBHostingUrl, formData);
        const data = response.data;

        if (data.success) {
            return data.data.display_url;
        } else {
            throw new Error("Image upload failed");
        }
    } catch (error) {
        console.error("Image Upload error:", error);
        throw error;
    }
}