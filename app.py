from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

import requests
from bs4 import BeautifulSoup


@app.route('/')
def home():
    return render_template('homepage.html')

# 박태형
client_btae = MongoClient('mongodb+srv://test:sparta@Cluster0.faljs.mongodb.net/Cluster0?retryWrites=true&w=majority')
db_tae = client_btae.food


@app.route('/food')
def food_home():
    return render_template('food.html')


@app.route("/food", methods=["POST"])
def show_food():
    url_receive = request.form['url_give']
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    places = soup.select('#loc-main-section-root > section > div > div.place_section_content > ul > li')
    addressList = []
    nameList = []

    for place in places:
        name = place.select_one('div._3ZU00._1rBq3 > a:nth-child(1) > div > div > span._3Apve').text
        address = place.select_one('div._3ZU00._1rBq3 > div._1B9G6 > div > span > a > span._3hCbH').text
        nameList.append(name)
        addressList.append(address)
    doc = {
        'nameList': nameList,
        'addressList': addressList
    }
    return jsonify(doc)

@app.route("/food_save", methods=["POST"])
def save_food():
    option_receive = request.form['option_give']
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']
    address_receive = request.form['address_give']
    name_receive = request.form['name_give']
    doc = {
        'name': name_receive,
        'address': address_receive,
        'star': star_receive,
        'comment' : comment_receive,
        'option' : option_receive
    }
    db_tae.food_place.insert_one(doc)
    return jsonify('저장 완료 ! ')

@app.route('/food/list_food')
def save_food_home():
    return render_template('show_food.html')

@app.route("/list_food", methods=["GET"])
def homework_get():
    all_places = list(db_tae.food_place.find({},{'_id':False}))
    return jsonify(all_places)

    # doc = {
    #     'name': name_receive,
    #     'comment': comment_receive
    # }
    # db.users.insert_one(doc)
# @app.route("/homework", methods=["GET"])
# def homework_get():
#     all_users = list(db.users.find({},{'_id':False}))
#     return jsonify(all_users)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)