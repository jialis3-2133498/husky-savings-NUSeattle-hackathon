import { styles } from "../styles/appStyles";

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <header style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.navInner}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              ...styles.navButton,
              ...(currentPage === "home" ? styles.navButtonActive : {}),
            }}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate("discounts")}
            style={{
              ...styles.navButton,
              ...(currentPage === "discounts" ? styles.navButtonActive : {}),
            }}
          >
            Perks and Benefits
          </button>

          <button
            onClick={() => {
              if (currentPage !== "home") {
                onNavigate("home");
              }

              window.setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }, 50);
            }}
            style={styles.navButton}
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
}
