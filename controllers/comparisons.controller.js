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
    const { carIds, selected } = req.body;

    if (!carIds || carIds.length < 2) {
      return res
        .status(400)
        .json({
          message: "Se requieren al menos 2 coches para una comparación",
        });
    }

    const newComparison = new Comparison({ carIds, selected });
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
      return res
        .status(400)
        .json({
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
      return res.status(400).json({ message: "El coche no pertenece a esta comparación" });
    }

    comparison.selected = carIdSelected;
    await comparison.save();

    res.status(200).json({ message: "Coche seleccionado con éxito", comparison });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al seleccionar el coche para la comparación", error });
  }
};

module.exports = {
  getComparisons,
  getComparisonById,
  createComparison,
  updateComparison,
  deleteComparison,
  selectCarForComparison,
};
