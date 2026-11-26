/* =============================================================
   MODELO : Pedido.js
   COLECCION : pedidos (en MongoDB)
   CAMPOS : coinciden con los del formulario pedido.html
   ============================================================= */

const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({

  /* --- Grupo 1: datos del cliente --- */
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: 3,
    maxlength: 60,
    trim: true
  },

  cedula: {
    type: String,
    required: [true, 'La cedula es obligatoria'],
    match: [/^[0-9]{6,10}$/, 'Entre 6 y 10 digitos, solo numeros']
  },

  celular: {
    type: String,
    required: [true, 'El celular es obligatorio'],
    match: [/^3[0-9]{9}$/, 'Debe ser 10 digitos y empezar por 3']
  },

  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Correo no valido'],
    trim: true,
    lowercase: true
  },

  /* --- Grupo 2: producto --- */
  modelo: {
    type: String,
    required: [true, 'El modelo es obligatorio']
  },

  talla: {
    type: String,
    required: [true, 'La talla es obligatoria']
  },

  cantidad: {
    type: Number,
    required: [true, 'La cantidad es obligatoria'],
    min: [1, 'Minimo 1 par'],
    max: [20, 'Maximo 20 pares']
  },

  color: {
    type: String,
    required: [true, 'El color es obligatorio'],
    enum: ['negro', 'blanco', 'gris', 'otro']
  },

  /* --- Grupo 3: envio y pago --- */
  direccion: {
    type: String,
    required: [true, 'La direccion es obligatoria'],
    minlength: 5,
    maxlength: 100,
    trim: true
  },

  ciudad_envio: {
    type: String,
    required: [true, 'La ciudad es obligatoria'],
    minlength: 2,
    maxlength: 40,
    trim: true
  },

  pago: {
    type: String,
    required: [true, 'El metodo de pago es obligatorio'],
    enum: ['nequi', 'daviplata', 'bancolombia', 'efectivo', 'efecty', 'tarjeta']
  },

  adicional: {
    type: [String],
    default: []
  },

  /* --- Grupo 4: observaciones --- */
  observaciones: {
    type: String,
    maxlength: 300,
    trim: true,
    default: ''
  },

  acepto: {
    type: Boolean,
    required: [true, 'Debes aceptar las condiciones']
  },

  /* --- Automatico --- */
  fecha: {
    type: Date,
    default: Date.now
  },

  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  }

});

module.exports = mongoose.model('Pedido', pedidoSchema);
