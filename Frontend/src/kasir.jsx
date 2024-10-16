import React, { useEffect, useState } from 'react';
import './kasir.css'; // Pastikan untuk mengimpor CSS
import useKasirLogic from './component/LogicKasir'; // Mengimpor logika dari file terpisah
import axios from 'axios'; // Mengimpor axios

const Kasir = () => {
  const {
    products,
    setProducts,
    customer,
    setCustomer,
    notes,
    setNotes,
    paymentMethod,
    setPaymentMethod,
    paymentAmount,
    setPaymentAmount,
    change,
    addProductFromSearch, // Menambahkan fungsi ini
  } = useKasirLogic(); // Menggunakan logika dari hook

  const [searchCode, setSearchCode] = useState(''); // State untuk menyimpan kode barang yang dicari

  const handleSearchProduct = async () => {
    if (!searchCode) return; // Jika input kosong, tidak melakukan pencarian

    try {
      const response = await axios.get(`http://localhost:5000/api/produk/${searchCode}`); // Ganti dengan endpoint API Anda
      const product = response.data;

      if (product) {
        addProductFromSearch(product); // Menggunakan fungsi dari LogicKasir
        setSearchCode(''); // Reset input setelah produk ditambahkan
      } else {
        alert('Produk tidak ditemukan');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Terjadi kesalahan saat mencari produk');
    }
  };

  return (
    <div className="kasir-container">
      {/* Left Section - Ordered Products */}
      <div className="left-section">
        <h1>ORDERED PRODUCTS</h1>
        <input
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder="Masukkan Kode Barang"
        />
        <button onClick={handleSearchProduct}>Cari Produk</button>
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
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>
                  <input
                    type="number"
                    value={product.qty}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].qty = parseFloat(e.target.value);
                      setProducts(newProducts);
                    }}
                    placeholder="Qty"
                  />
                </td>
                <td>{product.price}</td>
                <td>{(product.price * product.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Section */}
        <div className="total-section">
          <h2>Total: {(products.reduce((acc, product) => acc + (product.price * product.qty), 0)).toFixed(2)}</h2>
        </div>
      </div>

      {/* Right Section - Customer Info and Payment */}
      <div className="right-section">
        <div className="customer-info">
          <h3>Customer Info</h3>
          <input
            type="text"
            placeholder="Customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="payment-method">
          <h3>Payment Method</h3>
          <label>
            <input type="radio" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
            Cash
          </label>
          <label>
            <input type="radio" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
            Bank Transfer
          </label>
          <label>
            <input type="radio" value="credit" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} />
            Credit Card
          </label>
          <input
            type="number"
            placeholder="Payment Amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Change"
            value={change}
            readOnly
          />
        </div>

        <button>Save</button>
        <button>Calculator</button>
      </div>
    </div>
  );
};

export default Kasir;
