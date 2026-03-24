import { useState } from "react";
import { getFallbackDealImage } from "../lib/dealsApi";
import { styles } from "../styles/appStyles";

export default function DiscountCard({ deal }) {
  const [hasImageError, setHasImageError] = useState(false);
  const imageSrc = hasImageError ? getFallbackDealImage() : deal.image;

  return (
    <article style={styles.dealCard}>
      <div style={styles.iconCircle}>
        <img
          src={imageSrc}
          alt={deal.name}
          style={styles.logoImage}
          loading="lazy"
          decoding="async"
          onError={() => setHasImageError(true)}
        />
      </div>

      <h3 style={styles.dealBrand}>{deal.name}</h3>
      <p style={styles.dealTitle}>{deal.description || "Student discount available"}</p>

      <a
        href={deal.url}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", marginTop: "20px" }}
      >
        <button style={styles.primaryButton}>Learn More</button>
      </a>

      <p style={styles.meta}>
        {deal.category} · {deal.benefit_type || "Offer"} · {deal.last_verified || "Unverified"}
      </p>
    </article>
  );
}
