/* =============================================================
   RUTA : /api/contacto
   METODO : POST  -> guardar un mensaje de contacto en MongoDB
            GET   -> listar todos los mensajes (para admin)
   ============================================================= */

const express = require('express');
const router = express.Router();
const Contacto = require('../models/Contacto');

/*
 * POST /api/contacto
 * Recibe los datos del formulario contacto.html y los guarda.
 */
router.post('/', async (req, res) => {
  try {
    // Crear el documento con los datos del body
    const nuevoContacto = new Contacto({
      nombre:    req.body.nombre,
      correo:    req.body.correo,
      celular:   req.body.celular,
      ciudad:    req.body.ciudad,
      asunto:    req.body.asunto,
      mensaje:   req.body.mensaje,
      respuesta: req.body.respuesta || 'whatsapp',
      acepto:    req.body.acepto === 'si' || req.body.acepto === true,
      ofertas:   req.body.ofertas === 'si' || req.body.ofertas === true
    });

    // Guardar en MongoDB
    const guardado = await nuevoContacto.save();

    // Responder con exito
    res.status(201).json({
      ok: true,
      mensaje: 'Tu mensaje fue enviado correctamente. Te responderemos pronto.',
      datos: guardado
    });

  } catch (error) {
    console.error('Error al guardar contacto:', error.message);
    res.status(400).json({
      ok: false,
      mensaje: 'Error al enviar el mensaje. Revisa los campos.',
      error: error.message
    });
  }
});

/*
 * GET /api/contacto
 * Lista todos los mensajes (para uso administrativo).
 */
router.get('/', async (req, res) => {
  try {
    const contactos = await Contacto.find().sort({ fecha: -1 });
    res.json({ ok: true, total: contactos.length, datos: contactos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

module.exports = router;
