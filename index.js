const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./models'); 
const app = express();
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const laporanRoutes = require('./routes/laporanRoutes');
const historyRoutes = require('./routes/historyRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const relayRoutes = require('./routes/relayRoutes');
const chatRoutes = require('./routes/chatRoutes');
const createDefaultAdmin = require('./utils/createDefaultAdmin');

require('dotenv').config();

// 1. Konfigurasi CORS yang Lebih Robust
const corsOptions = {
  origin: true, // Izinkan semua origin (bisa diganti dengan array domain tertentu)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  credentials: true, // Jika menggunakan session/cookie
  exposedHeaders: ['set-cookie']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight untuk semua route

// 2. Middleware penting untuk Vercel
app.set('trust proxy', 1); // Penting untuk Vercel

app.use(express.json());

app.use(session({
  secret: 'smartsewa-secret', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000, // 1 hari
  },
}));

// route
app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});
app.get('/api/test', (req, res) => {
  res.json({ message: 'test' });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Route API
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', laporanRoutes);
app.use('/api', historyRoutes);
app.use('/api', sensorRoutes);
app.use('/api', relayRoutes);
app.use('/api/chat', chatRoutes);
// app.use('/api/user', userRoutes);

// Sinkronisasi database
db.sequelize.sync()
  .then(async () => {
    console.log("Database berhasil disinkronisasi.");
    await createDefaultAdmin(); 
  })
  .catch(err => console.error("Gagal sinkronisasi database: ", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
