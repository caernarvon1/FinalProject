import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

const InfoBoxKasir = ({ logs, setLogs, resetLogs }) => {
  const products = useSelector((state) => state.products);
  const [localLogs, setLocalLogs] = useState(logs);

  const handleLogChange = useCallback(() => {
    const latestProduct = products[products.length - 1];
    if (!latestProduct) return;

    // Cek jika ada pengurangan qty (misalnya qty -1)
    const qtyChange = latestProduct.qty < 0 ? 'decreased' : 'increased';
    
    // Tampilkan berapa qty yang berkurang
    const qtyMessage = qtyChange === 'decreased'
      ? `Update successful, Quantity of ${latestProduct.nama_produk} decreased by ${Math.abs(latestProduct.qty)}.`
      : '';  // Untuk penambahan, tidak perlu pesan spesifik

    // Ambil timestamp baru saat log ditambahkan
    const newTimestamp = new Date().toISOString();

    const newLogEntry = {
      message: qtyMessage || `Product added successfully: ${latestProduct.nama_produk}.`,
      timestamp: newTimestamp, // Gunakan timestamp yang baru
    };

    // Update logs dengan menambahkan pesan baru jika ada perubahan qty
    setLogs((prevLogs) => [newLogEntry, ...prevLogs]);
  }, [products, setLogs]);

  // Handle log reset
  const resetLogHandler = useCallback(() => {
    setLocalLogs([]);
  }, []);

  React.useEffect(() => {
    handleLogChange();
  }, [handleLogChange]);

  React.useEffect(() => {
    if (resetLogs) {
      resetLogHandler();
    }
  }, [resetLogs, resetLogHandler]);

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
          {logs.length === 0 ? (
            <li className="list-group-item">
              <span>Welcome back, please input the goods into the cart immediately.</span>
              <br />
              <span>and have a nice day.</span>
            </li>
          ) : (
            logs.map((log, index) => (
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
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default InfoBoxKasir;
