import { styles } from "../styles/appStyles";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = "Prev",
  nextLabel = "Next",
}) {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <nav aria-label="Pagination" style={styles.pager}>
      {hasPreviousPage ? (
        <button
          type="button"
          style={styles.pagerButton}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {previousLabel}
        </button>
      ) : (
        <span className="pager-spacer" aria-hidden="true" />
      )}

      <span className="pager-status">
        {currentPage} / {totalPages}
      </span>

      {hasNextPage ? (
        <button
          type="button"
          style={styles.pagerButton}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {nextLabel}
        </button>
      ) : (
        <span className="pager-spacer" aria-hidden="true" />
      )}
    </nav>
  );
}
