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

// Memperbarui qty produk berdasarkan kode
router.put('/produk/:kode', async (req, res) => {
    const { kode } = req.params; // Mengambil kode produk dari parameter URL
    const { qty } = req.body; // Mendapatkan qty baru dari body request

    try {
        // Query untuk memperbarui qty produk di PostgreSQL
        const result = await pool.query(
            'UPDATE produk SET qty = $1 WHERE kode_produk = $2 RETURNING *', // SQL query untuk mengubah qty
            [qty, kode] // Menggunakan qty dan kode dari permintaan
        );
        
        if (result.rowCount > 0) {
            res.json(result.rows[0]); // Mengirimkan data produk yang telah diperbarui
        } else {
            res.status(404).json({ message: 'Produk tidak ditemukan' }); // Jika kode produk tidak ditemukan
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' }); // Menangani kesalahan server
    }
});

module.exports = router;
