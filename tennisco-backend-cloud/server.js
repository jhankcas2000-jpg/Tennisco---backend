/* =============================================================
   PROYECTO : TENNISCO - Backend con Node.js + Express + MongoDB
   ARCHIVO  : server.js (archivo principal del servidor)
   CURSO    : Fundamentos Web - UNIAJC

   COMO EJECUTAR:
   1. npm install          (instala las dependencias)
   2. Configura el .env con tu URI de MongoDB Atlas
   3. npm start            (inicia el servidor)
   4. Abre http://localhost:3000 en tu navegador
   ============================================================= */

// Cargar variables de entorno desde .env
require('dotenv').config();

// Importar dependencias
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

// Importar rutas
const rutaContacto    = require('./routes/contacto');
const rutaPedido      = require('./routes/pedido');
const rutaRegistro    = require('./routes/registro');
const rutaInventario  = require('./routes/inventario');

// Crear la aplicacion Express
const app = express();

// Puerto (desde .env o por defecto 3000)
const PORT = process.env.PORT || 3000;


/* ======================= MIDDLEWARES ======================= */

// CORS: permite que el frontend (HTML) se comunique con el backend
app.use(cors());

// Parsear JSON en el body de las peticiones POST
app.use(express.json());

// Parsear datos de formularios (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Servir archivos estaticos (HTML, CSS, JS, imagenes)
// Los archivos HTML estan en la carpeta public/
app.use(express.static(path.join(__dirname, 'public')));


/* ======================= RUTAS DE LA API ======================= */

// POST /api/contacto  -> guardar mensaje de contacto
// GET  /api/contacto  -> listar mensajes
app.use('/api/contacto', rutaContacto);

// POST /api/pedido  -> guardar pedido
// GET  /api/pedido  -> listar pedidos
app.use('/api/pedido', rutaPedido);

// POST /api/registro  -> crear cuenta de usuario
// GET  /api/registro  -> listar usuarios
app.use('/api/registro', rutaRegistro);

// INVENTARIO (sync de bodegas, referencias e items)
app.use('/api/inventario', rutaInventario);

// Ruta raiz: sirve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


/* ======================= CONEXION A MONGODB ======================= */

// Conectar a MongoDB Atlas usando la URI del .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('');
    console.log('=================================================');
    console.log('  TENNISCO - Conectado a MongoDB Atlas');
    console.log('=================================================');
    console.log('');

    // Solo iniciar el servidor cuando MongoDB este conectado
    app.listen(PORT, () => {
      console.log('  Servidor corriendo en: http://localhost:' + PORT);
      console.log('');
      console.log('  Rutas de la API:');
      console.log('    POST /api/contacto  -> Guardar mensaje');
      console.log('    POST /api/pedido    -> Guardar pedido');
      console.log('    POST /api/registro  -> Crear cuenta');
      console.log('    GET  /api/contacto  -> Ver mensajes');
      console.log('    GET  /api/pedido    -> Ver pedidos');
      console.log('    GET  /api/registro  -> Ver usuarios');
      console.log('');
      console.log('  Inventario (sync):');
      console.log('    POST /api/inventario/sync         -> Sync items');
      console.log('    POST /api/inventario/bodegas/sync  -> Sync bodegas');
      console.log('    POST /api/inventario/referencias/sync -> Sync refs');
      console.log('    GET  /api/inventario              -> Ver items');
      console.log('    GET  /api/inventario/bodegas      -> Ver bodegas');
      console.log('    GET  /api/inventario/referencias  -> Ver refs');
      console.log('');
      console.log('  Presiona Ctrl+C para detener el servidor');
      console.log('=================================================');
    });
  })
  .catch((error) => {
    console.error('');
    console.error('  ERROR: No se pudo conectar a MongoDB');
    console.error('  Revisa tu MONGODB_URI en el archivo .env');
    console.error('  Detalle:', error.message);
    console.error('');
    process.exit(1);
  });
