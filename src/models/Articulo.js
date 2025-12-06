const mongoose = require("mongoose");

const articuloSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 0
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    imagen: {
      type: String // ruta relativa: /uploads/archivo.jpg
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Articulo", articuloSchema);
