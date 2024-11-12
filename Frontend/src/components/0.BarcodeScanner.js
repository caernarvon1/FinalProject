import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';

const BarcodeScanner = ({ onBarcodeDetected, showScanner, onClose }) => {
  const videoRef = useRef(null);
  const [barcodeData, setBarcodeData] = useState('');
  const [scanning, setScanning] = useState(false);
  const [autoClose, setAutoClose] = useState(true);

  useEffect(() => {
    if (showScanner) {
      const startScanning = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          videoRef.current.srcObject = stream;
          setScanning(true);
        } catch (err) {
          console.error('Webcam tidak dapat diakses:', err);
        }
      };

      startScanning();
      
      const detectBarcode = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (video.videoWidth === 0 || video.videoHeight === 0) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        
        if (code) {
          setBarcodeData(code.data);
          onBarcodeDetected(code.data);
          setScanning(false);
          
          if (autoClose) onClose();
        }
      };

      const interval = setInterval(detectBarcode, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showScanner, onBarcodeDetected, onClose, autoClose]);

  return (
    <Modal show={showScanner} onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Scan Barcode</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative' }}>
          <video 
            ref={videoRef} 
            width="100%" 
            height="100%" 
            autoPlay 
            style={{ borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }} 
          />
          {scanning && (
            <div 
              style={{
                position: 'absolute', 
                bottom: '10px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                color: 'white'
              }}
            >
              <Spinner animation="border" size="sm" /> Scanning...
            </div>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>Close Automatically After Scan</span>
          <Form.Check 
            type="switch"
            checked={autoClose}
            onChange={() => setAutoClose(prev => !prev)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BarcodeScanner;
