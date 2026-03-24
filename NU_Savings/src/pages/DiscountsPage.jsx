import { useEffect, useMemo, useState } from "react";
import DiscountCard from "../components/DiscountCard";
import { categories, categoryLabels } from "../constants/deals";
import { loadDeals } from "../lib/dealsApi";
import { styles } from "../styles/appStyles";

export default function DiscountsPage() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDeals() {
      try {
        setIsLoading(true);
        setError("");
        const nextDeals = await loadDeals({ signal: controller.signal });
        setDeals(nextDeals);
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        setError("We could not load the latest discounts right now. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDeals();

    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesCategory = activeCategory === "All" || deal.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        (deal.name || "").toLowerCase().includes(normalizedQuery) ||
        (deal.description || "").toLowerCase().includes(normalizedQuery) ||
        (deal.category || "").toLowerCase().includes(normalizedQuery) ||
        (deal.benefit_type || "").toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, deals, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pagedDeals = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <main>
      <section style={{ ...styles.container, ...styles.section }}>
        <h1 style={styles.sectionTitle}>Discounts for Northeastern Students</h1>
        <p style={styles.sectionDesc}>
          Explore food, entertainment, education, and everyday student deals near campus.
        </p>

        <div style={styles.searchWrap}>
          <span aria-hidden="true" style={{ color: "#666", fontSize: "18px" }}>
            🔍
          </span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search discounts, businesses, or categories"
            style={styles.input}
            aria-label="Search deals"
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

      {isLoading ? (
        <section className="status-shell" style={styles.container}>
          <div className="status-panel">
            <p className="status-kicker">Loading discounts</p>
            <h2 className="status-title">Pulling the latest deals into the page.</h2>
            <p className="status-text">
              The home page stays light, and the full directory loads only when someone opens it.
            </p>
          </div>
        </section>
      ) : null}

      {!isLoading && error ? (
        <section className="status-shell" style={styles.container}>
          <div className="status-panel">
            <p className="status-kicker">Directory unavailable</p>
            <h2 className="status-title">The discounts list did not load cleanly.</h2>
            <p className="status-text">{error}</p>
            <button
              className="status-button"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reload page
            </button>
          </div>
        </section>
      ) : null}

      {!isLoading && !error ? (
        <section className="deferred-section" style={styles.container}>
          <div className="deals-grid" style={styles.dealsGrid}>
            {pagedDeals.map((deal) => (
              <DiscountCard key={deal.id} deal={deal} />
            ))}
          </div>

          {!filtered.length ? (
            <div className="status-panel status-panel--compact">
              <p className="status-kicker">No results</p>
              <p className="status-text">
                Try a different keyword or switch back to another category.
              </p>
            </div>
          ) : null}

          <div style={styles.pager}>
            <button
              style={styles.pagerButton}
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              style={styles.pagerButton}
              onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
