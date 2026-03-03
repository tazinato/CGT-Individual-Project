import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about">
      <h2>About This Pokédex</h2>
      <p>
        A recreation of Bulbapedia, with a focus on game specific information. <a href="https://bulbapedia.bulbagarden.net/wiki/Main_Page"  target="_blank" rel="noopener noreferrer">Bulbapedia</a>.
      </p>
      <h3>Features</h3>
      <ul>
        <li>✅ Search by name</li>
        <li>✅ Filter by type</li>
        <li>✅ Individual Pokémon detail pages</li>
        <li>✅ Dark/light theme toggle</li>
        <li>✅ Responsive design</li>
        <li>✅ React Router navigation</li>
      </ul>
      <h3>Tech Stack</h3>
      <p>React + Context API + useReducer + React Router v6 + CSS Grid</p>
      <Link to="/" className="back-button">← Back to Pokédex</Link>
    </div>
  );
}

export default About;
