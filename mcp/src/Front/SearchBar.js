import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import styles from './Front.module.css';

function SearchBar({ searchQuery, setSearchQuery, loading, onSearch }) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInputWrapper}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="뉴스 검색어를 입력하세요..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>
      <button
        onClick={onSearch}
        disabled={loading}
        className={styles.searchButton}
      >
        {loading ? <Loader2 className={styles.spinner} size={20} /> : '검색'}
      </button>
    </div>
  );
}
export default SearchBar;
