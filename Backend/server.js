const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Pastikan ini mengarah ke file db.js Anda
const productRoutes = require('./productRoutes'); // Mengimpor productroutes.js
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Menggunakan rute dari productroutes.js
app.use('/api', productRoutes); // Semua rute di productroutes akan diakses dengan prefix '/api'

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
