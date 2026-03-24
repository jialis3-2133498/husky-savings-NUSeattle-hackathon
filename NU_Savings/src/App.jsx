import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { styles } from "./styles/appStyles";

const DiscountsPage = lazy(() => import("./pages/DiscountsPage"));

function getPageFromHash() {
  return window.location.hash === "#discounts" ? "discounts" : "home";
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#home`);
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function navigate(page) {
    const nextHash = page === "discounts" ? "#discounts" : "#home";

    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={styles.page}>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {currentPage === "home" ? (
        <HomePage onBrowse={() => navigate("discounts")} />
      ) : (
        <Suspense
          fallback={
            <main>
              <section className="status-shell" style={styles.container}>
                <div className="status-panel">
                  <p className="status-kicker">Loading page</p>
                  <h2 className="status-title">Opening the full discounts directory.</h2>
                  <p className="status-text">
                    The first screen stays lighter now, and the directory loads only when needed.
                  </p>
                </div>
              </section>
            </main>
          }
        >
          <DiscountsPage />
        </Suspense>
      )}
      <Footer />
    </div>
  );
}
