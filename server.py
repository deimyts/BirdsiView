import os
import time
import cloudant
from flask import Flask, jsonify
import json

# Read port selected by the cloud for our application
PORT = int(os.getenv('VCAP_APP_PORT', 8000))
# Change current directory to avoid exposure of control files
os.chdir('static')

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
  print("Start serving at port %i" % PORT)
  app.run('', PORT)
