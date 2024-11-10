import React, { useEffect } from 'react';

// Komponen SProdukKasir menerima dua props: onSearch (fungsi pencarian) dan searchCode (kode produk yang diinput)
const SProdukKasir = ({ onSearch, searchCode }) => {

  // Menggunakan useEffect untuk mendeteksi perubahan pada searchCode dan onSearch
  useEffect(() => {

    // Mengecek apakah searchCode memiliki nilai
    if (searchCode) {

      // Membuat timeout yang akan menunggu 500ms setelah terakhir kali searchCode berubah
      // Setelah 500ms, fungsi onSearch dipanggil
      const typingTimeout = setTimeout(() => {
        onSearch(); // Panggil fungsi onSearch dari prop setelah 500ms
      }, 500);

      // Mengembalikan fungsi cleanup untuk membersihkan timeout saat searchCode berubah atau komponen di-unmount
      return () => clearTimeout(typingTimeout); // Bersihkan timeout jika searchCode berubah
    }

    // Efek ini dijalankan kembali setiap kali searchCode atau onSearch berubah
  }, [searchCode, onSearch]);

  // Komponen tidak menampilkan elemen apa pun di layar
  return null;
};

export default SProdukKasir;
