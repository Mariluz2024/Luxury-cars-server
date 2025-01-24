const Comparison = require("../models/comparison");

const getComparisons = async (req, res) => {
  try {
    const comparisons = await Comparison.find().populate("carIds");
    res.status(200).json(comparisons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las comparaciones", error });
  }
};

const getComparisonById = async (req, res) => {
  try {
    const comparison = await Comparison.findById(req.params.id).populate(
      "carIds"
    );
    if (!comparison) {
      return res.status(404).json({ message: "Comparación no encontrada" });
    }
    res.status(200).json(comparison);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la comparación", error });
  }
};

const createComparison = async (req, res) => {
  try {
    const { userId, name } = req.body;

    const carIds = [];

    const newComparison = new Comparison({ carIds, userId, name });
    await newComparison.save();
    res.status(201).json(newComparison);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la comparación", error });
  }
};

const updateComparison = async (req, res) => {
  try {
    const { id } = req.params;
    const { carIds, selected } = req.body;

    if (carIds && carIds.length < 2) {
      return res.status(400).json({
        message: "Se requieren al menos 2 coches para una comparación",
      });
    }

    const updatedComparison = await Comparison.findByIdAndUpdate(
      id,
      { carIds, selected },
      { new: true }
    );

    if (!updatedComparison) {
      return res.status(404).json({ message: "Comparación no encontrada" });
    }

    res.status(200).json(updatedComparison);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la comparación", error });
  }
};

const deleteComparison = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComparison = await Comparison.findByIdAndDelete(id);

    if (!deletedComparison) {
      return res.status(404).json({ message: "Comparación no encontrada" });
    }

    res.status(200).json({ message: "Comparación eliminada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la comparación", error });
  }
};

const selectCarForComparison = async (req, res) => {
  try {
    const { id } = req.params;
    const { carIdSelected } = req.body;

    const comparison = await Comparison.findById(id);
    if (!comparison) {
      return res.status(404).json({ message: "Comparación no encontrada" });
    }

    if (!comparison.carIds.includes(carIdSelected)) {
      return res
        .status(400)
        .json({ message: "El coche no pertenece a esta comparación" });
    }

    comparison.selected = carIdSelected;
    await comparison.save();

    res
      .status(200)
      .json({ message: "Coche seleccionado con éxito", comparison });
  } catch (error) {
    res.status(500).json({
      message: "Error al seleccionar el coche para la comparación",
      error,
    });
  }
};

const removeCarFromComparison = async (req, res) => {
  try {
    const { id } = req.params;
    const { carIdToRemove } = req.body;

    const comparison = await Comparison.findById(id);
    if (!comparison) {
      return res.status(404).json({ message: "Comparación no encontrada" });
    }

    if (!comparison.carIds.includes(carIdToRemove)) {
      return res
        .status(400)
        .json({ message: "El coche no pertenece a esta comparación" });
    }

    comparison.carIds = comparison.carIds.filter(
      (carId) => carId.toString() !== carIdToRemove
    );

    if (comparison.selected?.toString() === carIdToRemove) {
      comparison.selected = null;
    }

    await comparison.save();

    res.status(200).json({
      message: "Coche eliminado con éxito de la comparación",
      comparison,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el coche de la comparación",
      error,
    });
  }
};

const getComparisonsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const comparisons = await Comparison.find({ userId }).populate("carIds");

    if (!comparisons || comparisons.length === 0) {
      return res.status(404).json({
        message: "No se encontraron comparaciones para este usuario.",
      });
    }

    res.status(200).json(comparisons);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las comparaciones del usuario",
      error,
    });
  }
};

const addCarToComparison = async function (req, res) {
  try {
    const { id } = req.params;
    const { carId } = req.body;

    const comparison = await Comparison.findById(id);

    if (!comparison) {
      return res.status(404).json({ message: "Comparison not found." });
    }

    if (comparison.carIds.includes(carId)) {
      return res
        .status(400)
        .json({ message: "Car already exists in the comparison list." });
    }

    comparison.carIds.push(carId);
    await comparison.save();

    res.status(200).json({
      message: "Car added to the comparison list successfully.",
      comparison,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding car to the comparison list.", error });
  }
};

module.exports = {
  getComparisons,
  getComparisonById,
  createComparison,
  updateComparison,
  deleteComparison,
  selectCarForComparison,
  removeCarFromComparison,
  getComparisonsByUserId,
  addCarToComparison,
};
