import { useState } from 'react';

const useKasirLogic = () => {
  const [products, setProducts] = useState([]);

  const addProductFromSearch = (product) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex((p) => p.kode_produk === product.kode_produk);
      
      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex].qty += 1; // Tambahkan 1 ke qty yang ada
        return updatedProducts;
      } else {
        return [...prevProducts, { 
          id: prevProducts.length + 1,
          kode_produk: product.kode_produk,
          nama_produk: product.nama_produk,
          qty: 1,
          harga_jual: product.harga_jual,
          discount: 0 
        }];
      }
    });
  };

  return {
    products, setProducts, addProductFromSearch,
  };
};

export default useKasirLogic;
