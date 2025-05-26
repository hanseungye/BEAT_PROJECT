# db.py
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT")
    )
def select_news(table):
    conn = get_connection() # 데이터베이스 연결
    cur = conn.cursor() # 서버 측 데이터베이스와 연결
    query = f"SELECT id, title, url, summary, image, published_at FROM {table} ORDER BY id DESC"
    cur.execute(query) # 데이터베이스 쿼리문을 실행하는 명령어
    rows = cur.fetchall() # 튜플로 반환
    print(rows)
    columns = [desc[0] for desc in cur.description] # 투플의 0번째 행을 columns에 저장.
    result = [dict(zip(columns,row)) for row in rows]
    cur.close()
    conn.close()
    return result

def insert_news(table, title, url, summary, image, published_at):
    conn = get_connection()
    cur = conn.cursor()
    query = f"""
    INSERT INTO {table} (title, url, summary, image, published_at)
    VALUES (%s, %s, %s, %s, %s)
    """
    cur.execute(query, (title, url, summary, image, published_at))
    conn.commit()
    cur.close()
    conn.close()
