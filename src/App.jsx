import React, { useState } from 'react';
import { Header } from './components/Header/Header'; 
import { Board } from './components/Board/Board';
import './index.css'; 

const App = () => {
  return (
    <div className="app-layout" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden',
      backgroundColor: '#ffffff' 
    }}>
      
      {/* Header akan menyesuaikan layout otomatis via .header-wrapper */}
      <header>
        <Header />
      </header>

      {/* Main Board - CSS .board-container menangani scroll-snap di mobile */}
      <main className="board-container">
        <Board />
      </main>

    </div>
  );
};

export default App;