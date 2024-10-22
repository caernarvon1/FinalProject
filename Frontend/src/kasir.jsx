import React, { useState, useEffect } from 'react';
import './kasir.css'; 
import useKasirLogic from './components/LogicKasir';
import axios from 'axios';
import HeaderKasir from './components/1.HeaderKasir'; 
import FooterKasir from './components/3.FooterKasir';
import PaySectionKasir from './components/2.PaySectionKasir'; 
import { useNavigate } from 'react-router-dom';

const Kasir = () => {
  const navigate = useNavigate();
  const { products, setProducts, addProductFromSearch } = useKasirLogic();
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi untuk memulai transaksi baru
  const handleNewTransaction = () => {
    setProducts([]); // Kosongkan tabel produk
  };

  useEffect(() => {
    // Event listener untuk mendeteksi penekanan tombol F2
    const handleKeyDown = (event) => {
      if (event.key === 'F2') {
        event.preventDefault(); // Mencegah perilaku default tombol F2
        handleNewTransaction(); // Memulai transaksi baru
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener ketika komponen tidak lagi digunakan
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchProduct = async () => {
    if (!searchCode) {
      setErrorMessage('Kode produk harus diisi');
      return;
    }

    if (loading) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(`http://localhost:5000/api/produk/${searchCode}`);
      const product = response.data;

      if (product) {
        addProductFromSearch({
          kode_produk: product.kode_produk,
          nama_produk: product.nama_produk,
          harga_jual: product.harga_jual,
        });
        setSearchCode('');  // Kosongkan searchCode setelah menambahkan produk
      } else {
        setErrorMessage('Produk tidak ditemukan');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setErrorMessage('Terjadi kesalahan saat mencari produk');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    window.open('/receipt', '_blank');
  };

  const totalAmount = products.reduce((acc, product) => acc + (product.harga_jual * product.qty), 0)
    .toLocaleString('id-ID', { style: 'decimal' })
    .replace(',', '.')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    .replace(/^/, 'Rp ');

  return (
    <>
      <HeaderKasir onNewTransaction={handleNewTransaction} />

      <div className="kasir-container" style={{ marginTop: '0' }}>
        <div className="order-summary-section">
          <h1>Ordered Products</h1>

          <div className="search-product">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Masukkan Kode Barang"
              disabled={loading}
            />
            <button onClick={handleSearchProduct} disabled={loading}>
              {loading ? 'Mencari...' : 'Tambah Barang'}
            </button>
          </div>
          {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}

          <table className="products-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Item</th>
                <th>Nama Item</th>
                <th>Qty</th>
                <th>Harga</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.kode_produk}</td>
                  <td>{product.nama_produk}</td>
                  <td><span>{product.qty}</span></td>
                  <td>{'Rp ' + (product.harga_jual).toLocaleString('id-ID', { style: 'decimal' }).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</td>
                  <td>{'Rp ' + (product.harga_jual * product.qty).toLocaleString('id-ID', { style: 'decimal' }).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-section">
            <h2>Total: {totalAmount}</h2>
          </div>

          <PaySectionKasir
            infoMessage="--Information Box--"
            onPay={handlePayment}
          />
        </div>

        <FooterKasir />
      </div>
    </>
  );
};

export default Kasir;
