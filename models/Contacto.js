/* =============================================================
   MODELO : Contacto.js
   COLECCION : contactos (en MongoDB)
   CAMPOS : coinciden con los del formulario contacto.html
   ============================================================= */

const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [3, 'Minimo 3 caracteres'],
    maxlength: [60, 'Maximo 60 caracteres'],
    trim: true
  },

  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Correo no valido'],
    trim: true,
    lowercase: true
  },

  celular: {
    type: String,
    required: [true, 'El celular es obligatorio'],
    match: [/^3[0-9]{9}$/, 'Debe ser 10 digitos y empezar por 3']
  },

  ciudad: {
    type: String,
    required: [true, 'La ciudad es obligatoria'],
    minlength: [2, 'Minimo 2 caracteres'],
    maxlength: [40, 'Maximo 40 caracteres'],
    trim: true
  },

  asunto: {
    type: String,
    required: [true, 'El asunto es obligatorio'],
    enum: ['disponibilidad', 'tallas', 'precios', 'envio', 'cambio', 'otro']
  },

  mensaje: {
    type: String,
    required: [true, 'El mensaje es obligatorio'],
    minlength: [10, 'Minimo 10 caracteres'],
    maxlength: [500, 'Maximo 500 caracteres'],
    trim: true
  },

  respuesta: {
    type: String,
    enum: ['whatsapp', 'correo'],
    default: 'whatsapp'
  },

  acepto: {
    type: Boolean,
    required: [true, 'Debes autorizar el tratamiento de datos']
  },

  ofertas: {
    type: Boolean,
    default: false
  },

  // Fecha en que se envio el formulario (automatica)
  fecha: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Contacto', contactoSchema);
