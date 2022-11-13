from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

import bingxiang

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello_world():
    return "<p>Welcome to Syfsof!</p>"

@app.route("/get-allfood")
@cross_origin()
def getFood():
    Foods = bingxiang.readFile()
    Foods = bingxiang.DaysToExpire(Foods)
    return jsonify(Foods)

# @app.route("/get-expiringfood")
# def getFood():
#     Foods = bingxiang.DaysToExpire(bingxiang.readFile())
#     return jsonify(Foods)

from flask import request

@app.route('/addfood', methods=['POST'])
@cross_origin()
def addFood():
    #get input y = userinput
    y = {}
    y["Name"] = request.form["name"]
    y["ProductionDate"] = request.form["productionDate"]
    y["ExpirationDate"] = request.form["expirationDate"]
    y["OriginalFrom"] = request.form["originalFrom"]
    y["Storage_Condition"] = request.form["storage_Condition"]
    y["Product_Description"] = request.form["product_Description"]
    y["Index"] = request.form["index"]
    y["Additionals"] = request.form["additionals"]
    bingxiang.addFood(y)
    return jsonify({'success': True})

@app.route('/delete', methods = ['POST'])
@cross_origin()
def deleFood():
    index = request.form['index']
    bingxiang.deleteFood(index)
    return jsonify({'success': True})

app.run()


