import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PokemonDetail({ pokemonList }) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPokemon = pokemonList?.find(p => p.id == id);
    setPokemon(foundPokemon);
    setLoading(false);
  }, [pokemonList, id]);

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px', 
        fontSize: '18px' 
      }}>
        🔄 Loading Pokémon details...
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '80px 20px',
        color: '#666'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>😢 Pokémon not found!</h2>
        <p>Check the Pokédex for available Pokémon</p>
      </div>
    );
  }

  const typeColors = {
    electric: '#FFD700',
    fire: '#FF4444', 
    psychic: '#DA70D6',
    flying: '#87CEEB',
    normal: '#A8A878',
    water: '#6390F1',
    grass: '#7AC74C',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#D5BD48',
    rock: '#BBA13E',
    bug: '#A6B91A',
    ghost: '#735797',
    steel: '#B7B8C6',
    dragon: '#6F35FC',
    dark: '#705746',
    fairy: '#D685AD',
    ice: '#9AD6FF'
  };

  const maxStat = 200;

  return (
    <div className="pokemon-detail" style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* Header */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '200px 1fr', 
        gap: '30px', 
        marginBottom: '40px',
        alignItems: 'start'
      }}>
        <img 
          src={pokemon.image} 
          alt={pokemon.name}
          style={{ 
            width: '200px', 
            height: '200px', 
            objectFit: 'contain',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x200/666/fff?text=?';
          }}
        />
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>
              {pokemon.name} 
              <span style={{ 
                fontSize: '1.2rem', 
                color: '#666', 
                fontWeight: 'normal',
                marginLeft: '10px'
              }}>
                {pokemon.number}
              </span>
            </h1>
            {pokemon.isLegendary && (
              <span style={{ 
                background: 'linear-gradient(45deg, #FFD700, #FFA500)', 
                color: 'black', 
                padding: '8px 16px', 
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 15px rgba(255,215,0,0.4)'
              }}>
                ★ LEGENDARY
              </span>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {pokemon.types.map(type => (
              <span 
                key={type}
                style={{ 
                  backgroundColor: typeColors[type.toLowerCase()] || '#666',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          📊 Base Stats
        </h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {Object.entries(pokemon.stats).map(([statName, value]) => {
            const formattedName = statName === 'spAttack' ? 'Sp. Atk' : 
                                statName === 'spDefense' ? 'Sp. Def' : 
                                statName.charAt(0).toUpperCase() + statName.slice(1);
            return (
              <div key={statName} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ minWidth: '80px', fontWeight: 'bold' }}>{formattedName}:</span>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    background: `linear-gradient(to right, ${typeColors[pokemon.types[0]?.toLowerCase()] || '#666'} ${value/maxStat*100}%, #eee ${value/maxStat*100}%)`,
                    height: '12px',
                    borderRadius: '6px',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                  }} />
                </div>
                <span style={{ minWidth: '40px', textAlign: 'right', fontWeight: 'bold' }}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Description & Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>
        <div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📖 Pokédex Entry
          </h3>
          <p style={{ 
            fontSize: '18px', 
            lineHeight: '1.6',
            color: '#333',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            borderLeft: '5px solid #ff6b35'
          }}>
            {pokemon.description}
          </p>
        </div>
        
        <div className="detail-physics">
          <h4 style={{ marginBottom: '15px' }}>📏 Physical Characteristics</h4>
          <div style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <p><strong>Height:</strong> {pokemon.height || 'N/A'}</p>
            <p><strong>Weight:</strong> {pokemon.weight || 'N/A'}</p>
            <p><strong>Abilities:</strong> {pokemon.abilities?.join(', ') || 'N/A'}</p>
            <p><strong>Generation:</strong> {pokemon.generation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
