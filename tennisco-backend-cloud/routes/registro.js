/* =============================================================
   RUTA : /api/registro
   METODO : POST  -> guardar un registro de usuario en MongoDB
            GET   -> listar todos los registros (para admin)
   ============================================================= */

const express = require('express');
const router = express.Router();
const Registro = require('../models/Registro');

/*
 * POST /api/registro
 * Recibe los datos del formulario registro.html y los guarda.
 */
router.post('/', async (req, res) => {
  try {
    // Recoger checkboxes "interes" (puede venir como string o array)
    let interes = req.body.interes || [];
    if (typeof interes === 'string') {
      interes = [interes];
    }

    const nuevoRegistro = new Registro({
      nombre:     req.body.nombre,
      correo:     req.body.correo,
      celular:    req.body.celular,
      nacimiento: req.body.nacimiento,
      genero:     req.body.genero || 'prefiero-no-decir',
      clave:      req.body.clave,
      ciudad:     req.body.ciudad,
      marca:      req.body.marca || '',
      talla:      req.body.talla || '',
      buscar:     req.body.buscar || '',
      interes:    interes,
      comentario: req.body.comentario || '',
      acepto:     req.body.acepto === 'si' || req.body.acepto === true,
      mayor:      req.body.mayor === 'si' || req.body.mayor === true
    });

    const guardado = await nuevoRegistro.save();

    res.status(201).json({
      ok: true,
      mensaje: 'Tu cuenta fue creada exitosamente. Bienvenido a TENNISCO!',
      datos: guardado
    });

  } catch (error) {
    console.error('Error al guardar registro:', error.message);

    // Error de correo duplicado
    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Ya existe una cuenta con ese correo electronico.',
        error: 'Correo duplicado'
      });
    }

    res.status(400).json({
      ok: false,
      mensaje: 'Error al crear la cuenta. Revisa los campos.',
      error: error.message
    });
  }
});

/*
 * GET /api/registro
 * Lista todos los usuarios registrados (para uso administrativo).
 */
router.get('/', async (req, res) => {
  try {
    // No mostramos la clave por seguridad
    const registros = await Registro.find().select('-clave').sort({ fecha: -1 });
    res.json({ ok: true, total: registros.length, datos: registros });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

module.exports = router;
