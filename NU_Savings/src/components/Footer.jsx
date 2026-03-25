import siteContent from "../data/siteContent.json";
import { resolvePublicAsset } from "../lib/assets";
import { styles } from "../styles/appStyles";

export default function Footer() {
  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerIcons}>
          {siteContent.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={styles.socialLink}
            >
              <img
                src={resolvePublicAsset(link.icon)}
                alt={link.label}
                style={styles.socialIcon}
                loading="lazy"
                decoding="async"
              />
            </a>
          ))}
        </div>

        <div className="footer-grid" style={styles.footerGrid}>
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
