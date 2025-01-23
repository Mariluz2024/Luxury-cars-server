const express = require("express");
const router = express.Router();
const {
  getFavorites,
  getFavoriteById,
  createFavorite,
  updateFavorite,
  deleteFavorite,
  getFavoriteByUserId
} = require("../controllers/favorites.controller");

router.get("/", getFavorites);
router.get("/:id", getFavoriteById);
router.get("/user/:id", getFavoriteByUserId);
router.post("/", createFavorite);
// router.put("/:id", updateFavorite);
router.delete("/:id", deleteFavorite);

module.exports = router;
