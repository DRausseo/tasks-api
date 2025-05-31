const express = require('express');
const connectDB = require('./db');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // configuración OAuth

const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middleware/errorHandler');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();

// Middlewares base
app.use(cors());
app.use(express.json());

// Session + Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Rutas públicas (antes de auth middleware)
app.get('/', (req, res) => {
  res.send('API de Tareas funcionando');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/profile'
  })
);

// ✅ Middleware de protección
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'No autorizado' });
}

app.get('/profile', ensureAuth, (req, res) => {
  res.json({ user: req.user });
});

// ✅ Swagger docs (público)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Rutas protegidas (después de configurar sesión y passport)
app.use('/api/tasks', ensureAuth, taskRoutes);
app.use('/api/projects', ensureAuth, projectRoutes);

// Middleware central de errores
app.use(errorHandler);

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
