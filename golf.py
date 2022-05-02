from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://test:sparta@cluster0.wyemi.mongodb.net/Cluster0?retryWrites=true&w=majority',
                     tlsCAFile=ca)
db = client.dbsparta


@app.route('/')
def home():
    return render_template('golf.html')


@app.route("/clubs", methods=["GET"])
def clubs_get():
    clubs = list(db.clubs.find({}, {'_id': False}))
    return jsonify({'clubs': clubs})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5100, debug=True)
