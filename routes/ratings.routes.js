const express = require("express");
const router = express.Router();
const {
  getRatings,
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
} = require("../controllers/ratings.controller");

router.get("/", getRatings);
router.get("/:id", getRatingById);
router.post("/", createRating);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);

module.exports = router;
