/* =============================================================
   MODELO : Referencia.js
   COLECCION : referencias (en MongoDB)
   ============================================================= */
const mongoose = require('mongoose');

const referenciaSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  codigo:   { type: String, required: true, trim: true, uppercase: true },
  nombre:   { type: String, required: true, trim: true },
  marca:    { type: String, default: '' },
  fecha:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referencia', referenciaSchema);
