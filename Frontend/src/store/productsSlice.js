// store/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      const existingProduct = state.find(
        (product) => product.kode_produk === action.payload.kode_produk
      );
      if (existingProduct) {
        existingProduct.qty += action.payload.qty; // Update qty jika produk sudah ada
      } else {
        state.push(action.payload); // Tambah produk baru
      }
    },
    clearProducts: () => {
      return [];
    },
  },
});

export const { setProducts, addProduct, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
