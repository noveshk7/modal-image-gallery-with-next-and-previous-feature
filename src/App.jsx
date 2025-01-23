import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageGrid from './components/ImageGrid';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <ImageGrid />
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;