from flask import Flask
from flask import request
from flask_mysqldb import MySQL
import requests
import json


app = Flask(__name__)

app.config.update(
    MYSQL_HOST='mariadb',
    MYSQL_PORT=3306,
    MYSQL_DB='accounts',
    MYSQL_USER='root',
    MYSQL_PASSWORD='default'
)

mysql = MySQL(app)


@app.route('/')
def index():
    return 'You shouldn\'t be here'


@app.route('/UserSearch', methods=['POST'])
def userSearch():
    value = request.args.get('search')
    cur = mysql.connection.cursor()
    cur.execute('''SELECT id, username FROM accounts.users
                    WHERE username LIKE '%%%s%%';''', (value))
    users = json.dumps(cur.fetchall())
    return users


@app.route('/FollowUser', methods=['POST'])
def followUser():
    auth = request.headers
    user = request.args.get('userId')
    r = requests.post('/api/v1/IsAuthenticated',
        {'id': auth['Authorization']})
    r.json()
    if r.authenticated:
        cur = mysql.connection.cursor()
        cur.execute('''INSERT into follows VALUES (%d, %d)''',
                    r.user_id,user)
        return 'Done'
    else:
        return 'Not Authenticated'


@app.route('/UnfollowUser', methods=['POST'])
def unfollowUser():
    auth = request.headers
    user = request.args.get('userId')
    r = requests.post('/api/v1/IsAuthenticated',
    {'id': auth['Authorization']})
    r.json()
    if r.authenticated:
        cur = mysql.connection.cursor()
        cur.execute('''DELETE from follows WHERE followerid = %d AND
                    followingid = %d''', r.user_id,userId)
        return 'Done'
    else:
        return 'Not Authenticated'


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='8000')
