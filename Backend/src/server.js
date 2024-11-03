const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Pastikan ini mengarah ke file db.js Anda
const productRoutes = require('./productRoutes'); // Mengimpor productRoutes.js
const transactionRoutes = require('./transactionRoutes'); // Mengimpor transactionRoutes.js

const app = express();
const PORT = 5000;

// CORS Options
const corsOptions = {
  origin: 'http://localhost:3000', // Sesuaikan dengan URL frontend Anda
  optionsSuccessStatus: 200, // Untuk beberapa perangkat klien yang lebih lama
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Memparsing JSON di body request

// Menggunakan rute dari productRoutes dan transactionRoutes
app.use('/api', productRoutes); // Semua rute di productRoutes akan diakses dengan prefix '/api'
app.use('/api', transactionRoutes); // Semua rute di transactionRoutes akan diakses dengan prefix '/api'

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
