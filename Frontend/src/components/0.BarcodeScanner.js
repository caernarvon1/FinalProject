// BarcodeScanner.js
import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Modal, Button } from 'react-bootstrap';

const BarcodeScanner = ({ onBarcodeDetected, showScanner, onClose }) => {
  const videoRef = useRef(null);
  const [barcodeData, setBarcodeData] = useState('');

  useEffect(() => {
    if (showScanner) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error('Webcam tidak dapat diakses:', err);
        });
    }

    const detectBarcode = () => {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code) {
        setBarcodeData(code.data);
        onBarcodeDetected(code.data);
        onClose(); // Tutup modal setelah barcode terdeteksi
      }
    };

    const interval = setInterval(detectBarcode, 1000);
    return () => clearInterval(interval);
  }, [onBarcodeDetected, showScanner, onClose]);

  return (
    <Modal show={showScanner} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Scan Barcode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <video ref={videoRef} width="100%" height="100%" autoPlay />
        <p>{barcodeData ? `Barcode Detected: ${barcodeData}` : 'Scanning...'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Tutup</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BarcodeScanner;
