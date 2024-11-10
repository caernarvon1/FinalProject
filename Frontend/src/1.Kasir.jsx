import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addProduct, clearProducts } from './store/productsSlice';
import HeaderKasir from './components/1.HeaderKasir';
import FooterKasir from './components/3.FooterKasir';
import PaySectionKasir from './components/2.PaySectionKasir';
import InformationBoxKasir from './components/2.InfoBoxKasir';
import KeyboardShortcuts from './components/5.KShortcutKasir';
import SProdukKasir from './components/5.SProdukKasir';
import ModalSpvKasir from './components/4.ModalSpvKasir';
import ModalConfirmKasir from './components/4.ModalConfirmKasir'; // Import modal
import './1.Kasir.css';  // Import CSS

const Kasir = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [foundProduct, setFoundProduct] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [logs, setLogs] = useState([]); // Tambahkan state logs
  const [showPayModal, setShowPayModal] = useState(false);
  const togglePayModal = () => setShowPayModal(!showPayModal);

  const tableRef = useRef(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      dispatch(setProducts(JSON.parse(storedProducts)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
      if (tableRef.current) tableRef.current.scrollTop = tableRef.current.scrollHeight;
    } else {
      localStorage.removeItem('products');
    }
  }, [products]);

  const handleSearchProduct = async () => {
    if (!searchCode) {
      setErrorMessage('Product code must not be empty');
      setFoundProduct(null); 
      return;
    }

    if (loading) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(`http://localhost:5000/api/produk/${searchCode}`);
      const product = response.data;

      if (product) {
        dispatch(addProduct({ 
          kode_produk: product.kode_produk, 
          nama_produk: product.nama_produk, 
          harga_jual: product.harga_jual, 
          qty: 1 
        }));
        setFoundProduct(product); 
        setSearchCode('');
      } else {
        setErrorMessage('Product not found');
        setFoundProduct(null); 
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setErrorMessage('An error occurred while searching for the product');
      setFoundProduct(null); 
    } finally {
      setSearchCode(''); // Mengosongkan kembali field teks
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const transactionData = {
        kasir: 'kasir_name',
        total: products.reduce((acc, product) => acc + (product.harga_jual * product.qty), 0),
        sales_items: products.map(product => ({
          kode_produk: product.kode_produk,
          qty: product.qty,
          harga_jual: product.harga_jual
        })),
      };

      const response = await axios.post('http://localhost:5000/api/transactions', transactionData);

      if (response.status === 201) {
        alert('Pembayaran berhasil disimpan.');
        dispatch(clearProducts());
        localStorage.removeItem('products');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Gagal menyimpan transaksi.');
    }
  };

  const onNewTransaction = () => {
    // Reset semua produk
    dispatch(clearProducts());
    localStorage.removeItem('products');

    // Reset pencarian dan pesan kesalahan
    setSearchCode('');
    setFoundProduct(null);
    setErrorMessage('');

    // Reset logs jika ada
    resetLogs();
  };



  const handleNewTransaction = () => {
    setShowConfirmModal(true);
  };

  const resetLogs = () => setLogs([]); // Fungsi untuk mereset logs

  const handleNewTransactionConfirm = () => {
    dispatch(clearProducts());
    localStorage.removeItem('products');
    setSearchCode('');
    setFoundProduct(null); 
    setErrorMessage(''); 
    resetLogs(); // Panggil resetLogs saat transaksi baru dikonfirmasi
    setShowConfirmModal(false);
  };

  const handleOpenSupervisor = () => {
    setShowSupervisorModal(true);
  };

  const handleCloseSupervisorModal = () => {
    setShowSupervisorModal(false);
  };

  const totalAmount = products.reduce((acc, product) => acc + (product.harga_jual * product.qty), 0)
    .toLocaleString('id-ID', { style: 'decimal' })
    .replace(',', '.')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    .replace(/^/, 'Rp ');

  return (
    <React.Fragment>
      <HeaderKasir onNewTransaction={handleNewTransaction} />
      <KeyboardShortcuts 
        onSearch={handleSearchProduct} 
        onNewTransaction={handleNewTransaction} 
        toggleSupervisorModal={showSupervisorModal ? handleCloseSupervisorModal : handleOpenSupervisor}
        showSupervisorModal={showSupervisorModal}
        showConfirmModal={showConfirmModal}
        togglePayModal={togglePayModal} // Tambahkan prop togglePayModal
        showPayModal={showPayModal}
      />
      <SProdukKasir onSearch={handleSearchProduct} searchCode={searchCode} />

      <div className="kasir-container">
        <div className="order-summary-section">
          <h1>Ordered Products</h1>

          <div className="search-product">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Enter Product Code"
              disabled={loading}
            />
            <button onClick={handleSearchProduct} disabled={loading}>
              {loading ? 'Searching...' : 'Add to Cart'}
            </button>
          </div>
          {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}

          {foundProduct && (
            <div className="found-product-info">
              <p>Product Name: {foundProduct.nama_produk} | Price: Rp {foundProduct.harga_jual.toLocaleString('id-ID', { style: 'decimal' }).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
              </p>
            </div>
          )}

          <div className="products-container" style={{ maxHeight: '272px', overflowY: 'auto' }} ref={tableRef}> 
            <table className="products-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Code Item</th>
                  <th>Item Name</th>
                  <th>Qty</th>
                  <th>Price</th>
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
                {products.length < 5 && Array.from({ length: 5 - products.length }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td colSpan="6" style={{ textAlign: 'center', color: '#ccc' }}>- Empty -</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex-container">
            <div className="info-box">
            <InformationBoxKasir logs={logs} setLogs={setLogs} resetLogs={resetLogs} />
            </div>
            <div className="payment-section">
              <div className="total-amount">
                <h2>Total: {totalAmount}</h2>
              </div>
              <PaySectionKasir 
              onPay={handlePayment} 
              totalAmount={totalAmount} 
              toggleModal={togglePayModal} 
              showModal={showPayModal} // Tambahkan kontrol untuk menampilkan modal// Tambahkan prop toggleModal
              onNewTransaction={onNewTransaction}
              />
            </div>
          </div>
        </div>

        <ModalConfirmKasir 
          showModal={showConfirmModal} 
          handleClose={() => setShowConfirmModal(false)} 
          handleConfirm={handleNewTransactionConfirm} 
        />

        {showSupervisorModal && (
          <ModalSpvKasir 
            showModal={showSupervisorModal} 
            handleClose={handleCloseSupervisorModal} 
          />
        )}
      </div>

      <FooterKasir />
    </React.Fragment>
  );
};

export default Kasir;