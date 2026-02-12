import { useState, useEffect } from "react";
import Section from "./Section";
import PokemonCard from "./PokemonCard";
import Introduction from "./Introduction";

export default function Home({
  pokemon,
  types,
  selectedType,
  setSelectedType,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  mode,
  loading,
  handleReset
}) {
  const isDark = mode === "dark";

  // Filtering logic
  const filteredPokemon = pokemon
    .filter(poke => 
      selectedType === "All" || poke.types.includes(selectedType)
    )
    .filter(poke => 
      poke.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}><h2>🔄 Loading Pokédex...</h2></div>;
  }

  return (
    <>
      <Introduction />
      <Section title="Pokédex">
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            {types.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokémon..."
          />
          <button onClick={handleReset}>Reset</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {filteredPokemon.map(poke => (
            <a key={poke.id} href={`/pokemon/${poke.id}`} style={{ textDecoration: 'none' }}>
              <PokemonCard pokemon={poke} mode={mode} />
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
