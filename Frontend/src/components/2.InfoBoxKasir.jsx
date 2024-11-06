import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const InfoBoxKasir = () => {
  const products = useSelector((state) => state.products);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (products.length > logs.length) {
      const newProduct = products[products.length - 1];
      setLogs((prevLogs) => [
        `Product added successfully : ${newProduct.nama_produk} `,
        ...prevLogs, // Menambahkan log terbaru di bagian atas
      ]);
    } else if (products.length < logs.length) {
      const removedProduct = logs[logs.length - 1].split(': ')[1];
      setLogs((prevLogs) => [
        `Product removed successfully : ${removedProduct} `,
        ...prevLogs, // Menambahkan log terbaru di bagian atas
      ]);
    }
  }, [products]);

  return (
    <div className="card mt-3" style={{ height: '165px' }}>
      <div className="card-header">
        <h5 className="mb-0">Transaction History</h5>
      </div>
      <div className="card-body" 
      style={{ 
        maxHeight: '135px', 
        overflowY: 'auto', 
        padding: '0px 10px 0px 0px', /* Urutannya: top, right, bottom, left */
        }}>

        <ul className="list-group list-group-flush">
          {logs.map((log, index) => (
            <li key={index} className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{log}</span>
              <span>
                {new Date().toLocaleDateString()} 
                {' | '} {/* Separator antara tanggal dan jam */}
                {new Date().toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoBoxKasir;
