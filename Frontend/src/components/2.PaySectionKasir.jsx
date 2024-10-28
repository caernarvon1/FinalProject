import React from 'react';

const PaySectionKasir = ({ infoMessage, onPay }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px', marginTop: '20px' }}>
      <div style={{ flex: 1 }}>
        <p>{infoMessage}</p>
      </div>
      <div style={{ flexShrink: 0 }}>
        <button onClick={onPay}>Membayar</button>
      </div>
    </div>
  );
};

export default PaySectionKasir; // Pastikan nama sesuai
