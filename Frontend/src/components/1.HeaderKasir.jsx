import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Clock from './clock';
import Supervisor from './4.ModalSpvKasir'; // Impor Supervisor dengan modal

function HeaderKasir({ onNewTransaction }) {
  const location = useLocation(); // Mendapatkan lokasi saat ini
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);

  const handleOpenSupervisorModal = () => setShowSupervisorModal(true);
  const handleCloseSupervisorModal = () => setShowSupervisorModal(false);

  const produk = [{"id":1,"kode_produk":1001,"nama_produk":"Gula Pasir","qty":3,"harga_jual":"10000","discount":0}]

  return (
    <>
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
            {/* Icon New Transaction */}
            <li className="nav-item ms-3">
              <button 
                className="btn btn-light"
                onClick={onNewTransaction} 
                title="'F2' New Transaction"
              >
                <i className="fas fa-file-alt"></i>
              </button>
            </li>
            {/* Tombol Supervisor */}
            <li className="nav-item ms-3">
              <button 
                className="btn btn-light" 
                onClick={handleOpenSupervisorModal}
                title="'F3' Supervisor"
              >
                <i className="fas fa-user-shield"></i> Supervisor
              </button>
            </li>
          </ul>
          <div className="ms-auto">
            <Clock />
          </div>
        </div>
      </nav>

      {/* Modal Supervisor */}

      

      <Supervisor 
        showModal={showSupervisorModal} 
        handleClose={handleCloseSupervisorModal} 
        products={produk}
      />
    </>
  );
}

export default HeaderKasir;
