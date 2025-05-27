import React from 'react';
import { Clock, ExternalLink, Globe } from 'lucide-react';
import styles from './Front.module.css';

function NewsCard({ article }) {
  return (
    <div className={styles.newsCard}>
      <div className={styles.newsCardContent}>
        <div className={styles.newsImage}>
          <img src={article.image} alt={article.title} />
        </div>
        <div className={styles.newsDetails}>
          <div className={styles.newsMeta}>
            <span className={styles.newsCategory}>{article.category}</span>
            <div className={styles.newsTime}>
              <Clock size={16} /> {article.publishedAt}
            </div>
          </div>
          <h3 className={styles.newsTitle}>{article.title}</h3>
          <p className={styles.newsSummary}>{article.summary}</p>
          <div className={styles.newsFooter}>
            <div className={styles.newsSource}>
              <Globe size={16} />
            </div>
            <a href={article.url} className={styles.newsLink} target="_blank" rel="noopener noreferrer">
              자세히 보기 <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewsCard;
