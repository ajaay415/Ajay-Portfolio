"""Optional Flask static server. Run with: python app.py"""
from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder=".", static_url_path="")

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def serve_file(path):
    return send_from_directory(".", path)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", 5000)), debug=True)