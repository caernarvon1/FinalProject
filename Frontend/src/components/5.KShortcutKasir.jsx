import React, { useEffect, useCallback } from 'react';

const KeyboardShortcuts = ({ onNewTransaction, toggleSupervisorModal, showSupervisorModal, showConfirmModal, togglePayModal }) => {
  const handleKeyDown = useCallback(
    (e) => {
      console.log('Key pressed:', e.key); // Debugging untuk memeriksa tombol yang ditekan
      if (showConfirmModal) {
        e.preventDefault();
        return;
      }

      if (e.key === 'F2' && !showSupervisorModal) {
        e.preventDefault();
        onNewTransaction();
      } else if (e.key === 'F4' && !showSupervisorModal) {
        e.preventDefault();
        toggleSupervisorModal();
      } else if (e.key === 'F8') {
        e.preventDefault();
        togglePayModal(); // Fungsi untuk membuka modal pembayaran
      }
    },
    [onNewTransaction, toggleSupervisorModal, showSupervisorModal, showConfirmModal, togglePayModal]
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
