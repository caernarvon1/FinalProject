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
import './1.Kasir.css';

const Kasir = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [foundProduct, setFoundProduct] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      // Membuat data transaksi yang akan dikirim ke backend
      const transactionData = {
        kasir: 'kasir_name', // Gantilah 'kasir_name' dengan nama kasir yang sesuai
        total: products.reduce((acc, product) => acc + (product.harga_jual * product.qty), 0),
        sales_items: products.map(product => ({
          kode_produk: product.kode_produk,
          qty: product.qty,
          harga_jual: product.harga_jual
        })),
      };

      // Mengirim permintaan POST ke backend untuk menyimpan transaksi
      const response = await axios.post('http://localhost:5000/api/transactions', transactionData);

      if (response.status === 201) {
        alert('Pembayaran berhasil disimpan.');
        dispatch(clearProducts()); // Membersihkan keranjang produk di Redux
        localStorage.removeItem('products'); // Menghapus data produk dari localStorage
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Gagal menyimpan transaksi.');
    }
  };

  const handleNewTransaction = () => {
    setShowConfirmModal(true); // Menampilkan modal konfirmasi
  };

  const handleNewTransactionConfirm = () => {
    dispatch(clearProducts());
    localStorage.removeItem('products');
    setSearchCode('');
    setFoundProduct(null); 
    setErrorMessage(''); 
    setShowConfirmModal(false); // Menutup modal
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
    <>
      <HeaderKasir onNewTransaction={handleNewTransaction} />
      <KeyboardShortcuts 
        onSearch={handleSearchProduct} 
        onNewTransaction={handleNewTransaction} 
        toggleSupervisorModal={showSupervisorModal ? handleCloseSupervisorModal : handleOpenSupervisor}
        showSupervisorModal={showSupervisorModal}
        showConfirmModal={showConfirmModal}
      />

      {/* Tambahkan komponen SProdukKasir */}
      <SProdukKasir onSearch={handleSearchProduct} />

      <div className="kasir-container" style={{ marginTop: '0' }}>
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

          <div className="flex-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
            <div>
              <InformationBoxKasir />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ marginBottom: '10px' }}><h2>Total: {totalAmount}</h2></div>
              <PaySectionKasir onPay={handlePayment} />
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
    </>
  );
};

export default Kasir;
