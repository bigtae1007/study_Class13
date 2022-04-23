from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

@app.route('/')
def home():
    return render_template('homepage.html')

# 박태형
client_btae = MongoClient('mongodb+srv://test:sparta@Cluster0.faljs.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client_btae.food

@app.route('/food')
def food_home():
    return render_template('food.html')


# @app.route("/homework", methods=["POST"])
# def homework_post():
#     name_receive = request.form['name_give']
#     comment_receive = request.form['comment_give']
#     doc = {
#         'name': name_receive,
#         'comment': comment_receive
#     }
#     db.users.insert_one(doc)
#     return jsonify({'msg':'응원 완료!'})
#
# @app.route("/homework", methods=["GET"])
# def homework_get():
#     all_users = list(db.users.find({},{'_id':False}))
#     return jsonify(all_users)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)