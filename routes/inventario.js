/* =============================================================
   RUTA : /api/inventario
   Sync completo: POST (crear/actualizar), GET (listar), DELETE
   Tambien /api/bodegas y /api/referencias para sync
   ============================================================= */
const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario');
const Bodega = require('../models/Bodega');
const Referencia = require('../models/Referencia');

/* ─── INVENTARIO ─── */

// POST /api/inventario/sync — recibe array de items y los guarda/actualiza
router.post('/sync', async (req, res) => {
  try {
    const items = req.body.items || [];
    const results = [];
    for (const item of items) {
      const existing = await Inventario.findOne({ clientId: item.clientId });
      if (existing) {
        Object.assign(existing, item, { updatedAt: new Date() });
        await existing.save();
        results.push({ clientId: item.clientId, action: 'updated' });
      } else {
        await Inventario.create(item);
        results.push({ clientId: item.clientId, action: 'created' });
      }
    }
    res.json({ ok: true, results });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
});

// GET /api/inventario — devuelve todo el inventario
router.get('/', async (req, res) => {
  try {
    const datos = await Inventario.find().sort({ fecha: -1 });
    res.json({ ok: true, datos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

// DELETE /api/inventario/:clientId
router.delete('/:clientId', async (req, res) => {
  try {
    await Inventario.findOneAndDelete({ clientId: req.params.clientId });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

/* ─── BODEGAS ─── */

router.post('/bodegas/sync', async (req, res) => {
  try {
    const items = req.body.items || [];
    for (const item of items) {
      await Bodega.findOneAndUpdate(
        { clientId: item.clientId },
        item,
        { upsert: true, new: true }
      );
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
});

router.get('/bodegas', async (req, res) => {
  try {
    const datos = await Bodega.find().sort({ nombre: 1 });
    res.json({ ok: true, datos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

// DELETE /api/inventario/bodegas/:clientId
router.delete('/bodegas/:clientId', async (req, res) => {
  try {
    await Bodega.findOneAndDelete({ clientId: req.params.clientId });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

/* ─── REFERENCIAS ─── */

router.post('/referencias/sync', async (req, res) => {
  try {
    const items = req.body.items || [];
    for (const item of items) {
      await Referencia.findOneAndUpdate(
        { clientId: item.clientId },
        item,
        { upsert: true, new: true }
      );
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
});

router.get('/referencias', async (req, res) => {
  try {
    const datos = await Referencia.find().sort({ codigo: 1 });
    res.json({ ok: true, datos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

// DELETE /api/inventario/referencias/:clientId
router.delete('/referencias/:clientId', async (req, res) => {
  try {
    await Referencia.findOneAndDelete({ clientId: req.params.clientId });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

module.exports = router;
