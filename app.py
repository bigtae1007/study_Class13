from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://test:sparta@cluster0.zaev4.mongodb.net/Cluster0?retryWrites=true&w=majority',tlsCAfile=ca)
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/bikeroad', methods=['GET'])
def web_bikeroad_get():
    record_list = list(db.bikeroad.find({}, {'_id': False}))
    return jsonify({'records':record_list})

@app.route('/bikeroad', methods=['POST'])
def web_bikeroad_post():
    name_receive = request.form['name_give']
    road_receive = request.form['road_give']
    difficult_receive = request.form['difficult_give']
    doc = {

        'name':name_receive,
        'road':road_receive,
        'difficult':difficult_receive
    }

    db.bikeroad.insert_one(doc)

    return jsonify({'msg':'기록 완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)