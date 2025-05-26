import requests
from db.db import insert_news
def crawl_society_news():
    url = "https://newsapi.org/v2/everything?q=사회&language=ko&apiKey=1f8fb72994264a9ebb2d84a25b567b7a"
    resp = requests.get(url)
    data = resp.json()
    articles = data.get("articles", [])[:10]

    society_news = []
    for article in articles:
        news_item = {
            "title": article.get("title", ""),
            "url": article.get("url", ""),
            "summary": article.get("description", ""),
            "image": article.get("urlToImage", ""),
            "publishedAt": article.get("publishedAt", "")
        }
        society_news.append(news_item)
    for news in society_news:
        insert_news(
            "society_news",
            news["title"],
            news["url"],
            news["summary"],
            news["image"],
            news["publishedAt"]
        )
    return society_news

# 함수 실행 예시
if __name__ == "__main__":
    news_list = crawl_society_news()
    for idx, news in enumerate(news_list, 1):
        print(f"[{idx}] {news['title']}")
        print(f"URL: {news['url']}")
        print(f"요약: {news['summary']}")
        print(f"이미지: {news['image']}")
        print(f"날짜: {news['publishedAt']}")
        print("-" * 50)
