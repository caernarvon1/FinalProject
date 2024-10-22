import React, { useState, useEffect } from "react";

// Membuat komponen fungsional Clock
const Clock = () => {
  // Menggunakan useState untuk menyimpan waktu saat ini
  const [time, setTime] = useState(new Date());

  // Menggunakan useEffect untuk mengatur interval pembaruan waktu
  useEffect(() => {
    // Membuat interval yang memanggil fungsi tick setiap detik
    const timerID = setInterval(() => tick(), 1000);

    // Fungsi pembersihan untuk menghentikan interval saat komponen di-unmount
    return () => clearInterval(timerID);
  }, []); // Dependency array kosong berarti efek ini hanya dijalankan sekali saat komponen dimuat

  // Fungsi untuk memperbarui state time dengan waktu saat ini
  const tick = () => {
    setTime(new Date());
  };

  // Mengambil detik, menit, dan jam dari objek waktu
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12; // Mengubah jam ke format 12 jam

  // Menghitung gaya CSS untuk jarum detik
  const secondHandStyle = {
    transform: `rotate(${seconds * 6}deg)`, // 360/60 derajat untuk setiap detik
    backgroundColor: '#f00', // Warna merah untuk jarum detik
    height: '18px', // Tinggi jarum detik
    width: '2px', // Lebar jarum detik
    position: 'absolute',
    bottom: '50%', // Menempatkan jarum dari bawah
    left: '50%', // Menempatkan jarum dari kiri
    transformOrigin: 'bottom', // Titik rotasi jarum
  };

  // Menghitung gaya CSS untuk jarum menit
  const minuteHandStyle = {
    transform: `rotate(${minutes * 6 + seconds * 0.1}deg)`, // Menambahkan dampak detik pada jarum menit
    backgroundColor: '#000', // Warna hitam untuk jarum menit
    height: '15px', // Tinggi jarum menit
    width: '3px', // Lebar jarum menit
    position: 'absolute',
    bottom: '50%', // Menempatkan jarum dari bawah
    left: '50%', // Menempatkan jarum dari kiri
    transformOrigin: 'bottom', // Titik rotasi jarum
  };

  // Menghitung gaya CSS untuk jarum jam
  const hourHandStyle = {
    transform: `rotate(${hours * 30 + minutes * 0.5}deg)`, // Menambahkan dampak menit pada jarum jam
    backgroundColor: '#000', // Warna hitam untuk jarum jam
    height: '10px', // Tinggi jarum jam
    width: '4px', // Lebar jarum jam
    position: 'absolute',
    bottom: '50%', // Menempatkan jarum dari bawah
    left: '50%', // Menempatkan jarum dari kiri
    transformOrigin: 'bottom', // Titik rotasi jarum
  };

  // Mengembalikan JSX untuk menampilkan jam digital dan jam analog
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Menampilkan waktu digital di sebelah kiri */}
      <div style={{ marginRight: '10px', fontSize: '20px', fontWeight: 'bold', color: '#000' }}>
        {time.toLocaleTimeString()} {/* Format waktu digital */}
      </div>
      {/* Menampilkan jam analog di sebelah kanan */}
      <div style={{ position: 'relative', width: '45px', height: '45px', border: '2px solid #333', borderRadius: '50%', backgroundColor: '#fff' }}>
        <div style={hourHandStyle} /> {/* Jarum jam */}
        <div style={minuteHandStyle} /> {/* Jarum menit */}
        <div style={secondHandStyle} /> {/* Jarum detik */}
        <div style={{ position: 'absolute', width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} /> {/* Titik tengah jam */}
      </div>
    </div>
  );
};

export default Clock; // Mengekspor komponen Clock
