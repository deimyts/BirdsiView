import os
import cloudant
from flask import Flask, jsonify, abort, request, make_response
import json
import datetime
from datetime import datetime

# Read port selected by the cloud for our application
PORT = int(os.getenv('VCAP_APP_PORT', 8000))

app = Flask(__name__)

if 'VCAP_SERVICES' in os.environ:
    cloudantInfo = json.loads(os.environ['VCAP_SERVICES'])['cloudantNoSQLDB'][0]
#we are local
else:
    with open('.env.vcap_services.json') as configFile:
        cloudantInfo = json.load(configFile)['VCAP_SERVICES']['cloudantNoSQLDB'][0]

username = cloudantInfo["credentials"]["username"]
password = cloudantInfo["credentials"]["password"]

account = cloudant.Account(username)
login = account.login(username, password)
assert login.status_code == 200

os.chdir('birdland-frontend/dist')

@app.route('/')
def test_html():
    return app.send_static_file("index.html")


@app.route('/api/v1/birds/hello')
def hello_world():
    return 'Hello Birds!'

# create the database object
db = account.database('birds')

databases = json.loads(account.all_dbs().content)
if 'birds' not in databases:
    # now, create the database on the server
    response = db.put()
    print response.json()


@app.route('/api/v1/birds/report', methods=['POST'])
def createReport():
    if not request.json:
        abort(400)

    unknown = 'unknown'
    reporter = request.json['reporter'] or unknown
    bird_species = request.json['bird_species'] or unknown
    datetime = request.json['datetime'] or "2015-09-13T19:30:00TZD"
    lat = request.json['lat'] or 0
    long = request.json['long'] or 0
    image = request.json['image'] or unknown
    sound = request.json['sound'] or unknown
    notes = request.json['notes'] or unknown

    report = {
        'reporter': request.json['reporter'],
        'bird_species': request.json['bird_species'],
        'datetime': request.json['datetime'],
        'lat': request.json['lat'],
        'long': request.json['long'],
        'image': request.json['image'],
        'sound': request.json['sound'],
        'notes': request.json['notes']
    }

    response = db.document('', params=report).post()

    return make_response(response.content, response.status_code, {'Content-Type': 'application/json'})


@app.route('/api/v1/birds/reports', methods=['GET'])
def getReports():
    response = db.all_docs().get(params={'include_docs': True})

    if response.status_code != 200:
        abort(response.status_code)

    rows = json.loads(response.content)['rows']

    docs = map(lambda row: row['doc'], rows)

    return jsonify({'birds': docs}), response.status_code


@app.route('/api/v1/birds/report/<string:id>', methods=['GET'])
def getReport(id):
    response = db.get(id)

    if response.status_code != 200:
        abort(response.status_code)

    response = make_response(response.content, response.status_code, {'Content-Type': 'application/json'})
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route('/api/v1/birds/report/<string:id>', methods=['PUT'])
def updateReport(id):
    if not request.json:
        abort(400)

    document = db.document(id)

    response = document.merge(request.json)

    return '', response.status_code


@app.route('/api/v1/birds/reports', methods=['DELETE'])
def deleteReports():
    print("deleteReports")
    response = db.all_docs().get(params={'include_docs': True})
    print("deleteReports 10")
    print("response ", response)
    print("deleteReports 20")

    if response.status_code != 200:
        abort(response.status_code)

    doc = json.loads(response.content)

    response = db.delete(id, params={'rev': doc['_rev']})

    return '', response.status_code


@app.route('/api/v1/birds/report/<string:id>', methods=['DELETE'])
def deleteReport(id):
    response = db.get(id)

    if response.status_code != 200:
        abort(response.status_code)

    doc = json.loads(response.content)

    response = db.delete(id, params={'rev': doc['_rev']})

    return '', response.status_code


if __name__ == '__main__':
  print("Start serving at port %i" % PORT)
  app.run('', PORT)
