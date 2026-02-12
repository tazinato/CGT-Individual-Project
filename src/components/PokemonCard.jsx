import { Link } from 'react-router-dom';
import { useState } from 'react';

function PokemonCard({ pokemon, mode }) {
  return (
    <div className={`pokemon-card ${mode}`}>
      <img 
        src={pokemon.image} 
        alt={pokemon.name}
        style={{
          width: '140px',   
          height: '140px',     
          objectFit: 'contain',  
          borderRadius: '15px',
          marginBottom: '10px',
          display: 'block',
          margin: '0 auto'
        }}
      />
      <h3>{pokemon.name}</h3>
      <p>{pokemon.number}</p>
      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
        {pokemon.types.map(type => (
          <span key={type} style={{
            background: '#ff6b35', color: 'white',
            padding: '4px 8px', borderRadius: '12px', fontSize: '12px'
          }}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
export default PokemonCard;