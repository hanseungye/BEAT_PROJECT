// src/Front/Front.js
import React, { useState, useEffect } from 'react';
import { User, Search, Loader2 } from 'lucide-react';
import styles from './Front.module.css';

import NewsCard from './NewsCard';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';

function Front() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [economy, setEconomy] = useState([]);
  const [environment, setEnvironment] = useState([]);
  const [police, setPolice] = useState([]);
  const [society, setSociety] = useState([]);
  const [sport, setSport] = useState([]);

  useEffect(() => {
    const urlKeyword = ["economy", "environment", "police", "society", "sport"];
    const setFns = {
      economy: setEconomy,
      environment: setEnvironment,
      police: setPolice,
      society: setSociety,
      sport: setSport,
    };

    urlKeyword.forEach((keyword) => {
      fetch(`http://localhost:5000/${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          const articles = data.data.map(item => ({
            id: item.id,
            title: item.title,
            image: item.image,
            publishedAt: item.published_at,
            url: item.url,
            summary: item.summary,
            category: keyword,
          }));
          setFns[keyword](articles);
        })
        .catch((error) => {
          console.error(`${keyword} 오류:`, error);
        });
    });
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === '전체') {
      setArticles([
        ...economy,
        ...environment,
        ...police,
        ...society,
        ...sport,
      ]);
    } else if (category === "경제") {
      setArticles(economy);
    } else if (category === "환경") {
      setArticles(environment);
    } else if (category === "경찰") {
      setArticles(police);
    } else if (category === "사회") {
      setArticles(society);
    } else if (category === "스포츠") {
      setArticles(sport);
    }
  };

  useEffect(() => {
    setArticles([
      ...economy,
      ...environment,
      ...police,
      ...society,
      ...sport,
    ]);
  }, [economy, environment, police, society, sport]);

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const filteredArticles = articles.filter(article =>
        (article.title && article.title.toLowerCase().includes(query.toLowerCase())) ||
        (article.summary && article.summary.toLowerCase().includes(query.toLowerCase())) ||
        (article.category && article.category.toLowerCase().includes(query.toLowerCase()))
      );
      setArticles(filteredArticles);
      setLoading(false);
    }, 1000);
  };

  const categories = ['전체', '경제', '환경', '스포츠', '경찰', '사회'];

  return (
    <div className={styles.root}>
      {/* 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>AI 뉴스피드</h1>
          <div className={styles.headerUser}>
            <User size={20} />
            <span>사용자</span>
          </div>
        </div>
      </header>

      {/* 검색 바 */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            onSearch={() => handleSearch()}
          />
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className={styles.categorySection}>
        <div className={styles.categoryContainer}>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={filterByCategory}
          />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className={styles.mainContent}>
        {loading ? (
          <div className={styles.loadingWrapper}>
            <Loader2 className={`${styles.spinner} ${styles.large}`} size={32} />
            <span>뉴스를 불러오는 중...</span>
          </div>
        ) : (
          <>
            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>
                {searchQuery ? `"${searchQuery}" 검색 결과` : `${selectedCategory} 뉴스`}
              </h2>
              <p className={styles.contentSubtitle}>
                총 {articles.length}개의 기사를 찾았습니다.
              </p>
            </div>

            {articles.length === 0 ? (
              <div className={styles.noResults}>
                <Search size={48} />
                <h3>검색 결과가 없습니다</h3>
                <p>다른 검색어를 시도하거나 카테고리를 변경해 보세요.</p>
              </div>
            ) : (
              <div className={styles.newsGrid}>
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      {/* 푸터 */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2024 AI 뉴스피드. MCP 서버 기반 뉴스 검색 서비스</p>
        </div>
      </footer>
    </div>
  );
}

export default Front;
