import siteContent from "../data/siteContent.json";
import { resolvePublicAsset } from "../lib/assets";
import { styles } from "../styles/appStyles";

const featuredDeals = siteContent.featuredDeals;
const homeTop = resolvePublicAsset(siteContent.homeImages.hero);
const homeMiddle = resolvePublicAsset(siteContent.homeImages.middle);
const homeFoot = resolvePublicAsset(siteContent.homeImages.footer);

export default function HomePage({ onBrowse }) {
  return (
    <main>
      <section style={{ ...styles.container, ...styles.heroTop }}>
        <p style={styles.smallText}>
          Browse verified deals, campus benefits, and local perks for Northeastern students.
        </p>
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
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section className="deferred-section" style={{ ...styles.container, ...styles.section }}>
        <h2 style={styles.sectionTitle}>What We Do</h2>
        <p style={styles.smallText}>How it helps:</p>
        <p style={styles.sectionDesc}>
          We help NU students discover verified student discounts and local offers across Seattle.
        </p>

        <div className="three-column-grid" style={styles.threeCol}>
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

      <section className="deferred-section" style={styles.container}>
        <div style={styles.middleImageCard}>
          <img
            src={homeMiddle}
            alt="Seattle student savings examples"
            style={styles.middleImage}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="deferred-section" style={styles.budgetSection}>
        <h2 style={styles.budgetTitle}>Get More from the Same Budget</h2>
        <p style={styles.budgetSubtitle}>Small student benefits can make a real difference.</p>

        <div className="budget-grid" style={styles.budgetGrid}>
          <div style={styles.budgetCard}>Free museum days</div>
          <div style={styles.budgetCard}>Affordable food deals near campus</div>
          <div style={styles.budgetCard}>Student discounts on subscriptions</div>
        </div>

        <p style={styles.budgetNote}>
          Using several perks together can help students save more every day.
        </p>
      </section>

      <section className="deferred-section" style={{ ...styles.container, paddingBottom: "40px" }}>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Featured Deals</h2>
        <div className="featured-deals-grid" style={styles.featuredDealsGrid}>
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

      <section className="deferred-section" style={styles.container}>
        <div style={styles.footerHeroCard}>
          <img
            src={homeFoot}
            alt="Share student deals"
            style={styles.footerHeroImage}
            loading="lazy"
            decoding="async"
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
