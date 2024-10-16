import React from 'react';
import './kasir.css'; // Pastikan untuk mengimpor CSS
import useKasirLogic from './component/LogicKasir'; // Mengimpor logika dari file terpisah

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
    totalAmount,
    change,
    handleAddProduct,
  } = useKasirLogic(); // Menggunakan logika dari hook

  return (
    <div className="kasir-container">
      
      {/* Left Section - Ordered Products */}
      <div className="left-section">
        <h1>ORDERED PRODUCTS</h1>
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
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={product.code}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].code = e.target.value;
                      setProducts(newProducts);
                    }}
                    placeholder="Kode Item"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].name = e.target.value;
                      setProducts(newProducts);
                    }}
                    placeholder="Nama Item"
                  />
                </td>
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
                <td>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => {
                      const newProducts = [...products];
                      newProducts[index].price = parseFloat(e.target.value);
                      setProducts(newProducts);
                    }}
                    placeholder="Harga"
                  />
                </td>
                <td>{(product.price * product.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddProduct}>Add Product</button>

        {/* Total Section */}
        <div className="total-section">
          <h2>Total: {totalAmount}</h2>
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
