import React, { useState } from "react";
import styles from "./RecommendNews.module.css";
import { ExternalLink, Search } from "lucide-react";

function RecommendNews({ recommended = [] }) {
  // 입력창 상태
  const [inputValue, setInputValue] = useState("");

  // 버튼 클릭 또는 엔터 → 입력값 콘솔 출력
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("AI 추천 키워드:", inputValue);
      // 나중에 실제 API 연동 시 여기에 fetch 추가
    }
  };

  return (
    <section className={styles.recommendSection}>
      <h3 className={styles.title}>AI 추천 뉴스</h3>
      {/* 🔹 입력창 & 버튼 */}
      <form className={styles.aiSearchBox} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="추천 받고 싶은 키워드를 입력하세요"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className={styles.aiInput}
        />
        <button type="submit" className={styles.aiBtn}>
          <Search size={18} />
        </button>
      </form>
      {/* 🔹 추천 뉴스 카드 리스트 */}
      <div className={styles.cardList}>
        {recommended.length === 0 ? (
          <div className={styles.emptyMsg}>추천 기사가 없습니다</div>
        ) : (
          recommended.map(item => (
            <div className={styles.card} key={item.id}>
              <img src={item.image} alt={item.title} className={styles.img} />
              <div className={styles.info}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {item.title}
                  <ExternalLink size={16} style={{ marginLeft: 4 }} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecommendNews;
