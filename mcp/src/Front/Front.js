import React, { useState } from "react";
import styles from "./Front.module.css";

function Front() {
  // 드롭다운 상태
  const [openDropdown, setOpenDropdown] = useState(null);

  // 공지사항
  const notices = [
    { title: "2023년 정부24 서비스 개선 안내", date: "2023.05.15" },
    { title: "2023년 정부24 서비스 개선 안내", date: "2023.05.15" },
    { title: "2023년 정부24 서비스 개선 안내", date: "2023.05.15" },
    { title: "2023년 정부24 서비스 개선 안내", date: "2023.05.15" },
  ];

  // 보도자료
  const news = [
    { title: "디지털 정부 혁신 방안 발표", date: "2023.05.10" },
    { title: "디지털 정부 혁신 방안 발표", date: "2023.05.10" },
    { title: "디지털 정부 혁신 방안 발표", date: "2023.05.10" },
    { title: "디지털 정부 혁신 방안 발표", date: "2023.05.10" },
  ];
  // 키워드 목록
  const tabNames = ["출생/영유아", "교육/취업", "결혼/육아", "노년/요양", "사망/상속"];

  // AI 에이전트 추천 박스 상태
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState("");

  // MCP 연동 대신 임시 더미
  const handleAiSearch = async() => {
    if (!aiQuery) {
      setAiResult("검색어를 입력해 주세요.");
      return;
    }
    try{
      const response = await fetch("http://localhost:8000/ai-search/",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query:aiQuery}),
      });
      const data = await response.json();
      setAiResult(data.result);
    } catch(error){
      setAiResult("오류가 발생했습니다.");
      console.error("에러 메시지",error);
    }
  };

  return (
    <div className={styles.root}>
      {/* 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.logo}>정부24</span>
          <span className={styles.subtitle}>국민을 위한 정부서비스</span>
          <div className={styles.utils}>
            <span>🔔 알림</span>
            <span>한국어 ▼</span>
          </div>
        </div>
       <nav className={styles.nav}>
  {["서비스", "정책정보", "기관정보", "민원신청", "뉴스/소식"].map((menu, idx) => (
    <div
      key={menu}
      className={styles.navItem}
      onMouseEnter={() => setOpenDropdown(menu)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      {menu} ▼
      {openDropdown === menu && (
        <div className={styles.dropdown}>
          {idx === 0 && (
            <>
              <div className={styles.dropdownTitle}>서비스 카테고리</div>
              <div>주민등록</div>
              <div>가족관계증명</div>
              <div>부동산</div>
              <div>세금</div>
              <div>자동차</div>
              <div>건강/의료</div>
            </>
          )}
          {idx === 1 && (
            <>
              <div className={styles.dropdownTitle}>정책 분야</div>
              <div>복지</div>
              <div>교육</div>
              <div>주택/부동산</div>
              <div>고용/노동</div>
              <div>환경</div>
              <div>문화/관광</div>
            </>
          )}
          {idx === 2 && (
            <>
              <div className={styles.dropdownTitle}>기관 분류</div>
              <div>중앙행정기관</div>
              <div>지방자치단체</div>
              <div>공공기관</div>
              <div>사법기관</div>
              <div>입법기관</div>
              <div>헌법기관</div>
            </>
          )}
          {idx === 3 && (
            <>
              <div className={styles.dropdownTitle}>민원 유형</div>
              <div>민원신청</div>
              <div>민원조회</div>
              <div>자주 찾는 민원</div>
              <div>생활민원 일괄서비스</div>
              <div>민원 처리기준표</div>
              <div>민원 신고센터</div>
            </>
          )}
          {idx === 4 && (
            <>
              <div className={styles.dropdownTitle}>뉴스 카테고리</div>
              <div>공지사항</div>
              <div>보도자료</div>
              <div>정책뉴스</div>
              <div>이벤트</div>
              <div>홍보자료</div>
              <div>정부간행물</div>
            </>
          )}
        </div>
      )}
    </div>
  ))}
</nav>

      </header>

      {/* 메인 검색 */}
      <section className={styles.mainSearchSection}>
        <h1 className={styles.mainTitle}>국민을 위한 정부 서비스 포털</h1>
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="서비스 또는 민원을 검색해 보세요"
          />
          <button className={styles.searchBtn}>검색</button>
        </div>
      </section>

      {/* 생애주기별 서비스 (탭) */}
      <section className={styles.tabSection}>
        <div className={styles.tabBar}>
          {tabNames.map(tab => (
            <div className={styles.tab} key={tab}>{tab}</div>
          ))}
        </div>
        <div className={styles.tabCards}>
          {[1,2,3].map(n => (
            <div key={n} className={styles.card}>
              <div className={styles.cardTitle}>서비스 제목</div>
              <div className={styles.cardDesc}>서비스에 대한 간략한 설명이 들어갑니다. 이 서비스는 국민들에게 필요한 정보를 제공합니다.</div>
              <button className={styles.moreBtn}>자세히 보기 →</button>
            </div>
          ))}
        </div>
      </section>

      {/* 공지/보도자료/AI 에이전트 */}
      <section className={styles.noticeSection}>
        <div className={styles.noticeWrap2}>
          {/* 공지사항 */}
          <div>
            <div className={styles.noticeTitle}>공지사항 <span className={styles.more}>더보기 →</span></div>
            <ul>
              {notices.map((n, i) => (
                <li className={styles.noticeItem} key={i}>
                  <span className={styles.noticeText}>{n.title}</span>
                  <span className={styles.noticeDate}>{n.date}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* 보도자료 */}
          <div>
            <div className={styles.noticeTitle}>보도자료 <span className={styles.more}>더보기 →</span></div>
            <ul>
              {news.map((n, i) => (
                <li className={styles.noticeItem} key={i}>
                  <span className={styles.noticeText}>{n.title}</span>
                  <span className={styles.noticeDate}>{n.date}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* AI 에이전트 추천 박스 */}
          <div className={styles.aiBox}>
            <div className={styles.noticeTitle}>AI 추천 메뉴</div>
            <input
              type="text"
              className={styles.aiInput}
              value={aiQuery}
              placeholder="궁금한 메뉴/서비스를 입력하세요"
              onChange={e => setAiQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAiSearch()} // 엔터키를 눌렀을 때 handleAiSearch로 이동동
            />
            <button className={styles.aiBtn} onClick={handleAiSearch}>AI 추천</button>
            {aiResult && (
              <div
                className={styles.aiResult}
                dangerouslySetInnerHTML={{ __html: aiResult }}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Front;
