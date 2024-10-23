import React, { useEffect, useCallback } from 'react';

const KeyboardShortcuts = ({ onSearch, onNewTransaction, toggleSupervisorModal }) => {
  // Mendefinisikan fungsi handleKeyDown dengan useCallback
  const handleKeyDown = useCallback((e) => {
    console.log('Key pressed:', e.key); // Debugging untuk memeriksa tombol yang ditekan
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    } else if (e.key === 'F2') {
      e.preventDefault();
      onNewTransaction();
    } else if (e.key === 'F3') {
      e.preventDefault();
      toggleSupervisorModal(); // Menangani F3 untuk toggle
    }
  }, [onSearch, onNewTransaction, toggleSupervisorModal]); // Mengganti onOpenSupervisor dengan toggleSupervisorModal

  useEffect(() => {
    // Menambahkan event listener untuk keydown
    window.addEventListener('keydown', handleKeyDown);

    // Menghapus event listener saat komponen unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Menjadikan handleKeyDown sebagai dependensi

  return null; // Komponen ini tidak perlu merender apa pun
};

export default KeyboardShortcuts;
