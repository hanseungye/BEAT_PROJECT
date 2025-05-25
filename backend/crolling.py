import os
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

base_url = "https://media.naver.com/press/015?sid=100"
driver.get(base_url)

WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "a.press_edit_news_link._es_pc_link[data-pc-link]"))
)

articles = driver.find_elements(By.CSS_SELECTOR, "a.press_edit_news_link._es_pc_link[data-pc-link]")
urls = [a.get_attribute('href') for a in articles]
print(f"총 {len(urls)}개 기사 발견")

# 이미지 저장 폴더
os.makedirs("news_images", exist_ok=True)

for idx, url in enumerate(urls):
    try:
        driver.execute_script("window.open(arguments[0]);", url)
        driver.switch_to.window(driver.window_handles[-1])
        time.sleep(3)
        soup = BeautifulSoup(driver.page_source, "html.parser")

        # 제목
        title_tag = soup.select_one('.media_end_head_headline, .NcutHeadline')
        title = title_tag.get_text(strip=True) if title_tag else "제목 없음"

        # 본문 전체
        content_tag = soup.select_one('#newsct_article, .NcutContent')
        content = content_tag.get_text(separator="\n", strip=True) if content_tag else "본문 없음"

        # 대표 이미지 (1. id='img1' 우선, 2. 기존 방식)
        img_tag = soup.find('img', id='img1')
        if not img_tag:
            img_tag = soup.select_one('.newsct_article_img img, .NcutPhoto img')
        image_url = img_tag['src'] if img_tag and img_tag.has_attr('src') else ""

        # 이미지 파일 저장 (jpg 확장자)
        img_filename = ""
        if image_url:
            try:
                img_data = requests.get(image_url).content
                img_filename = f"news_images/news_{idx+1}.jpg"
                with open(img_filename, "wb") as f:
                    f.write(img_data)
            except Exception as ie:
                print("이미지 저장 실패:", ie)

        # 콘솔 출력
        print(f"[{idx+1}] 제목: {title}")
        print(f"URL: {url}")
        print(f"이미지 저장 경로: {img_filename if img_filename else '이미지 없음'}")
        print("본문 내용:")
        print(content)
        print("="*70)

        driver.close()
        driver.switch_to.window(driver.window_handles[0])
        time.sleep(4)

    except Exception as e:
        print("에러:", e)
        if len(driver.window_handles) > 1:
            driver.close()
            driver.switch_to.window(driver.window_handles[0])
        continue

driver.quit()
