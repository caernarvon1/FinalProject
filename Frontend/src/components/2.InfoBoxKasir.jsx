import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const InfoBoxKasir = ({ logs, setLogs, resetLogs }) => {
  const products = useSelector((state) => state.products);
  const [localLogs, setLocalLogs] = useState(logs);

  useEffect(() => {
    if (products.length > logs.length) {
      const newProduct = products[products.length - 1];
      const newLogEntry = {
        message: `Product added successfully : ${newProduct.nama_produk}`,
        timestamp: newProduct.timestamp,
      };
      setLogs((prevLogs) => [newLogEntry, ...prevLogs]);
    } else if (products.length < logs.length) {
      const removedProduct = logs[logs.length - 1].message.split(': ')[1];
      const removedTimestamp = new Date().getTime(); // atau ambil dari sumber lain jika tersedia
      const newLogEntry = {
        message: `Product removed successfully : ${removedProduct}`,
        timestamp: removedTimestamp,
      };
      setLogs((prevLogs) => [newLogEntry, ...prevLogs]);
    }
  }, [products]);

  // Reset logs saat resetLogs dipanggil
  useEffect(() => {
    setLocalLogs([]);
  }, [resetLogs]);


  return (
    <div className="card mt-3" style={{ height: '165px' }}>
      <div className="card-header">
        <h5 className="mb-0">Transaction History</h5>
      </div>
      <div
        className="card-body"
        style={{
          maxHeight: '135px',
          overflowY: 'auto',
          padding: '0px 10px 0px 0px',
        }}
      >
        <ul className="list-group list-group-flush">
          {logs.map((log, index) => (
            <li
              key={index}
              className="list-group-item"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <span>{log.message}</span>
              <span>
                {log.timestamp
                  ? `${new Date(log.timestamp).toLocaleDateString()} | ${new Date(log.timestamp).toLocaleTimeString()}`
                  : 'No timestamp'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoBoxKasir;
