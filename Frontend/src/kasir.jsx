import React, { useState } from 'react';
import './kasir.css'; // Pastikan untuk mengimpor CSS
import useKasirLogic from './component/LogicKasir'; // Mengimpor logika dari file terpisah
import axios from 'axios'; // Mengimpor axios

const Kasir = () => {
  const {
    products,
    setProducts,
    addProductFromSearch, // Menambahkan fungsi ini
  } = useKasirLogic(); // Menggunakan logika dari hook

  const [searchCode, setSearchCode] = useState(''); // State untuk menyimpan kode barang yang dicari
  const [loading, setLoading] = useState(false); // Loading state saat mencari produk
  const [errorMessage, setErrorMessage] = useState(''); // State untuk pesan error
  const [searchedProduct, setSearchedProduct] = useState(null); // State untuk menyimpan produk yang dicari

  const handleSearchProduct = async () => {
    if (!searchCode) {
      setErrorMessage('Kode produk harus diisi');
      setSearchedProduct(null); // Reset produk yang dicari jika tidak ada kode
      return;
    }
    setLoading(true);
    setErrorMessage(''); // Reset error message sebelum mencari produk

    try {
      const response = await axios.get(`http://localhost:5000/api/produk/${searchCode}`); // Ganti dengan endpoint API Anda
      const product = response.data;

      if (product) {
        addProductFromSearch(product); // Menggunakan fungsi dari LogicKasir
        setSearchedProduct(product); // Menyimpan produk yang ditemukan
        setSearchCode(''); // Reset input setelah produk ditambahkan
      } else {
        setErrorMessage('Produk tidak ditemukan');
        setSearchedProduct(null); // Reset produk yang dicari jika tidak ditemukan
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setErrorMessage('Terjadi kesalahan saat mencari produk');
      setSearchedProduct(null); // Reset produk yang dicari jika terjadi kesalahan
    } finally {
      setLoading(false);
    }
  };

  // Menghitung total amount
  const totalAmount = products.reduce((acc, product) => acc + (product.price * product.qty), 0)
    .toLocaleString('id-ID', { style: 'decimal' }) // Menggunakan style decimal untuk total
    .replace(',', '.') // Mengganti tanda koma dengan titik untuk format IDR
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') // Format ribuan
    .replace(/^/, 'Rp '); // Menambahkan "Rp " di depan total

  return (
    <div className="kasir-container">
      {/* Ordered Products */}
      <div className="order-summary-section" style={{ width: '100%' }}> {/* Pastikan lebar diatur */}
        <h1>Ordered Products</h1>
        {/* Search Section */}
        <div className="search-product" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Masukkan Kode Barang"
              disabled={loading} // Disable saat proses loading
              style={{ flexGrow: 1 }}
            />
            <button onClick={handleSearchProduct} disabled={loading}>
              {loading ? 'Mencari...' : 'Tambah Barang'}
            </button>
          </div>
          {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
          {searchedProduct && (
            <p className="searched-product" style={{ marginTop: '10px' }}>
              Produk Ditemukan: {searchedProduct.name}
            </p>
          )}
        </div>

        {/* Tabel Produk */}
        <table className="products-table" style={{ width: '100%' }}>
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
                    min="1"
                  />
                </td>
                <td>
                  {'Rp ' + (product.price).toLocaleString('id-ID', { style: 'decimal' }).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                </td>
                <td>
                  {'Rp ' + (product.price * product.qty).toLocaleString('id-ID', { style: 'decimal' }).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Section */}
        <div className="total-section">
          <h2>Total: {totalAmount}</h2>
        </div>
      </div>
    </div>
  );
};

export default Kasir;
