const express = require('express');
const router = express.Router();
const pool = require('./db'); // Pastikan pathnya sesuai

// Mendapatkan produk berdasarkan kode
router.get('/produk/:kode', async (req, res) => {
    const { kode } = req.params;

    try {
        const result = await pool.query('SELECT * FROM produk WHERE kode_produk = $1', [kode]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Mengirimkan data produk
        } else {
            res.status(404).json({ message: 'Produk tidak ditemukan' }); // Jika produk tidak ditemukan
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan' }); // Menangani kesalahan
    }
});

module.exports = router;
