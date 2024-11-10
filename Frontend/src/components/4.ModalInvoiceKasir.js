// 4.ModalInvoiceKasir.js
import React, { useEffect } from 'react';

const ModalInvoiceKasir = ({ items, totalAmount, receiptNumber, manager, address, formattedDate }) => {
  useEffect(() => {
    const invoiceWindow = window.open('', '_blank', 'width=400,height=600');
    invoiceWindow.document.write(`
      <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: monospace; text-align: center; }
          .invoice-item { display: flex; justify-content: space-between; }
          hr { border: none; border-top: 1px dashed #000; margin: 10px 0; }
          .barcode { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h2>SHOP'S</h2>
        <p>Receipt: ${receiptNumber}</p>
        <p>Manager: ${manager}</p>
        <p>Address: ${address}</p>
        <p>${formattedDate}</p>
        
        <div style="margin-top: 20px;">
          ${items.map(item => `
            <div class="invoice-item"><span>${item.name}</span><span>${item.price}</span></div>
          `).join('')}
        </div>

        <hr />
        <p>Total..................... ${totalAmount}</p>
        <p>xxxx xxxx xxxx 1234 Visa/5544</p>
        <hr />
        
        <p style="font-weight: bold;">THANK YOU FOR SHOPPING!</p>
        
        <div class="barcode">
          <img src="barcode-placeholder.png" alt="barcode" style="width: 100%;" />
        </div>
      </body>
      </html>
    `);
    invoiceWindow.document.close();
  }, [items, totalAmount, receiptNumber, manager, address, formattedDate]);

  return null; // Komponen ini hanya membuka jendela, jadi tidak perlu menampilkan UI
};

export default ModalInvoiceKasir;
