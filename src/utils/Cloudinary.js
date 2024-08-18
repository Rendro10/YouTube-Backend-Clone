import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploading
    // console.log("file is not uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // remove locally save temporary file as the upload operation got failed
    console.error("Error uploading to Cloudinary:", error);
    return null; // Return null when there's an error
    // fs.unlinkSync(localFilePath);
    // return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  const destroyAsync = util.promisify(cloudinary.uploader.destroy);

  try {
    const result = await destroyAsync(publicId);
    console.log("Deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
