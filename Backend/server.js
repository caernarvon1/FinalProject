const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Pastikan ini mengarah ke file db.js Anda
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rute untuk mengambil produk
app.get('/api/produk/:kode', async (req, res) => {
  const { kode } = req.params;

  try {
    const result = await pool.query('SELECT * FROM produk WHERE kode_produk = $1', [kode]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Mengirim data produk
    } else {
      res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});


// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
