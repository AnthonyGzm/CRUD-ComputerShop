require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");  // <<--- IMPORTANTE

const articulosRouter = require("./routes/articulos");

const app = express();
const PORT = process.env.PORT || 3000;

/* ==========================
   🔌 Conexión MongoDB
   ========================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  });

/* ==========================
   ⚙️ Configuración Express
   ========================== */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ACTIVAR express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');   // archivo layout.ejs en /views

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Carpeta estática
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ==========================
   🛣️ Rutas
   ========================== */
app.get("/", (req, res) => {
  res.redirect("/articulos");
});

app.use("/articulos", articulosRouter);

/* ==========================
   🚀 Servidor
   ========================== */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
