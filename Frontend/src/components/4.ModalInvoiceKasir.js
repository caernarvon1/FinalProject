import React, { useEffect } from 'react';

const ModalInvoiceKasir = ({ items, totalAmount, receiptNumber, manager, address, formattedDate, paymentAmount, changeAmount }) => {
  useEffect(() => {
    const invoiceWindow = window.open('', '_blank', 'width=400,height=600');
    invoiceWindow.document.write(`
      <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: monospace; text-align: center; }
          .invoice-item { display: flex; text-align: left; }
          .invoice-item .name { flex: 2; }
          .invoice-item .qty { flex: 1; text-align: center; }
          .invoice-item .price, .invoice-item .total { flex: 1; text-align: right; }
          .invoice-item .hargajual { flex: 1; text-align: right; }
          .amount-row { display: flex; justify-content: space-between; margin: 5px 0; }
          .amount-row span:first-child { flex: 1; text-align: left; }
          .amount-row span:last-child { text-align: right; }
          .dots::before {
            content: '';
            flex: 1;
            border-bottom: 1px dotted #000;
            margin: 0 5px;
          }
          hr { border: none; border-top: 1px dashed #000; margin: 10px 0; }
          .barcode { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h2>ALPENFOHN'S</h2>
        <p>Receipt: ${receiptNumber}</p>
        <p>Manager: ${manager}</p>
        <p>Address: ${address}</p>
        <p>${formattedDate}</p>
        
        <div style="margin-top: 20px;">
          ${items.map(item => `
            <div class="invoice-item">
              <span class="name">${item.name}</span>
              <span class="qty">${item.qty}</span>
              <span class="hargajual">${'Rp ' + item.harga_jual.toLocaleString('id-ID', { style: 'decimal' }).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</span>
              <span class="price">${item.price.toLocaleString('id-ID', { style: 'decimal' }).replace(',', '.').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</span>
            </div>
          `).join('')}
        </div>

        <hr />
        <div class="amount-row">
          <span>Total Price</span>
          <span class="dots"></span>
          <span>${totalAmount}</span>
        </div>
        <div class="amount-row">
          <span>Amount Paid</span>
          <span class="dots"></span>
          <span>${paymentAmount}</span>
        </div>
        <div class="amount-row">
          <span>Change</span>
          <span class="dots"></span>
          <span>${changeAmount}</span>
        </div>
        <hr />
        
        <p style="font-weight: bold;">THANK YOU FOR SHOPPING!</p>
      </body>
      </html>
    `);
    invoiceWindow.document.close();
  }, [items, totalAmount, receiptNumber, manager, address, formattedDate, paymentAmount, changeAmount]);

  return null;
};

export default ModalInvoiceKasir;
