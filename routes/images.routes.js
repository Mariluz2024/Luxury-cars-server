const express = require("express");
const {
  addImage,
  getImageByPublicId,
} = require("../controllers/images.controller");

const router = express.Router();

router.post("/add", addImage);
router.get("/:publicId", getImageByPublicId);

module.exports = router;
