const express = require("express");
const router = express.Router();
const Articulo = require("../models/Articulo");
const upload = require("../config/multer");

// LISTAR todos los artículos
router.get("/", async (req, res) => {
  try {
    const articulos = await Articulo.find().sort({ createdAt: -1 });
    res.render("articulos/lista", { articulos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los artículos");
  }
});

// FORM para crear nuevo artículo
router.get("/nuevo", (req, res) => {
  res.render("articulos/nuevo");
});

// CREAR artículo (con imagen)
router.post("/", upload.single("foto"), async (req, res) => {
  const { codigo, nombre, descripcion, cantidad, precio } = req.body;

  try {
    await Articulo.create({
      codigo,
      nombre,
      descripcion,
      cantidad,
      precio,
      imagen: req.file ? `/uploads/${req.file.filename}` : null
    });

    res.redirect("/articulos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el artículo");
  }
});

// FORM para editar
router.get("/:id/editar", async (req, res) => {
  try {
    const articulo = await Articulo.findById(req.params.id);
    if (!articulo) {
      return res.status(404).send("Artículo no encontrado");
    }
    res.render("articulos/editar", { articulo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el artículo");
  }
});

// ACTUALIZAR artículo
router.post("/:id", upload.single("foto"), async (req, res) => {
  const { codigo, nombre, descripcion, cantidad, precio } = req.body;

  try {
    const data = {
      codigo,
      nombre,
      descripcion,
      cantidad,
      precio
    };

    if (req.file) {
      data.imagen = `/uploads/${req.file.filename}`;
    }

    await Articulo.findByIdAndUpdate(req.params.id, data);
    res.redirect("/articulos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el artículo");
  }
});

// ELIMINAR artículo
router.post("/:id/eliminar", async (req, res) => {
  try {
    await Articulo.findByIdAndDelete(req.params.id);
    res.redirect("/articulos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el artículo");
  }
});

module.exports = router;
