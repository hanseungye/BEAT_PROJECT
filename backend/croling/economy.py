import requests
url = "https://newsapi.org/v2/everything?q=%EA%B2%BD%EC%A0%9C&language=ko&apiKey=1f8fb72994264a9ebb2d84a25b567b7a"
resp = requests.get(url)
data = resp.json()

articles = data.get("articles", [])[:10]

economy = []

for article in articles:
    news_item = {
        "title": article.get("title", ""),
        "url": article.get("url", ""),
        "summary": article.get("description", ""),
        "image": article.get("urlToImage", ""),
        "publishedAt": article.get("publishedAt", "")
    }
    economy.append(news_item)  # <-- 이 부분!

for idx, news in enumerate(economy, 1):
    print(f"[{idx}] {news['title']}")
    print(f"URL: {news['url']}")
    print(f"요약: {news['summary']}")
    print(f"이미지: {news['image']}")
    print(f"날짜: {news['publishedAt']}")
    print("-" * 50)
