import styles from "./Card.module.css";

function Card({ name, types, stats, isLegendary, image, mode }) {
  const isDark = mode === "dark";

  const cardClassNames = [
    styles.card,
    isDark ? styles.cardDark : "",
    isLegendary ? styles.cardHighlight : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassNames}>
      {image && (
        <img className={styles.cardImage} src={image} alt={name} />
      )}
      <h3 className={styles.cardTitle}>{name}</h3>
      <p className={styles.cardSubtitle}>{types}</p>
      <p className={styles.cardDescription}>{stats}</p>
      {isLegendary && (
        <span className={styles.cardTag}>Legendary</span>
      )}
    </article>
  );
}
export default Card;