// components/5.KShortcutKasir.jsx
import React, { useEffect } from 'react';

const KeyboardShortcuts = ({ onSearch, onNewTransaction }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
    if (e.key === 'F2') {
      e.preventDefault();
      onNewTransaction();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Tambahkan handleKeyDown ke dalam array dependensi

  return null; // Komponen ini tidak perlu merender apa pun
};

export default KeyboardShortcuts;
