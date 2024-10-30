import React, { useEffect, useCallback, useState } from 'react';

const SProdukKasir = ({ onSearch }) => { // Menerima prop onSearch
  const [typingTimeout, setTypingTimeout] = useState(null); // State untuk menyimpan timeout

  const handleKeyUp = useCallback(
    (e) => {
      console.log('Key pressed:', e.key); // Debugging untuk memeriksa tombol yang ditekan

      // Cek jika angka pertama dimasukkan
      if (!isNaN(e.key)) {
        // Jika ada timeout sebelumnya, bersihkan
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }

        // Set timeout untuk menunggu 500 ms setelah terakhir kali tombol ditekan
        const newTimeout = setTimeout(() => {
          console.log('onSearch is called'); // Log untuk memeriksa pemanggilan onSearch
          onSearch(e.key); // Panggil fungsi onSearch() setelah 500 ms tidak ada penekanan tombol
          setTypingTimeout(null); // Reset timeout setelah memanggil onSearch
        }, 500);

        setTypingTimeout(newTimeout); // Simpan ID timeout yang baru diatur
        console.log('Typing timeout set:', newTimeout); // Log ID timeout yang baru diatur
      }
    },
    [onSearch, typingTimeout]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp); // Ganti keydown dengan keyup
    return () => {
      window.removeEventListener('keyup', handleKeyUp); // Pastikan event dibersihkan
      if (typingTimeout) {
        clearTimeout(typingTimeout); // Hapus timeout saat komponen di-unmount
        console.log('Typing timeout cleared on unmount:', typingTimeout); // Log timeout yang dibersihkan saat unmount
      }
    };
  }, [handleKeyUp, typingTimeout]);

  return null;
};

export default SProdukKasir; // Ekspor komponen dengan nama yang benar
