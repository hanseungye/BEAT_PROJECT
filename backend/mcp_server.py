from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/ai-search/", methods=["POST"])
def mcp_query():
    data = request.get_json()
    query = data.get("query", "")
    result = f"<b>'{query}'</b>에 대한 추천<br /><ul><li>민원 신청/안내 ...</li></ul>"
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(port=8000)
