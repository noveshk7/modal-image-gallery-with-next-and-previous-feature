import { FaMoon, FaSun } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="logo" onClick={scrollToTop} role="button" tabIndex={0}>N.W Gallery</h1>
        <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;