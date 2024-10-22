import { Link, useLocation } from 'react-router-dom';
import Clock from './clock'; // Mengimpor komponen Clock dari file Clock.js

function HeaderKasir({ onNewTransaction }) {
  const location = useLocation(); // Mendapatkan lokasi saat ini

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light border-bottom p-0"
      style={{ height: '50px' }}
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
            <Link className={`nav-link ms-3 ${location.pathname === '/' ? 'active' : ''}`} to="/">Menu</Link>
          </li>
          {/* Menambahkan Icon New Transaction */}
          <li className="nav-item ms-3">
            <button 
              className="btn btn-light"
              onClick={onNewTransaction} // Ketika icon di klik
              title="Mulai Transaksi Baru"
            >
              <i className="fas fa-file-alt"></i> {/* Icon Font Awesome */}
            </button>
          </li>
        </ul>
        <div className="ms-auto">
          <Clock />
        </div>
      </div>
    </nav>
  );
}

export default HeaderKasir;
