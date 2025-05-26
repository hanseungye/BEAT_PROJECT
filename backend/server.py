from db.db import get_connection,select_news,insert_news # ← db 폴더 내 db.py에서 함수 import
from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/")
def check_db_connection():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        result = cur.fetchone()
        cur.close()
        conn.close()
        return jsonify({"message": "데이터베이스 연결 성공", "result": result})
    except Exception as e:
        return jsonify({"message": "연결 실패", "error": str(e)}), 500
@app.route("/economy",methods = ['GET'])
def get_economy():
    try:
        data = select_news("economy") # 테이블을 문자열로
        print(data)
        # 리스트를 json으로 반환.
        return jsonify({"data":data}),200
    except Exception as e:
        return jsonify({"message":"연결 실패","error":str(e)}),500
@app.route("/environment",methods = ['GET'])
def get_env():
    try:
        data = select_news('environment_news')
        print(data)
        return jsonify({"data":data}),200
    except Exception as e:
        return jsonify({"message":"연결 실패","error":str(e)}),500
@app.route("/police",methods = ['GET'])
def get_police():
    try:
        data = select_news("police_news")
        print(data)
        return jsonify({"data":data}),200
    except Exception as e:
        return jsonify({"message":"연결 실패","error":str(e)}),500
    
@app.route("/society",methods = ['GET'])
def get_society():
    try:
        data = select_news("society_news")
        print(data)
        return jsonify({"data":data}),200
    except Exception as e:
        return jsonify({"message":"연결 실패","error":str(e)}),500
    
@app.route("/sport",methods = ['GET'])
def get_sport():
    try:
        data = select_news("sport_news")
        print(data)
        return jsonify({"data":data}),200
    except Exception as e:
        return jsonify({"message":"연결 실패","error":str(e)}),500
@app.route("/technoly",methods = ['GET'])
def get_technoly():
    try:
        data = select_news("technology_news")
        print(data)
        return jsonify({"data":data}),200
    except Exception as e:
        return jsonify({"message":"연결 실패","error":str(e)}),500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
