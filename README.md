# Pokémon Pokédex Recreation

## Original Website Chosen
**Pokémon.com Pokédex**  
[https://www.pokemon.com/us/pokedex/](https://www.pokemon.com/us/pokedex/)

## Scope of Recreation
Recreated core Pokédex functionality including:
- Pokémon search and filtering by name/type
- Individual Pokémon detail pages with stats visualization
- Responsive card grid layout
- Dark/light theme toggle
- Sticky navigation header

## Features Implemented
- ✅ Search bar with live filtering
- ✅ Type filter dropdown (All, Electric, Fire, Flying, Psychic)
- ✅ Clickable Pokémon cards navigating to detail pages
- ✅ Detailed stats pages with progress bars
- ✅ Dark/light theme toggle
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Loading states and smooth transitions
- ✅ Sticky header navigation (Home/About)
- ✅ 404 handling redirects to home

## Technical Implementation

**State Management**  
- Context API + `useReducer` for global state
- Single source of truth for Pokémon data, filters, loading, theme
- Actions: `SET_POKEMON`, `SET_FILTERS`, `TOGGLE_MODE`, `RESET_FILTERS`

**Routing Structure**  
/
/pokemon/:id (25, 6, 150)
/about

(redirect to home)

text
- React Router v6 with `BrowserRouter`, `Routes`, `Route`
- `useParams()` for dynamic Pokémon routes
- `Link` components for navigation

**Hooks Used**  
- `useReducer` - Global state management
- `useContext` - Access app state anywhere
- `useEffect` - Load Pokémon data on mount
- `useParams` - Extract route parameters
- Custom `useAppContext()` hook

**Styling**  
- CSS Grid + Flexbox for responsive layouts
- CSS custom properties and theme classes (`.app.light`, `.app.dark`)
- Glassmorphism effects with `backdrop-filter`
- Hover animations and micro-interactions
- Mobile-first responsive breakpoints

## Live Site & Repository
**Live Site**: https://tazinato.github.io/CGT-Individual-Project  
**Repository**: https://github.com/tazinato/CGT-Individual-Project

## Project File Structure
src/
├── App.jsx (main app + context + routes)
├── App.css (responsive styling + themes)
├── components/
│ ├── Header.jsx
│ └── PokemonCard.jsx
└── assets/
├── pikachu.jpg
├── charizard.jpg
└── mewtwo.jpg

## Future Improvements
- Integrate PokéAPI for 1000+ Pokémon
- Add animations (Framer Motion)
- Progressive Web App (PWA) support
- Advanced filtering (generation, stats range)
- Pokémon favorites/saved list
- Type effectiveness calculator
- Export stats as PDF
To deploy and get your URLs:

bash
npm install --save-dev gh-pages
npm run deploy