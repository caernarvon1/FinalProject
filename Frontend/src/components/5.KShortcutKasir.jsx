import React, { useEffect, useCallback } from 'react';

const KeyboardShortcuts = ({ 
  onNewTransaction, 
  toggleSupervisorModal, 
  showSupervisorModal, 
  showConfirmModal, 
  togglePayModal, 
  showPayModal 
}) => {
  const handleKeyDown = useCallback(
    (e) => {
      console.log('Key pressed:', e.key); // Debugging untuk memeriksa tombol yang ditekan

      // Jika modal konfirmasi muncul, blokir semua input
      if (showConfirmModal) {
        e.preventDefault();
        return;
      }

      // Cek jika modal pembayaran terbuka, dan blokir tombol F2, F4, dan F8
      if (showPayModal) {
        if (e.key === 'F2' || e.key === 'F4' || e.key === 'F8') {
          e.preventDefault(); // Blokir tombol tersebut
        }
        return;
      }

      // Cek jika modal supervisor terbuka, dan blokir tombol F8
      if (showSupervisorModal) {
        if (e.key === 'F8') {
          e.preventDefault(); // Blokir F8
        }
        return;
      }

      // Tombol F2 - New Transaction
      if (e.key === 'F2' && !showSupervisorModal) {
        e.preventDefault();
        onNewTransaction();
      } 
      // Tombol F4 - Supervisor Modal
      else if (e.key === 'F4' && !showSupervisorModal) {
        e.preventDefault();
        toggleSupervisorModal();
      } 
      // Tombol F8 - Pay Modal
      else if (e.key === 'F8') {
        e.preventDefault();
        togglePayModal(); // Fungsi untuk membuka modal pembayaran
      }
    },
    [onNewTransaction, toggleSupervisorModal, showSupervisorModal, showConfirmModal, togglePayModal, showPayModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return null;
};

export default KeyboardShortcuts;
