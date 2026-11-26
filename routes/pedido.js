/* =============================================================
   RUTA : /api/pedido
   METODO : POST  -> guardar un pedido en MongoDB
            GET   -> listar todos los pedidos (para admin)
   ============================================================= */

const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

/*
 * POST /api/pedido
 * Recibe los datos del formulario pedido.html y los guarda.
 */
router.post('/', async (req, res) => {
  try {
    // Recoger checkboxes "adicional" (puede venir como string o array)
    let adicional = req.body.adicional || [];
    if (typeof adicional === 'string') {
      adicional = [adicional];
    }

    const nuevoPedido = new Pedido({
      nombre:       req.body.nombre,
      cedula:       req.body.cedula,
      celular:      req.body.celular,
      correo:       req.body.correo,
      modelo:       req.body.modelo,
      talla:        req.body.talla,
      cantidad:     parseInt(req.body.cantidad) || 1,
      color:        req.body.color,
      direccion:    req.body.direccion,
      ciudad_envio: req.body.ciudad_envio,
      pago:         req.body.pago,
      adicional:    adicional,
      observaciones: req.body.observaciones || '',
      acepto:       req.body.acepto === 'si' || req.body.acepto === true
    });

    const guardado = await nuevoPedido.save();

    res.status(201).json({
      ok: true,
      mensaje: 'Tu pedido fue registrado. Te confirmaremos por WhatsApp.',
      datos: guardado
    });

  } catch (error) {
    console.error('Error al guardar pedido:', error.message);
    res.status(400).json({
      ok: false,
      mensaje: 'Error al registrar el pedido. Revisa los campos.',
      error: error.message
    });
  }
});

/*
 * GET /api/pedido
 * Lista todos los pedidos (para uso administrativo).
 */
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ fecha: -1 });
    res.json({ ok: true, total: pedidos.length, datos: pedidos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

module.exports = router;
