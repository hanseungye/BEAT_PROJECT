import React from 'react';
import styles from './Front.module.css';

function CategoryFilter({ categories, selectedCategory, onCategorySelect }) {
  return (
    <div className={styles.categoryFilters}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
export default CategoryFilter;
