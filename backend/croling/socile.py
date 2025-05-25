import requests

# '사회' 한글 키워드, 한국 뉴스 중심(language=ko)
url = "https://newsapi.org/v2/everything?q=사회&language=ko&apiKey=1f8fb72994264a9ebb2d84a25b567b7a"

resp = requests.get(url)
data = resp.json()

# 앞 10개 기사만 추출
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

# 배열 내용 출력
for idx, news in enumerate(society_news, 1):
    print(f"[{idx}] {news['title']}")
    print(f"URL: {news['url']}")
    print(f"요약: {news['summary']}")
    print(f"이미지: {news['image']}")
    print(f"날짜: {news['publishedAt']}")
    print("-" * 50)
