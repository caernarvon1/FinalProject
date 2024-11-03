const db = require('./db'); // pastikan ini adalah file koneksi Anda

// Menambahkan transaksi baru
const addTransaction = async (req, res) => {
    const { kasir, total, sales_item_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO transactions (kasir, total, sales_item_id) VALUES ($1, $2, $3) RETURNING *',
            [kasir, total, sales_item_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding transaction');
    }
};

// Mendapatkan semua transaksi
const getTransactions = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM transactions');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving transactions');
    }
};

// Ekspor fungsi controller
module.exports = {
    addTransaction,
    getTransactions,
};
