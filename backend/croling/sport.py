import requests
from db.db import insert_news
def crawl_sports_news():
    # '스포츠' 한글 키워드, 한국어 뉴스 위주로 language=ko 설정
    url = "https://newsapi.org/v2/everything?q=스포츠&language=ko&apiKey=1f8fb72994264a9ebb2d84a25b567b7a"
    resp = requests.get(url)
    data = resp.json()

    # 앞 10개 기사만 추출
    articles = data.get("articles", [])[:10]

    sports_news = []
    for article in articles:
        news_item = {
            "title": article.get("title", ""),
            "url": article.get("url", ""),
            "summary": article.get("description", ""),
            "image": article.get("urlToImage", ""),
            "publishedAt": article.get("publishedAt", "")
        }
        sports_news.append(news_item)
    for news in sports_news:
        insert_news(
            "sport_news",
            news["title"],
            news["url"],
            news["summary"],
            news["image"],
            news["publishedAt"]
        )
    return sports_news

# 배열 내용 출력(테스트용)
if __name__ == "__main__":
    sports_news = crawl_sports_news()
    for idx, news in enumerate(sports_news, 1):
        print(f"[{idx}] {news['title']}")
        print(f"URL: {news['url']}")
        print(f"요약: {news['summary']}")
        print(f"이미지: {news['image']}")
        print(f"날짜: {news['publishedAt']}")
        print("-" * 50)
