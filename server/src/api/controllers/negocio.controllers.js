const Negocio = require("../models/negocio.model");
const Servicio = require("../models/servicio.model");
const Reserva = require("../models/reserva.model");

// Crear un nuevo negocio
const createNegocio = async (req, res, next) => {
  try {
    const negocio = new Negocio(req.body);
    await negocio.save();
    res.status(201).json(negocio);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los negocios
const getNegocios = async (req, res, next) => {
  try {
    const negocios = await Negocio.find({});
    res.status(200).json(negocios);
  } catch (error) {
    next(error);
  }
};

// Obtener un negocio por ID
const getNegocio = async (req, res, next) => {
  try {
    const negocio = await Negocio.findById(req.params.id)
      .populate("servicios")
      .populate("reservas");
    if (!negocio) {
      return res.status(404).send("No se encontró el negocio con el ID dado.");
    }
    res.status(200).json(negocio);
  } catch (error) {
    next(error);
  }
};

// Actualizar un negocio por ID
const updateNegocio = async (req, res, next) => {
  try {
    const negocio = await Negocio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!negocio) {
      return res.status(404).send("No se encontró el negocio con el ID dado.");
    }
    res.status(200).json(negocio);
  } catch (error) {
    next(error);
  }
};

// Eliminar un negocio por ID
const deleteNegocio = async (req, res, next) => {
  try {
    const negocio = await Negocio.findByIdAndRemove(req.params.id);
    if (!negocio) {
      return res.status(404).send("No se encontró el negocio con el ID dado.");
    }

    // Si el negocio tiene servicios, elimínalos también
    await Servicio.remove({ negocio: negocio._id });

    // Si el negocio tiene reservas, cambia su estado a 'cancelada'
    const reservas = await Reserva.find({ negocio: negocio._id });
    for (let reserva of reservas) {
      reserva.estado = "cancelada";
      await reserva.save();
    }

    res.status(200).json(negocio);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo servicio para un negocio
const createServicioForNegocio = async (req, res, next) => {
  try {
    const servicio = new Servicio(req.body);
    servicio.negocio = req.params.id;
    await servicio.save();

    const negocio = await Negocio.findById(req.params.id);
    negocio.servicios.push(servicio._id);
    await negocio.save();

    res.status(201).json(servicio);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los servicios de un negocio
const getServiciosForNegocio = async (req, res, next) => {
  try {
    const servicios = await Servicio.find({ negocio: req.params.id });
    res.status(200).json(servicios);
  } catch (error) {
    next(error);
  }
};

// Buscar negocios por nombre
const searchNegocios = async (req, res, next) => {
  try {
    const negocios = await Negocio.find({
      nombre: { $regex: req.params.query, $options: "i" },
    });
    res.status(200).json(negocios);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los negocios por categoría
const getNegociosByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const negocios = await Negocio.find({ category: category });
    res.status(200).json(negocios);
  } catch (error) {
    next(error);
  }
};

// Obtener todas las reservas de un negocio
const getReservasByNegocio = async (req, res, next) => {
  try {
    const negocioId = req.params.id;
    const reservas = await Reserva.find({ negocio: negocioId }).populate(
      "usuario servicio"
    );
    res.status(200).json(reservas);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createNegocio,
  getNegocios,
  getNegocio,
  updateNegocio,
  deleteNegocio,
  createServicioForNegocio,
  getServiciosForNegocio,
  searchNegocios,
  getNegociosByCategory,
  getReservasByNegocio,
};
