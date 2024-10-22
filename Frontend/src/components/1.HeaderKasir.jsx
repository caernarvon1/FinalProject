import { Link, useLocation } from 'react-router-dom';
import Clock from './clock'; // Mengimpor komponen Clock dari file Clock.js

// Komponen Navbar
function HeaderKasir() {
  const location = useLocation(); // Mendapatkan lokasi saat ini

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light border-bottom p-0" // Menghapus padding
      style={{ height: '50px' }} // Hapus padding inline
    >
      <a className="navbar-brand ms-3" href="#">Alpenfohn</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link ms-3 ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
          </li>
        </ul>
        <div className="ms-auto">
          <Clock />
        </div>
      </div>
    </nav>
  );
}

export default HeaderKasir; // Mengekspor komponen Navbar
