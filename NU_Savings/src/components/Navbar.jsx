import { useMemo, useState } from "react";
import { navigationItems } from "../data/navigation";
import { useNavbarVisibility } from "../hooks/useNavbarVisibility";
import { styles } from "../styles/appStyles";

const siteTitle = "Husky Student Savings";

export default function Navbar({ currentPage, onNavigate, onContactNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isNavbarVisible = useNavbarVisibility({ paused: isMobileMenuOpen });

  const navigationStateClassName = useMemo(() => {
    return [
      "site-nav",
      isNavbarVisible ? "site-nav--visible" : "site-nav--hidden",
      isMobileMenuOpen ? "site-nav--menu-open" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }, [isMobileMenuOpen, isNavbarVisible]);

  function handleNavigationItemClick(item) {
    setIsMobileMenuOpen(false);

    if (item.type === "page") {
      onNavigate(item.page);
      return;
    }
    
    if (item.type === "link") {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.action === "contact") {
      onContactNavigate();
    }
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((currentValue) => !currentValue);
  }

  return (
    <header className={navigationStateClassName} style={styles.nav}>
      <div style={styles.container}>
        <div className="nav-inner nav-inner--desktop" style={styles.navInner}>
          {navigationItems.map((item) => (
            <button
              key={item.key}
              className="nav-button"
              onClick={() => handleNavigationItemClick(item)}
              style={{
                ...styles.navButton,
                ...(item.type === "page" && currentPage === item.page ? styles.navButtonActive : {}),
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mobile-nav">
          <button
            className="mobile-nav-bar"
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="mobile-nav-spacer" aria-hidden="true" />
            <span className="mobile-nav-title" aria-label={siteTitle}>
              {siteTitle}
            </span>
            <span className="mobile-nav-spacer" aria-hidden="true" />
          </button>

          <div
            className={`mobile-nav-menu ${isMobileMenuOpen ? "mobile-nav-menu--open" : ""}`}
            aria-hidden={!isMobileMenuOpen}
          >
            {navigationItems.map((item) => (
              <button
                key={item.key}
                className={`mobile-nav-item ${
                  item.type === "page" && currentPage === item.page ? "mobile-nav-item--active" : ""
                }`}
                type="button"
                onClick={() => handleNavigationItemClick(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
