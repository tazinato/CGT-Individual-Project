import { Link } from 'react-router-dom';
import { useAppContext } from '../App.jsx';

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="card">
      <div className="card-image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="card-title">{pokemon.name}</div>
      <div className="types">
        {pokemon.types.map(type => (
          <span key={type} className={`type ${type.toLowerCase()}`}>
            {type}
          </span>
        ))}
      </div>
      <div className="card-description">{pokemon.number}</div>
    </Link>
  );
}

export default PokemonCard;
