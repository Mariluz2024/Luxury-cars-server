const express = require("express");
const router = express.Router();
const {
  getComparisons,
  getComparisonById,
  createComparison,
  updateComparison,
  deleteComparison,
  selectCarForComparison,
  removeCarFromComparison,
  getComparisonsByUserId,
  addCarToComparison,
} = require("../controllers/comparisons.controller");

router.get("/", getComparisons);
router.get("/:id", getComparisonById);
router.post("/", createComparison);
router.put("/:id", updateComparison);
router.delete("/:id", deleteComparison);
router.put("/:id/select", selectCarForComparison);
router.delete("/:id/delete-car", removeCarFromComparison);
router.get("/user/:userId", getComparisonsByUserId);
router.post("/:id/add-car", addCarToComparison);

module.exports = router;
