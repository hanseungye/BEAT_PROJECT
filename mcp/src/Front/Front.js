import React, { useState, useEffect } from 'react';
import { Search, Clock, ExternalLink, Loader2, Globe, User } from 'lucide-react';
import styles from './Front.module.css';

function Front() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 더미 뉴스 데이터 (실제로는 MCP 서버에서 가져올 데이터)
  const mockNews = [
    {
      id: 1,
      title: "인공지능 기술의 최신 동향과 미래 전망",
      summary: "AI 기술이 다양한 산업 분야에서 혁신을 이끌고 있으며, 특히 자연어 처리와 컴퓨터 비전 기술의 발전이 주목받고 있습니다.",
      source: "테크뉴스",
      publishedAt: "2024-05-25 14:30",
      category: "기술",
      url: "#",
      imageUrl: "https://via.placeholder.com/300x200?text=AI+Technology"
    },
    {
      id: 2,
      title: "글로벌 경제 전망: 2024년 하반기 분석",
      summary: "전문가들은 2024년 하반기 글로벌 경제가 안정적인 성장세를 보일 것으로 전망한다고 분석했습니다.",
      source: "경제일보",
      publishedAt: "2024-05-25 13:15",
      category: "경제",
      url: "#",
      imageUrl: "https://via.placeholder.com/300x200?text=Economy"
    },
    {
      id: 3,
      title: "친환경 에너지 기술 혁신 가속화",
      summary: "재생 가능 에너지 기술의 발전으로 탄소 중립 목표 달성이 더욱 현실적으로 다가오고 있습니다.",
      source: "환경뉴스",
      publishedAt: "2024-05-25 12:45",
      category: "환경",  
      url: "#",
      imageUrl: "https://via.placeholder.com/300x200?text=Green+Energy"
    },
    {
      id: 4,
      title: "스포츠계 최신 소식: 올림픽 준비 현황",
      summary: "각국 선수들의 올림픽 준비 현황과 메달 전망에 대한 분석이 발표되었습니다.",
      source: "스포츠타임즈",
      publishedAt: "2024-05-25 11:20",
      category: "스포츠",
      url: "#",
      imageUrl: "https://via.placeholder.com/300x200?text=Olympics"
    },
    {
      id: 5,
      title: "정부24 디지털 혁신 정책 발표",
      summary: "정부가 국민 편의를 위한 디지털 서비스 혁신 방안을 발표했습니다. 원스톱 서비스 확대와 AI 기반 맞춤형 서비스 제공이 핵심입니다.",
      source: "정부24 뉴스",
      publishedAt: "2024-05-25 10:30",
      category: "정치",
      url: "#",
      imageUrl: "https://via.placeholder.com/300x200?text=Digital+Gov"
    },
    {
      id: 6,
      title: "교육 현장의 디지털 전환 가속화",
      summary: "코로나19 이후 교육 현장에서 디지털 기술 도입이 빠르게 진행되고 있으며, 새로운 교육 패러다임이 형성되고 있습니다.",
      source: "교육일보",
      publishedAt: "2024-05-25 09:15",
      category: "사회",
      url: "#",
      imageUrl: "https://via.placeholder.com/300x200?text=Education"
    }
  ];

  const categories = ['전체', '기술', '경제', '환경', '스포츠', '정치', '사회'];

  // 검색 함수 (실제로는 MCP 서버 호출)
  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    setLoading(true);

    // 실제 구현에서는 MCP 서버 API 호출
    setTimeout(() => {
      const filteredArticles = mockNews.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.summary.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase())
      );
      setArticles(filteredArticles);
      setLoading(false);
    }, 1000);
  };

  // 카테고리별 필터링
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === '전체') {
      setArticles(mockNews);
    } else {
      const filtered = mockNews.filter(article => article.category === category);
      setArticles(filtered);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    setArticles(mockNews);
  }, []);

  const NewsCard = ({ article }) => (
    <div className={styles.newsCard}>
      <div className={styles.newsCardContent}>
        <div className={styles.newsImage}>
          <img 
            src={article.imageUrl} 
            alt={article.title}
          />
        </div>
        <div className={styles.newsDetails}>
          <div className={styles.newsMeta}>
            <span className={styles.newsCategory}>
              {article.category}
            </span>
            <div className={styles.newsTime}>
              <Clock size={16} />
              {article.publishedAt}
            </div>
          </div>
          <h3 className={styles.newsTitle}>
            {article.title}
          </h3>
          <p className={styles.newsSummary}>
            {article.summary}
          </p>
          <div className={styles.newsFooter}>
            <div className={styles.newsSource}>
              <Globe size={16} />
              {article.source}
            </div>
            <a 
              href={article.url}
              className={styles.newsLink}
            >
              자세히 보기
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

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
          <div className={styles.searchBar}>
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="뉴스 검색어를 입력하세요..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className={styles.searchButton}
            >
              {loading ? (
                <Loader2 className={styles.spinner} size={20} />
              ) : (
                '검색'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className={styles.categorySection}>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterByCategory(category)}
                className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
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
