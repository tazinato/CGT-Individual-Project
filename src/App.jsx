import "./App.css";
import { useReducer, useEffect, createContext, useContext, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
  Navigate
} from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import PokemonCard from "./components/PokemonCard";
import { pokemonData } from './Data/pokemonData.jsx';

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POKEMON':
      return { ...state, pokemon: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FILTERS':
      return { 
        ...state, 
        selectedType: action.payload.selectedType || state.selectedType,
        searchTerm: action.payload.searchTerm || state.searchTerm 
      };
    case 'TOGGLE_MODE':
      return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' };
    case 'RESET_FILTERS':
      return { ...state, selectedType: 'All', searchTerm: '' };
    default:
      return state;
  }
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    pokemon: [],
    loading: true,
    selectedType: 'All',
    searchTerm: '',
    mode: 'light'
  });

  useEffect(() => {
  setTimeout(() => {
    dispatch({
      type: 'SET_POKEMON',
      payload: pokemonData  
    });
  }, 1000);
}, []);


  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be within AppProvider');
  return context;
}

function Home() {
  const { state, dispatch } = useAppContext();
  const { pokemon, loading, selectedType, searchTerm } = state;

  const filteredPokemon = pokemon.filter(p => 
    (selectedType === 'All' || p.types.includes(selectedType)) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateFilters = (newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Pokédex...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => updateFilters({ searchTerm: e.target.value })}
        />
        <select 
          value={selectedType}
          onChange={(e) => updateFilters({ selectedType: e.target.value })}
        >
          <option>All</option>
          <option>Electric</option>
          <option>Fire</option>
          <option>Flying</option>
          <option>Psychic</option>
        </select>
        <button onClick={() => dispatch({ type: 'RESET_FILTERS' })}>
          Reset
        </button>
      </div>
      <div className="pokemon-grid">
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

function PokemonDetail() {
  const { id } = useParams();
  const { state } = useAppContext();
  const pokemon = state.pokemon.find(p => p.id === parseInt(id));

  if (!pokemon) {
    return (
      <div className="not-found">
        <h2>Pokémon not found</h2>
        <Link to="/">← Back to Pokédex</Link>
      </div>
    );
  }

  return (
    <div className="pokemon-detail">
      <Link to="/" className="back-button">← Back</Link>
      <div className="detail-content">
        <img src={pokemon.image} alt={pokemon.name} />
        <div className="pokemon-info">
          <h1>{pokemon.name} <span className="pokemon-number">{pokemon.number}</span></h1>
          <div className="types">
            {pokemon.types.map(type => (
              <span key={type} className={`type ${type.toLowerCase()}`}>
                {type}
              </span>
            ))}
          </div>
          <p className="description">{pokemon.description}</p>
          <div className="stats">
            <h3>Base Stats</h3>
            <div className="stat-bars">
              {Object.entries(pokemon.stats).map(([stat, value]) => (
                <div key={stat} className="stat">
                  <span>{stat.toUpperCase()}</span>
                  <div className="bar-container">
                    <div className="bar" style={{width: `${(value/200)*100}%`}}></div>
                  </div>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppLayout({ children }) {
  const { state, dispatch } = useAppContext();

  return (
    <div className={`app ${state.mode}`}>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>© 2026 Pokémon Pokédex Recreation</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={
              <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h2>⚠️ Page not found</h2>
                <Link to="/" style={{
                  background: '#ff6b35', color: 'white', padding: '12px 24px',
                  textDecoration: 'none', borderRadius: '25px', display: 'inline-block'
                }}>
                  ← Back to Pokédex
                </Link>
              </div>
            } />
          </Routes>
        </AppLayout>
      </AppProvider>
    </Router>
  );
}
export { useAppContext };
export { AppProvider };
export default App;
