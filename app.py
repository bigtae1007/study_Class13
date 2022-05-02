import json
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

import requests
from bs4 import BeautifulSoup

import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://test:sparta@cluster0.zaev4.mongodb.net/Cluster0?retryWrites=true&w=majority',tlsCAfile=ca)
db = client.dbsparta

@app.route('/road')
def home1():
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


@app.route('/')
def home():
    return render_template('homepage.html')

# 박태형
client_btae = MongoClient('mongodb+srv://test:sparta@Cluster0.faljs.mongodb.net/Cluster0?retryWrites=true&w=majority')
db_tae = client_btae.food

# 메인페이지 & 저장페이지
@app.route('/food')
def food_home():
    return render_template('food.html')


@app.route("/food", methods=["POST"])
def show_food():
    #url 가져오기
    url_receive = request.form['url_give']
    # 크롤링 준비
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    places = soup.select('#loc-main-section-root > section > div > ul > li')
    #주소, 이름 값 받을 빈 리스트 생성
    addressList = []
    nameList = []

#반복문을 통해 각각의 값 리스트 추가
    for place in places:
        name = place.select_one('div._3ZU00._1rBq3 > a:nth-child(1) > div > div > span._3Apve').text
        address = place.select_one('div._3ZU00._1rBq3 > div._1B9G6 > div > span > a > span._3hCbH').text
        #이름, 주소 리스트 추가
        nameList.append(name)
        addressList.append(address)
    doc = {
        'nameList': nameList,
        'addressList': addressList
    }
    return jsonify(doc)

@app.route("/food_save", methods=["POST"])
def save_food():
    #저장 할 값 가져오기
    option_receive = request.form['option_give']
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']
    address_receive = request.form['address_give']
    name_receive = request.form['name_give']
    img_url = request.form['img_url_give']
    doc = {
        'img_url':img_url,
        'name': name_receive,
        'address': address_receive,
        'star': star_receive,
        'comment' : comment_receive,
        'option' : option_receive
    }
    db_tae.food_place.insert_one(doc)
    return jsonify('저장 완료 ! ')

#맛집 리스트 페이지
@app.route('/food/list_food')
def save_food_home():
    return render_template('show_food.html')

@app.route("/list_food", methods=["GET"])
def place_list_get():
    #저장된 db리스트 전달
    all_places = list(db_tae.food_place.find({},{'_id':False}))
    return jsonify(all_places)

#추천 페이지
@app.route('/food/choose_food')
def choose_food_home():
    return render_template('choose_food.html')

@app.route("/choose_food", methods=["GET"])
def choose_list_get():
    # 저장된 db리스트 전달
    all_places = list(db_tae.food_place.find({}, {'_id': False}))
    return jsonify(all_places)

@app.route("/search_blog", methods=["POST"])
def blog_get():
    name_receive = request.form['name_give']
    # 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
    # 네이버 검색 Open API 예제 - 블로그 검색
    import os
    import sys
    import urllib.request
    client_id = "m7UmSw0IMZwaXgT6ABde"
    client_secret = "E0Rk8gePq4"

    encText = urllib.parse.quote(name_receive)
    url = "https://openapi.naver.com/v1/search/blog?query=" + encText #+ "&display=15"
    requests = urllib.request.Request(url)
    requests.add_header("X-Naver-Client-Id", client_id)
    requests.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(requests)
    rescode = response.getcode()
    display:20
    if (rescode == 200):
        response_body = response.read()
        desc = response_body.decode('utf-8') # 인코딩
        json_desc = json.loads(desc) # 내용을 json파일로 변환 js에서 처리하기 위해
    else:
        print("Error Code:" + rescode)
    return jsonify({'desc':json_desc,'name':name_receive})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)