/* =============================================================
   MODELO : Bodega.js
   COLECCION : bodegas (en MongoDB)
   ============================================================= */
const mongoose = require('mongoose');

const bodegaSchema = new mongoose.Schema({
  clientId:  { type: String, required: true, unique: true },
  nombre:    { type: String, required: true, trim: true },
  ubicacion: { type: String, default: '', trim: true },
  activa:    { type: Boolean, default: true },
  fecha:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bodega', bodegaSchema);
