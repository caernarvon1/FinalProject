import React, { useEffect, useCallback } from 'react';

const KeyboardShortcuts = ({ onNewTransaction, toggleSupervisorModal, showSupervisorModal, showConfirmModal }) => {
  const handleKeyDown = useCallback(
    (e) => {
      console.log('Key pressed:', e.key); // Debugging untuk memeriksa tombol yang ditekan
      if (showConfirmModal) {
        // Jika modal konfirmasi terbuka, jangan biarkan tombol lain diproses
        e.preventDefault();
        return;
      }

      if (e.key === 'F2' && !showSupervisorModal) {
        // F2 hanya aktif jika modal supervisor tidak terbuka
        e.preventDefault();
        onNewTransaction();
      } else if (e.key === 'F4' && !showSupervisorModal) {
        // F4 hanya aktif jika modal supervisor tidak terbuka
        e.preventDefault();
        toggleSupervisorModal();
      }
    },
    [onNewTransaction, toggleSupervisorModal, showSupervisorModal, showConfirmModal]
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
