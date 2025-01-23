const express = require("express");
const router = express.Router();
const {
  getComparisons,
  getComparisonById,
  createComparison,
  updateComparison,
  deleteComparison,
  selectCarForComparison
} = require("../controllers/comparisons.controller");

router.get("/", getComparisons);
router.get("/:id", getComparisonById);
router.post("/", createComparison);
router.put("/:id", updateComparison);
router.delete("/:id", deleteComparison);
router.put("/:id/select", selectCarForComparison);

module.exports = router;
