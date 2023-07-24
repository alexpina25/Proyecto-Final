const Servicio = require("../models/Servicio");

//! -----------------------------------------------------------------------------
//? ----------------------------GET SERVICIOS------------------------------------
//! -----------------------------------------------------------------------------
const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------GET SERVICIO-------------------------------------
//! -----------------------------------------------------------------------------
const getServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) {
      return res.status(404).json({ message: "No se encontró el servicio." });
    }
    res.json(servicio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------CREATE SERVICIOS---------------------------------
//! -----------------------------------------------------------------------------
const createServicio = async (req, res) => {
  const servicio = new Servicio({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    duracion: req.body.duracion,
    precio: req.body.precio,
    imagen: req.body.imagen,
    negocio: req.body.negocio,
  });

  try {
    const newServicio = await servicio.save();
    res.status(201).json(newServicio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------UPDATE SERVICIO----------------------------------
//! -----------------------------------------------------------------------------
const updateServicio = async (req, res) => {
  try {
    const updatedServicio = await Servicio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedServicio) {
      return res
        .status(404)
        .json({ message: "No se encontró el servicio para actualizar." });
    }
    res.json(updatedServicio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------DELETE SERVICIO----------------------------------
//! -----------------------------------------------------------------------------
const deleteServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicio) {
      return res
        .status(404)
        .json({ message: "No se encontró el servicio para eliminar." });
    }
    res.json({ message: "Servicio eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------GET SERVICIOS BY NEGOCIO------------------------
//! -----------------------------------------------------------------------------
const getServiciosByNegocio = async (req, res) => {
  try {
    const servicios = await Servicio.find({ negocio: req.params.id });
    if (!servicios || servicios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron servicios para este negocio." });
    }
    res.json(servicios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getServicios,
  getServicio,
  createServicio,
  updateServicio,
  deleteServicio,
  getServiciosByNegocio,
};
