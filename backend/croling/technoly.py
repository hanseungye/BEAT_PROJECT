import requests

url = "https://newsapi.org/v2/everything?q=technology&apiKey=1f8fb72994264a9ebb2d84a25b567b7a"
resp = requests.get(url)
data = resp.json()


# 앞 10개만 추출
articles = data.get("articles", [])[:10]

# 배열에 담기
tech_news = []
for article in articles:
    news_item = {
        "title": article.get("title", ""),
        "url": article.get("url", ""),
        "summary": article.get("description", ""),
        "image": article.get("urlToImage", ""),
        "publishedAt": article.get("publishedAt", "")
    }
    tech_news.append(news_item)

# 배열 내용 출력
for idx, news in enumerate(tech_news, 1):
    print(f"[{idx}] {news['title']}")
    print(f"URL: {news['url']}")
    print(f"요약: {news['summary']}")
    print(f"이미지: {news['image']}")
    print(f"날짜: {news['publishedAt']}")
    print("-" * 50)
