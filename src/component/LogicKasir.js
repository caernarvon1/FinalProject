import { useState } from 'react';

const useKasirLogic = () => {
  const [products, setProducts] = useState([{ id: 1, name: '', qty: 0, price: 0, discount: 0, total: 0 }]);
  const [customer, setCustomer] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [change, setChange] = useState(0);

  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, name: '', qty: 0, price: 0, discount: 0, total: 0 }]);
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

  return {
    products, setProducts, customer, setCustomer, notes, setNotes,
    paymentMethod, setPaymentMethod, change, setChange,
    handleAddProduct, handleProductChange, calculateTotal,
  };
};

export default useKasirLogic;
