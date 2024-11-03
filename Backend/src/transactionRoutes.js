const express = require('express');
const router = express.Router();
const transactionController = require('./transactionController');

// Rute untuk menambahkan transaksi
router.post('/transactions', transactionController.addTransaction);

// Rute untuk mendapatkan semua transaksi
router.get('/transactions', transactionController.getTransactions);

module.exports = router;
