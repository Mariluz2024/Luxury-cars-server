const { v2: cloudinary } = require('cloudinary');
require('dotenv').config(); // Load .env file

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dgggb31it',
  api_key: '248149893633379',
  api_secret: 'O9vPBo-vI25f5MhRez00b_siIEw',
});

module.exports = cloudinary;
