/* =============================================================
   MODELO : Registro.js
   COLECCION : registros (en MongoDB)
   CAMPOS : coinciden con los del formulario registro.html
   ============================================================= */

const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({

  /* --- Grupo 1: datos personales --- */
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: 3,
    maxlength: 60,
    trim: true
  },

  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Correo no valido'],
    trim: true,
    lowercase: true
  },

  celular: {
    type: String,
    required: [true, 'El celular es obligatorio'],
    match: [/^3[0-9]{9}$/, 'Debe ser 10 digitos y empezar por 3']
  },

  nacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },

  genero: {
    type: String,
    enum: ['masculino', 'femenino', 'otro', 'prefiero-no-decir'],
    default: 'prefiero-no-decir'
  },

  /* --- Grupo 2: cuenta --- */
  clave: {
    type: String,
    required: [true, 'La contrasena es obligatoria'],
    minlength: [8, 'Minimo 8 caracteres'],
    maxlength: [30, 'Maximo 30 caracteres']
  },

  ciudad: {
    type: String,
    required: [true, 'La ciudad es obligatoria']
  },

  /* --- Grupo 3: preferencias (opcionales) --- */
  marca: {
    type: String,
    default: ''
  },

  talla: {
    type: String,
    default: ''
  },

  buscar: {
    type: String,
    maxlength: 80,
    default: ''
  },

  interes: {
    type: [String],
    default: []
  },

  comentario: {
    type: String,
    maxlength: 200,
    trim: true,
    default: ''
  },

  /* --- Checkboxes obligatorios --- */
  acepto: {
    type: Boolean,
    required: [true, 'Debes aceptar los terminos']
  },

  mayor: {
    type: Boolean,
    required: [true, 'Debes confirmar que eres mayor de 14 anos']
  },

  /* --- Automatico --- */
  fecha: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Registro', registroSchema);
