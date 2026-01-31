import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Card from "./components/Card";
import Section from "./components/Section";
import pikachu from "./assets/pikachu.jpg";
import charizard from "./assets/charizard.jpg";
import mewtwo from "./assets/mewtwo.jpg";

function App() {
  const pokemon = [
    {
      id: 1,
      name: "Pikachu",
      types: "Electric",
      stats: "HP: 35, Atk: 55, Def: 40, SpA: 50, SpD: 50, Spe: 90",
      isLegendary: false,
      image: pikachu
    },
    {
      id: 2,
      name: "Charizard",
      types: "Fire/Flying",
      stats: "HP: 78, Atk: 84, Def: 78, SpA: 109, SpD: 85, Spe: 100",
      isLegendary: false,
      image: charizard,
    },
    {
      id: 3,
      name: "Mewtwo",
      types: "Psychic",
      stats: "HP: 106, Atk: 110, Def: 90, SpA: 154, SpD: 90, Spe: 130",
      isLegendary: true,
      image: mewtwo,
    }
  ];

  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("light");

  const isDark = mode === "dark";

  const types = ["All", ...new Set(pokemon.map((p) => p.types))];

  const filteredPokemon = pokemon.filter((poke) => {
    const matchesType =
      selectedType === "All" || poke.types === selectedType;

    const matchesSearch =
      poke.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handleReset = () => {
    setSelectedType("All");
    setSearchTerm("");
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={isDark ? "app app-dark" : "app app-light"}>
      <Header />
      <main className="main-content">
        <div className="mode-bar">
          <span>Mode: {isDark ? "Dark" : "Light"}</span>
          <button className="mode-button" onClick={toggleMode}>
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        <Introduction />

        <Section
          title={isDark ? "Pokémon Database (Dark Mode)" : "Pokémon Database"}
        >
          <div className="controls">
            <label className="control-group">
              <span className="control-label">Filter by type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="control-group">
              <span className="control-label">Search by name:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type a Pokémon name..."
              />
            </label>

            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>

          <div className="cards-grid">
            {filteredPokemon.map((poke) => (
              <Card
                key={poke.id}
                name={poke.name}
                types={poke.types}
                stats={poke.stats}
                isLegendary={poke.isLegendary}
                image={poke.image}
                mode={mode}
              />
            ))}
            {filteredPokemon.length === 0 && (
              <p className="no-results">No Pokémon match your filters.</p>
            )}
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;