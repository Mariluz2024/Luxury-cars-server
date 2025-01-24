const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "dgggb31it",
  api_key: "248149893633379",
  api_secret: "O9vPBo-vI25f5MhRez00b_siIEw",
});

const addImage = async (req, res) => {
  try {
    const { imageUrl, publicId } = req.body;

    if (!imageUrl || !publicId) {
      return res
        .status(400)
        .json({ message: "imageUrl and publicId are required" });
    }

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      public_id: publicId,
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      data: uploadResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading image",
      error: error.message,
    });
  }
};

// Get an image URL from Cloudinary
const getImageByPublicId = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({ message: "publicId is required" });
    }

    const imageUrl = cloudinary.url(publicId, {
      secure: true, // Ensure the URL is HTTPS
    });

    res.status(200).json({
      message: "Image retrieved successfully",
      url: imageUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving image",
      error: error.message,
    });
  }
};

module.exports = {
  addImage,
  getImageByPublicId,
};
