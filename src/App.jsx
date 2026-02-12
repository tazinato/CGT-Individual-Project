import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link
} from "react-router-dom";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import PokemonCard from "./components/PokemonCard";
import Section from "./components/Section";
import pikachuImg from "./assets/pikachu.jpg";
import charizardImg from "./assets/charizard.jpg";
import mewtwoImg from "./assets/mewtwo.jpg";

function PokemonDetail({ pokemonList, mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const isDark = mode === "dark";

  useEffect(() => {
    const foundPokemon = pokemonList.find(p => p.id == id);
    setPokemon(foundPokemon);
  }, [pokemonList, id]);

  if (!pokemon) {
    return (
      <div style={{ 
        padding: '50px', 
        textAlign: 'center', 
        color: isDark ? '#e2e8f0' : '#666',
        background: isDark ? '#1a202c' : 'white',
        minHeight: '100vh'
      }}>
        <h2>😢 Pokémon not found</h2>
        <button onClick={() => navigate('/')} style={{
          background: '#ff6b35', color: 'white', border: 'none',
          padding: '12px 24px', borderRadius: '25px', cursor: 'pointer',
          fontWeight: 'bold', marginTop: '20px'
        }}>
          ← Back to Pokédex
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '20px',
      background: isDark ? '#1a202c' : 'white',
      color: isDark ? '#e2e8f0' : '#2d3748',
      minHeight: '100vh'
    }}>
      <button onClick={() => navigate('/')} style={{
        background: '#ff6b35', color: 'white', border: 'none',
        padding: '12px 24px', borderRadius: '25px', marginBottom: '30px',
        cursor: 'pointer', fontWeight: 'bold'
      }}>
        ← Back to Pokédex
      </button>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: isDark ? '#e2e8f0' : '#2d3748', marginBottom: '10px' }}>
          {pokemon.name} <span style={{ color: isDark ? '#cbd5e0' : '#666', fontSize: '1.2rem' }}>{pokemon.number}</span>
        </h1>
        <img src={pokemon.image} alt={pokemon.name} style={{
          width: '280px', height: '280px', objectFit: 'contain',
          borderRadius: '20px', margin: '20px auto', display: 'block',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }} />
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          background: isDark ? '#2d3748' : '#f8f9fa', 
          padding: '25px', 
          borderRadius: '16px'
        }}>
          <h3 style={{ 
            color: isDark ? '#e2e8f0' : '#2d3748', 
            marginBottom: '20px', 
            textAlign: 'center'
          }}>📊 Base Stats</h3>
          
          {/* HP, Attack, Defense */}
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>HP</span>
              <span style={{ fontWeight: 'bold' }}>{pokemon.stats.hp}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Attack</span>
              <span style={{ fontWeight: 'bold' }}>{pokemon.stats.attack}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Defense</span>
              <span style={{ fontWeight: 'bold' }}>{pokemon.stats.defense}</span>
            </div>
          </div>
        </div>

        <div style={{ 
          background: isDark ? '#2d3748' : '#f8f9fa', 
          padding: '25px', 
          borderRadius: '16px'
        }}>
          <h3 style={{ 
            color: isDark ? '#e2e8f0' : '#2d3748', 
            marginBottom: '20px', 
            textAlign: 'center'
          }}>⚡ Special Stats</h3>
          
          {/* Sp. Atk, Sp. Def, Speed */}
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Sp. Atk</span>
              <span style={{ fontWeight: 'bold' }}>{pokemon.stats.spAttack}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Sp. Def</span>
              <span style={{ fontWeight: 'bold' }}>{pokemon.stats.spDefense}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Speed</span>
              <span style={{ fontWeight: 'bold' }}>{pokemon.stats.speed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Types & Description */}
      <div style={{ 
        background: isDark ? '#2d3748' : '#f8f9fa', 
        padding: '25px', 
        borderRadius: '16px',
        color: isDark ? '#e2e8f0' : '#2d3748'
      }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          {pokemon.types.map(type => (
            <span key={type} style={{
              background: '#ff6b35',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: 'bold'
            }}>
              {type}
            </span>
          ))}
        </div>
        <h3 style={{ marginBottom: '15px', color: isDark ? '#e2e8f0' : '#2d3748' }}>📖 Pokédex Entry</h3>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          {pokemon.description}
        </p>
      </div>
    </div>
  );
}

function Home({
  pokemon, types, selectedType, setSelectedType,
  searchTerm, setSearchTerm, mode, loading, handleReset
}) {
  const isDark = mode === "dark";
  
  const filteredPokemon = pokemon
    .filter(p => selectedType === "All" || p.types.includes(selectedType))
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return <div style={{ 
      textAlign: "center", 
      padding: "50px",
      background: isDark ? '#1a202c' : 'white',
      color: isDark ? '#e2e8f0' : '#2d3748',
      minHeight: '100vh'
    }}>
      <h2>🔄 Loading Pokédex...</h2>
    </div>;
  }

  return (
    <>
      <Introduction />
      <div style={{ 
        padding: '20px',
        background: isDark ? '#1a202c' : 'white',
        color: isDark ? '#e2e8f0' : '#2d3748',
        minHeight: '100vh'
      }}>
        <Section title="Pokédex" style={{ 
          background: isDark ? '#2d3748' : 'white',
          color: isDark ? '#e2e8f0' : '#2d3748'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            flexWrap: 'wrap', 
            marginBottom: '30px',
            background: isDark ? '#4a5568' : '#f8f9fa',
            padding: '20px',
            borderRadius: '12px'
          }}>
            <div>
              <label style={{ color: isDark ? '#e2e8f0' : '#2d3748', display: 'block', marginBottom: '5px' }}>Type:</label>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{
                background: isDark ? '#4a5568' : 'white',
                color: isDark ? '#e2e8f0' : '#2d3748',
                border: `1px solid ${isDark ? '#cbd5e0' : '#e2e8f0'}`,
                padding: '8px 12px',
                borderRadius: '6px'
              }}>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: isDark ? '#e2e8f0' : '#2d3748', display: 'block', marginBottom: '5px' }}>Search:</label>
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pikachu..." style={{
                  background: isDark ? '#4a5568' : 'white',
                  color: isDark ? '#e2e8f0' : '#2d3748',
                  border: `1px solid ${isDark ? '#cbd5e0' : '#e2e8f0'}`,
                  padding: '8px 12px',
                  borderRadius: '6px'
                }} />
            </div>
            <button onClick={handleReset} style={{
              background: '#ff6b35',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>Reset</button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '20px' 
          }}>
            {filteredPokemon.map(poke => (
              <Link 
                key={poke.id} 
                to={`/pokemon/${poke.id}`} 
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <PokemonCard pokemon={poke} mode={mode} />
              </Link>
            ))}
            {filteredPokemon.length === 0 && (
              <p style={{ textAlign: 'center', color: isDark ? '#cbd5e0' : '#666' }}>No Pokémon found!</p>
            )}
          </div>
        </Section>
      </div>
    </>
  );
}

function AppLayout({ children, mode, toggleMode }) {
  const isDark = mode === "dark";
  return (
    <div style={{
      background: isDark ? '#1a202c' : '#f7fafc',
      color: isDark ? '#e2e8f0' : '#2d3748',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <Header />
      <div style={{ 
        padding: '15px 20px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isDark ? '#2d3748' : '#edf2f7',
        color: isDark ? '#e2e8f0' : '#2d3748',
        boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <span style={{ fontWeight: '500' }}>Theme: {isDark ? "🌙 Night" : "☀️ Day"}</span>
        <button onClick={toggleMode} style={{
          background: isDark ? '#ff6b35' : '#4299e1',
          color: 'white',
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '25px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
          {isDark ? "☀️ Day" : "🌙 Night"}
        </button>
      </div>
      <main>{children}</main>
    </div>
  );
}

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [types] = useState(["All", "Electric", "Fire", "Flying", "Psychic"]);
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPokemon([
  {
    id: 25, 
    name: "Pikachu", 
    number: "#025", 
    types: ["Electric"],
    image: pikachuImg, 
    stats: { 
      hp: 35, 
      attack: 55, 
      defense: 40, 
      spAttack: 50, 
      spDefense: 50, 
      speed: 90 
    },
    description: "Pikachu is a short, chubby rodent Pokémon."
  },
  {
    id: 6, 
    name: "Charizard", 
    number: "#006", 
    types: ["Fire", "Flying"],
    image: charizardImg, 
    stats: { 
      hp: 78, 
      attack: 84, 
      defense: 78, 
      spAttack: 109, 
      spDefense: 85, 
      speed: 100 
    },
    description: "Charizard flies and breathes intense flames."
  },
  {
    id: 150, 
    name: "Mewtwo", 
    number: "#150", 
    types: ["Psychic"],
    image: mewtwoImg, 
    stats: { 
      hp: 106, 
      attack: 110, 
      defense: 90, 
      spAttack: 154, 
      spDefense: 90, 
      speed: 130 
    },
    description: "Mewtwo was created by genetic manipulation."
  }
]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleReset = () => {
    setSelectedType("All");
    setSearchTerm("");
  };

  const toggleMode = () => {
    setMode(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <Router>
      <AppLayout mode={mode} toggleMode={toggleMode}>
        <Routes>
          <Route path="/" element={
            <Home pokemon={pokemon} types={types} selectedType={selectedType}
              setSelectedType={setSelectedType} searchTerm={searchTerm}
              setSearchTerm={setSearchTerm} mode={mode} loading={loading}
              handleReset={handleReset} />
          } />
          <Route path="/pokemon/:id" element={<PokemonDetail pokemonList={pokemon} mode={mode} />} />
          <Route path="/about" element={
            <Section title="About">
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>🔍 Pokédex</h2>
                <p>Your interactive Pokémon encyclopedia!</p>
              </div>
            </Section>
          } />
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
    </Router>
  );
}

export default App;
