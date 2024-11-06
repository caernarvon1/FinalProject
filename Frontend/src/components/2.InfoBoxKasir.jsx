// 2.InfoBoxKasir.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const InfoBoxKasir = () => {
  const products = useSelector((state) => state.products);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (products.length > logs.length) {
      const newProduct = products[products.length - 1];
      setLogs((prevLogs) => [
        ...prevLogs,
        `${new Date().toLocaleString()} Product added successfully: ${newProduct.nama_produk}`,
      ]);
    } else if (products.length < logs.length) {
      const removedProduct = logs[logs.length - 1].split(': ')[1];
      setLogs((prevLogs) => [
        ...prevLogs,
        `${new Date().toLocaleString()} Product removed successfully: ${removedProduct}`,
      ]);
    }
  }, [products]);

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h5 className="mb-0">Information</h5>
      </div>
      <div className="card-body" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <ul className="list-group list-group-flush">
          {logs.map((log, index) => (
            <li key={index} className="list-group-item">
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoBoxKasir;
