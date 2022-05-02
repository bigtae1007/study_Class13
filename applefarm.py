from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://test:sparta@cluster0.s5uyx.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta


@app.route('/')
def home():
    return render_template('applefarm.html')

@app.route('/order', methods=['POST'])
def order_post():
    goods_receive = request.form['goods_give']
    num_receive = request.form['num_give']
    name_receive = request.form['name_give']
    address_receive = request.form['address_give']
    phone_receive = request.form['phone_give']

    doc = {
        'goods':goods_receive,
        'num':num_receive,
        'name':name_receive,
        'address':address_receive,
        'phone':phone_receive
    }

    db.applefarm.insert_one(doc)

    return jsonify({'msg': '주문 완료!'})

@app.route('/order', methods=['GET'])
def order_get():
    orders_list = list(db.applefarm.find({}, {'_id': False}))
    return jsonify({'orders': orders_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)