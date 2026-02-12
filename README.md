# Pokédex - React Interactivity Checkpoint

## Live Demo
[Deployed on GitHub Pages](https://yourusername.github.io/CGT-Individual-Project/)

## Checkpoint Progress ✅

**Implemented Interactive Features:**
- **Search by name** - Real-time filtering as user types (`useState` + `onChange`)
- **Type filtering** - Dropdown selects Electric/Fire/Psychic types (`useState` + `onChange`) 
- **Reset functionality** - Clears all filters instantly (`onClick` handler)
- **Dark/Light theme toggle** - Complete page theme switching (`useState` + `onClick`)
- **Pokemon detail pages** - Click cards to navigate (`Link` + `useParams`)
- **Responsive card grid** - Uniform 220px cards, 3-per-row layout

**Technical Implementation:**
State: useState for searchTerm, selectedType, mode, pokemon data

Events: onChange (search/filter), onClick (reset/theme), Link navigation

Filtering: pokemon.filter().filter().sort() chain with live re-renders

Routing: React Router v6 with /pokemon/:id detail pages

Theme: Inline CSS with isDark conditional styling across all components

text

**Why These Interactions:**
- **Search + Filter** = Fast Pokémon lookup by name OR type (core Pokédex UX)
- **Theme Toggle** = Accessibility + modern app polish
- **Detail Pages** = Deep dive into individual Pokémon stats/descriptions
- **Reset** = Quick return to full Pokédex view

**Live Features Working:**
☀️/🌙 Theme toggle (full page)
🔍 Search "Pikachu" → instant filter
⚡ Filter "Electric" → shows Pikachu only
🔄 Reset → shows all Pokémon
Click Pikachu → /pokemon/25 detail page
Responsive: 1-4 cards/row by screen size

## Core React Concepts Demonstrated
- **useState** - Dynamic data (filters, theme, pokemon list)
- **useEffect** - Data loading + detail page lookup  
- **Event Handling** - onChange, onClick, form interactions
- **Conditional Rendering** - Loading states, empty results, not found
- **Component Re-rendering** - Live filter updates without page refresh
- **Routing** - Client-side navigation with useParams/useNavigate

## Tech Stack
React 18 + Vite + React Router v6
ES6+ (arrow functions, destructuring, template literals)
CSS Grid + Flexbox (responsive layout)
Inline CSS themes (no external dependencies)

## Setup & Run
```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # Deploy-ready dist/ folder
File Structure
text
src/
├── components/
│   ├── Header.jsx
│   ├── PokemonCard.jsx (dark mode + hover)
│   ├── Section.jsx
│   └── Introduction.jsx
├── assets/
│   ├── pikachu.jpg
│   ├── charizard.jpg
│   └── mewtwo.jpg
└── App.jsx (all logic inline)
Next Steps Planned
Pokémon API Integration (pokeapi.co)

Favorites system (save/load from localStorage)

Sorting (by number, stats)

Animations (card flips, theme transitions)

Mobile swipe gestures