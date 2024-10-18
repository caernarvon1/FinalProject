import { useState } from 'react';

const useKasirLogic = () => {
  const [products, setProducts] = useState([]); // Menghapus default produk kosong
  const [searchCode, setSearchCode] = useState(''); // State untuk menyimpan kode barang yang dicari
  const [loading, setLoading] = useState(false); // Loading state saat mencari produk
  const [errorMessage, setErrorMessage] = useState(''); // State untuk pesan error

  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, name: '', qty: 0, price: 0, discount: 0 }]);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const calculateTotal = () => {
    return products.reduce((acc, product) => {
      const totalProduct = product.price * product.qty * (1 - product.discount / 100);
      return acc + totalProduct;
    }, 0).toFixed(2);
  };

  const addProductFromSearch = (product) => {
    setProducts([...products, { 
      id: products.length + 1,
      code: product.kode_produk,
      name: product.nama_produk,
      qty: 1, // Default quantity
      price: product.harga_jual.toLocaleString('id-ID', { minimumFractionDigits: 0 }),
      discount: 0 
    }]);
  };

  return {
    products, setProducts, searchCode, setSearchCode, loading, setLoading, errorMessage, setErrorMessage,
    handleAddProduct, handleProductChange, calculateTotal, addProductFromSearch,
  };
};

export default useKasirLogic;
