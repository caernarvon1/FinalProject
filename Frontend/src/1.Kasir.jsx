import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useKasirLogic from './components/0.LogicKasir'; 
import HeaderKasir from './components/1.HeaderKasir';
import FooterKasir from './components/3.FooterKasir';
import PaySectionKasir from './components/2.PaySectionKasir';
import KeyboardShortcuts from './components/5.KShortcutKasir';
import ModalSpvKasir from './components/4.ModalSpvKasir';
import './1.Kasir.css'; 

const Kasir = () => {
  const { products, setProducts, addProductFromSearch } = useKasirLogic();
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [foundProduct, setFoundProduct] = useState(null);
  
  // Membuat ref untuk tabel
  const tableRef = useRef(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, [setProducts]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
      // Scroll ke bawah tabel ketika produk diperbarui
      if (tableRef.current) {
        tableRef.current.scrollTop = tableRef.current.scrollHeight;
      }
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
        addProductFromSearch({ 
          kode_produk: product.kode_produk, 
          nama_produk: product.nama_produk, 
          harga_jual: product.harga_jual 
        });
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

  const handlePayment = () => {
    window.open('/receipt', '_blank');
  };

  const handleNewTransaction = () => {
    setProducts([]);
    localStorage.removeItem('products');
    setSearchCode('');
    setFoundProduct(null); 
    setErrorMessage(''); 
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
      />

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
                {/* Menambahkan baris kosong hingga mencapai total 5 baris */}
                {products.length < 5 && Array.from({ length: 5 - products.length }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td colSpan="6" style={{ textAlign: 'center', color: '#ccc' }}>- Empty -</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

      <ModalSpvKasir 
        showModal={showSupervisorModal} 
        handleClose={handleCloseSupervisorModal} 
        products={products} 
        setProducts={setProducts} 
      />
    </>
  );
};

export default Kasir;
