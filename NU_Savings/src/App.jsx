import homeTop from "./assets/images/home_top.png";
import homeMiddle from "./assets/images/home_middle.png";
import homeFoot from "./assets/images/home_foot.png";
import allDeals from "./data/deals.js";
import instagramLogo from "./assets/logos/instagram_logo.svg";
import facebookLogo from "./assets/logos/facebookLogo.svg";
import xLogo from "./assets/logos/x_logo.png";
import { useEffect, useMemo, useState } from "react";

const featuredDeals = [
  {
    brand: "Seattle Pizza",
    title: "Save 15% on any pizza",
    subtitle: "with your student ID",
    category: "Food & Dining",
    location: "Seattle",
    verified: true,
    image: "🍕",
  },
  {
    brand: "Campus Coffee",
    title: "Get 10% off any coffee drink",
    subtitle: "with your student ID",
    category: "Food & Dining",
    location: "Seattle",
    verified: true,
    image: "☕",
  },
];

const categories = [
  "All",
  "campus_life",
  "entertainment",
  "transportation",
  "wellness",
  "food",
  "retail",
  "travel",
  "technology",
];

const categoryLabels = {
  All: "All",
  campus_life: "Campus Life",
  entertainment: "Entertainment",
  transportation: "Transportation",
  wellness: "Wellness",
  food: "Food",
  retail: "Retail",
  travel: "Travel",
  technology: "Technology",
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f7f5f1",
    color: "#222",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    backgroundColor: "rgba(247,245,241,0.96)",
    borderBottom: "1px solid #ddd",
  },
  navInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    flexWrap: "wrap",
    gap: "12px",
  },
  navButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    color: "#555",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
  navButtonActive: {
    color: "#111",
    fontWeight: "bold",
  },
  heroTop: {
    textAlign: "center",
    paddingTop: "28px",
  },
  smallText: {
    fontSize: "14px",
    color: "#666",
  },
  title: {
    marginTop: "20px",
    fontSize: "48px",
    fontWeight: 300,
  },
  primaryButton: {
    marginTop: "24px",
    backgroundColor: "#c8102e",
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "16px 28px",
    fontSize: "18px",
    cursor: "pointer",
  },
  heroCard: {
    marginTop: "36px",
    backgroundColor: "white",
    border: "1px solid #e5e5e5",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "20px",
    alignItems: "center",
    minHeight: "320px",
    padding: "32px",
  },
  blackPill: {
    display: "inline-block",
    backgroundColor: "black",
    color: "white",
    padding: "10px 18px",
    borderRadius: "999px",
    marginBottom: "12px",
    fontWeight: "bold",
  },
  universityBox: {
    display: "inline-block",
    backgroundColor: "black",
    color: "white",
    padding: "10px 16px",
    borderRadius: "12px",
    letterSpacing: "0.2em",
    fontWeight: "bold",
  },
  heroText: {
    fontSize: "24px",
    color: "#444",
    marginTop: "20px",
    lineHeight: 1.4,
  },
  heroSubtext: {
    fontSize: "16px",
    color: "#666",
    marginTop: "10px",
    lineHeight: 1.5,
  },
  heroArtWrap: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "14px",
    alignItems: "end",
  },
  artBoxLarge: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    borderRadius: "24px",
    minHeight: "170px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "72px",
  },
  artBoxSmall: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    borderRadius: "24px",
    minHeight: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "58px",
  },
  redLabel: {
    gridColumn: "1 / span 2",
    backgroundColor: "#c8102E",
    color: "white",
    textAlign: "center",
    borderRadius: "18px",
    padding: "12px",
    fontWeight: 600,
  },
  section: {
    padding: "70px 0",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "40px",
    fontWeight: 300,
    marginBottom: "16px",
  },
  sectionDesc: {
    maxWidth: "800px",
    margin: "0 auto",
    fontSize: "22px",
    color: "#555",
    lineHeight: 1.5,
  },
  threeCol: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "28px",
    marginTop: "44px",
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid #e5e5e5",
  },
  featuredDealsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    marginTop: "36px",
  },
  featuredCard: {
    backgroundColor: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "24px",
    padding: "24px",
    textAlign: "left",
  },
  featuredEmoji: {
    fontSize: "56px",
    marginBottom: "16px",
  },
  submitSection: {
    backgroundColor: "#fff",
    borderRadius: "28px",
    padding: "32px",
    marginTop: "50px",
    border: "1px solid #e5e5e5",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "20px",
    alignItems: "center",
  },
  searchWrap: {
    maxWidth: "800px",
    margin: "28px auto 0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#e9e9e9",
    borderRadius: "999px",
    padding: "14px 18px",
  },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "16px",
  },
  filters: {
    marginTop: "28px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
  },
  filterButton: {
    borderRadius: "999px",
    padding: "10px 18px",
    border: "1px solid #ddd",
    backgroundColor: "#e9e9e9",
    cursor: "pointer",
    fontSize: "15px",
  },
  filterButtonActive: {
    backgroundColor: "#c8102e",
    color: "white",
    border: "1px solid #c8102e",
  },
  dealsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "28px",
    padding: "50px 0",
  },
  dealCard: {
    backgroundColor: "#fdeef1",
    padding: "28px 20px",
    textAlign: "center",
    minHeight: "340px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "18px",
  },
  iconCircle: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  dealBrand: {
    marginTop: "18px",
    fontSize: "30px",
    fontWeight: 600,
  },
  dealTitle: {
    marginTop: "14px",
    fontSize: "22px",
    lineHeight: 1.4,
  },
  logoImage: {
    width: "68px",
    height: "68px",
    objectFit: "contain",
  },
  meta: {
    marginTop: "auto",
    paddingTop: "18px",
    fontSize: "14px",
    color: "#666",
  },
  pager: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "40px",
  },
  pagerButton: {
    border: "1px solid #ccc",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "8px 14px",
    cursor: "pointer",
  },
  footer: {
    backgroundColor: "#555",
    color: "white",
    marginTop: "40px",
    paddingTop: "18px",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    padding: "20px 0 50px",
  },
  footerTitle: {
    fontSize: "30px",
    fontWeight: 600,
    marginBottom: "12px",
  },
  footerText: {
    fontSize: "20px",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.9)",
  },
  footerIcons: {
    display: "flex",
    gap: "12px",
    fontSize: "20px",
    marginBottom: "16px",
  },
  copyright: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.8)",
    paddingBottom: "18px",
  },
    fullImageCard: {
    marginTop: "36px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  fullImage: {
    width: "100%",
    display: "block",
    borderRadius: "28px",
  },

  middleImageCard: {
    marginTop: "10px",
    marginBottom: "30px",
    borderRadius: "28px",
    overflow: "hidden",
  },

  middleImage: {
    width: "100%",
    display: "block",
    borderRadius: "28px",
  },
  footerImageCard: {
    marginTop: "50px",
    borderRadius: "28px",
    overflow: "hidden",
  },

  footerImage: {
    width: "100%",
    display: "block",
    borderRadius: "28px",
  },
  footerHeroCard: {
    position: "relative",
    marginTop: "50px",
    borderRadius: "28px",
    overflow: "hidden",
  },

  footerHeroImage: {
    width: "100%",
    display: "block",
    borderRadius: "28px",
  },

  footerHeroOverlay: {
    position: "absolute",
    left: "50%",
    bottom: "8%",
    transform: "translateX(-50%)",
    textAlign: "center",
    width: "80%",
    zIndex: 2,
  },

  footerHeroTitle: {
    fontSize: "48px",
    fontWeight: 500,
    color: "white",
    marginBottom: "24px",
    textShadow: "0 2px 8px rgba(0,0,0,0.4)",
  },

  footerHeroButton: {
    backgroundColor: "#c8102E",
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "16px 36px",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  },
  footerHeroShade: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  footerIcons: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "24px",
    marginLeft: "0",
  },

  socialLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },

  socialIcon: {
    width: "24px",
    height: "24px",
    objectFit: "contain",
  },
  budgetSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 24px 50px",
    textAlign: "center",
  },

  budgetTitle: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "16px",
  },
    budgetSubtitle: {
    fontSize: "22px",
    color: "#555",
    marginBottom: "32px",
    lineHeight: 1.5,
  },
  budgetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginBottom: "28px",
  },

  budgetCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "28px 20px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#222",
    lineHeight: 1.4,
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
  },

  budgetNote: {
    fontSize: "20px",
    color: "#555",
    maxWidth: "760px",
    margin: "0 auto",
    lineHeight: 1.6,
  },
};

function Navbar({ onNavigate, currentPage }) {
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
              if (currentPage !== "home") onNavigate("home");
              setTimeout(() => {
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

function Footer() {
  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerIcons}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            style={styles.socialLink}
          >
            <img src={facebookLogo} alt="Facebook" style={styles.socialIcon} />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={styles.socialLink}
          >
            <img src={instagramLogo} alt="Instagram" style={styles.socialIcon} />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            style={styles.socialLink}
          >
            <img src={xLogo} alt="X" style={styles.socialIcon} />
          </a>
        </div>

        <div style={styles.footerGrid}>
          <div>
            <h3 style={styles.footerTitle}>Husky Student Savings</h3>
            <p style={styles.footerText}>
              For partnerships, suggestions, or discount submissions, reach out to us.
            </p>
          </div>

          <div>
            <h3 style={styles.footerTitle}>Contact Us:</h3>
            <p style={styles.footerText}>huskystudentsavings@gmail.com</p>
            <p style={styles.footerText}>Seattle, WA</p>
          </div>
        </div>

        <p style={styles.copyright}>© 2026 Husky Student Savings. All rights reserved.</p>
      </div>
    </footer>
  );
}

function HomePage({ onBrowse }) {
  return (
    <main>
      <section style={{ ...styles.container, ...styles.heroTop }}>
        <p style={styles.smallText}>Browse verified deals, campus benefits, and local perks for Northeastern students.</p>
        <h1 style={styles.title}>Your Hub for Student Discounts in Seattle</h1>

        <button onClick={onBrowse} style={styles.primaryButton}>
          Browse Discounts
        </button>
      </section>

      <section style={styles.container}>
        <div style={styles.fullImageCard}>
          <img
            src={homeTop}
            alt="Husky Savings hero"
            style={styles.fullImage}
          />
        </div>
      </section>

      <section style={{ ...styles.container, ...styles.section }}>
        <h2 style={styles.sectionTitle}>What We Do</h2>
        <p style={styles.smallText}>How it helps:</p>
        <p style={styles.sectionDesc}>
          We help NU students discover verified student discounts and local offers across Seattle.
        </p>

        <div style={styles.threeCol}>
          <div style={styles.featureCard}>
            <p style={styles.smallText}>Why use it?</p>
            <p style={{ ...styles.sectionDesc, fontSize: "22px" }}>
              Save money and discover useful student perks near campus.
            </p>
          </div>
          <div style={styles.featureCard}>
            <p style={styles.smallText}>How it works</p>
            <p style={{ ...styles.sectionDesc, fontSize: "22px" }}>
              Search by brand, browse by category, and open each deal to learn more.
            </p>
          </div>
          <div style={styles.featureCard}>
            <p style={styles.smallText}>Who it’s for</p>
            <p style={{ ...styles.sectionDesc, fontSize: "22px" }}>
              Northeastern students in Seattle looking for centralized student savings.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.container}>
        <div style={styles.middleImageCard}>
          <img
            src={homeMiddle}
            alt="Middle section"
            style={styles.middleImage}
          />
        </div>
      </section>

      <section style={styles.budgetSection}>
        <h2 style={styles.budgetTitle}>Get More from the Same Budget</h2>
        <p style={styles.budgetSubtitle}>
          Small student benefits can make a real difference.
        </p>

        <div style={styles.budgetGrid}>
          <div style={styles.budgetCard}>Free museum days</div>
          <div style={styles.budgetCard}>Affordable food deals near campus</div>
          <div style={styles.budgetCard}>Student discounts on subscriptions</div>
        </div>

        <p style={styles.budgetNote}>
          Using several perks together can help students save more every day.
        </p>
      </section>

      <section style={{ ...styles.container, paddingBottom: "40px" }}>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Featured Deals</h2>
        <div style={styles.featuredDealsGrid}>
          {featuredDeals.map((deal) => (
            <div key={deal.brand} style={styles.featuredCard}>
              <div style={styles.featuredEmoji}>{deal.image}</div>
              <h3 style={{ fontSize: "28px", marginBottom: "10px" }}>{deal.brand}</h3>
              <p style={{ fontSize: "22px", lineHeight: 1.4 }}>{deal.title}</p>
              <p style={{ color: "#666", marginTop: "8px" }}>{deal.subtitle}</p>
              <p style={{ color: "#666", marginTop: "12px" }}>
                {deal.category} · {deal.location} · {deal.verified ? "Verified" : "Unverified"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.container}>
        <div style={styles.footerHeroCard}>
          <img
            src={homeFoot}
            alt="Share student deals"
            style={styles.footerHeroImage}
          />

          <div style={styles.footerHeroShade}></div>

          <div style={styles.footerHeroOverlay}>
            <h2 style={styles.footerHeroTitle}>Know a Student Deal? Share It With Us</h2>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf6cj9893lkCZSEnYhZO6Tvl035lDGk0FcpeNm8575fbrWOEg/viewform?usp=publish-editor"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button style={styles.footerHeroButton}>Submit a Discount</button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function DiscountCard({ deal }) {
  return (
    <div style={styles.dealCard}>
      <div style={styles.iconCircle}>
        <img src={deal.image} alt={deal.name} style={styles.logoImage} />
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
    </div>
  );
}

function DiscountsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    return allDeals.filter((deal) => {
      const matchesCategory = activeCategory === "All" || deal.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQuery =
        (deal.name || "").toLowerCase().includes(q) ||
        (deal.description || "").toLowerCase().includes(q) ||
        (deal.category || "").toLowerCase().includes(q) ||
        (deal.benefit_type || "").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pagedDeals = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  return (
    <main>
      <section style={{ ...styles.container, ...styles.section }}>
        <h1 style={styles.sectionTitle}>Discounts for Northeastern Students</h1>
        <p style={styles.sectionDesc}>
          Explore food, entertainment, education, and everyday student deals near campus.
        </p>

        <div style={styles.searchWrap}>
          <span style={{ color: "#666", fontSize: "18px" }}>🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search discounts, businesses, or categories"
            style={styles.input}
          />
        </div>

        <div style={styles.filters}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setPage(1);
              }}
              style={{
                ...styles.filterButton,
                ...(activeCategory === category ? styles.filterButtonActive : {}),
              }}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </section>

      <section style={styles.container}>
        <div style={styles.dealsGrid}>
          {pagedDeals.map((deal, index) => (
            <DiscountCard key={deal.id} deal={deal} />
          ))}
        </div>

        <div style={styles.pager}>
          <button
            style={styles.pagerButton}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            style={styles.pagerButton}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div style={styles.page}>
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {currentPage === "home" ? (
        <HomePage onBrowse={() => setCurrentPage("discounts")} />
      ) : (
        <DiscountsPage />
      )}
      <Footer />
    </div>
  );
}
