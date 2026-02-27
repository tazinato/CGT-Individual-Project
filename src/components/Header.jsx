import { Link } from 'react-router-dom';
import { useAppContext } from '../App.jsx';

function Header() {
  const { state, dispatch } = useAppContext();

  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1 className="header-title">🎮 Pokédex</h1>
      </Link>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <button 
        className="theme-toggle"
        onClick={() => dispatch({ type: 'TOGGLE_MODE' })}
      >
        {state.mode === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}

export default Header;