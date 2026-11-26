/* =============================================================
   MODELO : Inventario.js
   COLECCION : inventario (en MongoDB)
   Incluye costos de bodega y venta para control financiero
   ============================================================= */
const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  clientId:    { type: String, required: true, unique: true },
  bodega:      { type: String, required: true },
  referencia:  { type: String, required: true },
  refDisplay:  { type: String, default: '' },
  talla:       { type: String, required: true },
  cantidad:    { type: Number, required: true, min: 1, default: 1 },
  costoBodega: { type: Number, default: 0 },
  precioVenta: { type: Number, default: 0 },
  estado: {
    type: String,
    enum: ['ingresado', 'vendido', 'devolucion', 'faltante'],
    default: 'ingresado'
  },
  notas:  { type: String, default: '', trim: true },
  fecha:  { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventario', inventarioSchema);
