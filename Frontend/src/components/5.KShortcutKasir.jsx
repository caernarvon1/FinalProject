import React, { useEffect, useCallback } from 'react';

const KeyboardShortcuts = ({ onNewTransaction, toggleSupervisorModal, showSupervisorModal }) => {
  const handleKeyDown = useCallback(
    (e) => {
      console.log('Key pressed:', e.key); // Debugging untuk memeriksa tombol yang ditekan
      if (e.key === 'F2' && !showSupervisorModal) {
        // F2 hanya aktif jika modal supervisor tidak terbuka
        e.preventDefault();
        onNewTransaction();
      } else if (e.key === 'F3' && !showSupervisorModal) {
        // F3 hanya aktif jika modal supervisor tidak terbuka
        e.preventDefault();
        toggleSupervisorModal();
      }
    },
    [onNewTransaction, toggleSupervisorModal, showSupervisorModal]
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
