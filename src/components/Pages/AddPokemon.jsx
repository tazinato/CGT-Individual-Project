import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPokemon = ({ onAddPokemon }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "",
    description: "",
    image: ""
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Pokémon name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.number.trim()) newErrors.number = "Pokédex number is required";
    else if (!/^\d+$/.test(formData.number))
      newErrors.number = "Number must be numeric (e.g., 25)";

    if (!formData.type.trim()) newErrors.type = "Type is required";

    if (formData.description.trim().length > 200)
      newErrors.description = "Description cannot exceed 200 characters";

    const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (formData.image.trim() && !imageRegex.test(formData.image)) {
      newErrors.image = "Please enter a valid image URL (jpg, png, gif, webp)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      if (typeof onAddPokemon === "function") {
        onAddPokemon({
          ...formData,
          id: Date.now(),
          number: `#${formData.number.padStart(3, '0')}`,
          types: [formData.type],
          stats: { 
            hp: 50, attack: 50, defense: 50, 
            spAttack: 50, spDefense: 50, speed: 50 
          },
          height: "N/A",
          weight: "N/A",
          abilities: ["TBD"],
          generation: "Generation I",
          isLegendary: false
        });
      }
      
      setFormData({
        name: "",
        number: "",
        type: "",
        description: "",
        image: ""
      });
      
      setSuccessMsg("🎉 Pokémon added to Pokédex successfully!");
      setIsSubmitting(false);
      setErrors({});

      // Redirect to home after success
      setTimeout(() => {
        navigate("/"); 
      }, 1500);
    }, 1000);
  };

  return (
    <main className="main-content">
      <div className="add-pokemon-container">
        <h1>➕ Add New Pokémon</h1>
        <p className="form-subtitle">Catch a new Pokémon for your Pokédex!</p>

        {successMsg && (
          <div
            className="success-message"
            style={{
              background: "#d4edda",
              color: "#155724",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              borderLeft: "5px solid #28a745",
              boxShadow: "0 2px 8px rgba(40, 167, 69, 0.3)"
            }}
          >
            ✅ {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-pokemon-form">
          {/* Pokémon Name */}
          <div className="form-group">
            <label htmlFor="name">Pokémon Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Eevee"
              className={errors.name ? "error" : ""}
              style={{ padding: "12px", borderRadius: "6px" }}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Pokédex Number */}
          <div className="form-group">
            <label htmlFor="number">Pokédex Number *</label>
            <input
              id="number"
              name="number"
              type="number"
              min="1"
              max="1010"
              value={formData.number}
              onChange={handleChange}
              placeholder="133"
              className={errors.number ? "error" : ""}
              style={{ padding: "12px", borderRadius: "6px" }}
            />
            {errors.number && <span className="error-text">{errors.number}</span>}
            <small style={{ color: "#666" }}>
              Will be formatted as #133
            </small>
          </div>

          {/* Type */}
          <div className="form-group">
            <label htmlFor="type">Primary Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={errors.type ? "error" : ""}
              style={{ padding: "12px", borderRadius: "6px" }}
            >
              <option value="">Select Type</option>
              <option value="Electric">⚡ Electric</option>
              <option value="Fire">🔥 Fire</option>
              <option value="Water">💧 Water</option>
              <option value="Grass">🌿 Grass</option>
              <option value="Psychic">🔮 Psychic</option>
              <option value="Flying">🕊️ Flying</option>
              <option value="Normal">⭐ Normal</option>
              <option value="Fighting">👊 Fighting</option>
              <option value="Poison">☠️ Poison</option>
              <option value="Ground">⛰️ Ground</option>
              <option value="Rock">🪨 Rock</option>
              <option value="Bug">🐛 Bug</option>
              <option value="Ghost">👻 Ghost</option>
              <option value="Steel">🔩 Steel</option>
              <option value="Dragon">🐉 Dragon</option>
              <option value="Dark">🌑 Dark</option>
              <option value="Fairy">🧚 Fairy</option>
              <option value="Ice">❄️ Ice</option>
            </select>
            {errors.type && <span className="error-text">{errors.type}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Pokédex Entry</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Pokémon description (max 200 chars)"
              rows="4"
              maxLength="200"
              className={errors.description ? "error" : ""}
              style={{ padding: "12px", borderRadius: "6px", resize: "vertical" }}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
            <small style={{ color: "#666" }}>
              {formData.description.length}/200 characters
            </small>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label htmlFor="image">Sprite Image URL (Optional)</label>
            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/sprite.png"
              className={errors.image ? "error" : ""}
              style={{ padding: "12px", borderRadius: "6px" }}
            />
            {errors.image && <span className="error-text">{errors.image}</span>}
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginTop: "10px",
                  border: "3px solid #ff6b35",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn pokemon-submit"
            style={{
              background: "linear-gradient(45deg, #ff6b35, #f7931e)",
              color: "white",
              padding: "16px 32px",
              border: "none",
              borderRadius: "25px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              width: "100%",
              fontWeight: "bold",
              fontSize: "18px",
              boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
              transition: "all 0.3s ease",
              marginTop: "20px"
            }}
            onMouseOver={(e) => !isSubmitting && (e.target.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => !isSubmitting && (e.target.style.transform = "translateY(0)")}
          >
            {isSubmitting ? "⚡ Catching..." : "➕ Add to Pokédex"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddPokemon;
