"""This class makes 4 flask endpoints"""
import json
from flask import Flask
from flask import request
from flask_mysqldb import MySQL
import requests


APP = Flask(__name__)

APP.config.update(
    MYSQL_HOST='mariadb',
    MYSQL_PORT=3306,
    MYSQL_DB='accounts',
    MYSQL_USER='root',
    MYSQL_PASSWORD='default'
)

MY_SQL = MySQL(APP)


"""Index (Testing only)"""


@APP.route('/')
def index():
    return 'You shouldn\'t be here'


"""UserSearch"""


@APP.route('/UserSearch', methods=['POST'])
def user_search():
    value = request.args.get('search')
    cur = MY_SQL.connection.cursor()
    cur.execute(
        '''SELECT id, username FROM accounts.users WHERE
        username LIKE '%%%s%%';''',
        (value)
    )
    users = json.dumps(cur.fetchall())
    return users


"""FollowUser"""


@APP.route('/FollowUser', methods=['POST'])
def follow_user():
    output = ''
    auth = request.headers
    user = request.args.get('userId')
    req = requests.post(
        '/api/v1/IsAuthenticated',
        {'id': auth['Authorization']}
    )
    req.json()
    if req.authenticated:
        cur = MY_SQL.connection.cursor()
        cur.execute(
            '''INSERT into follows VALUES (%d, %d)''',
            req.user_id,
            user
        )
        output = 'Done'
    else:
        output = 'Not Authenticated'

    return output


"""UnfollowUser"""


@APP.route('/UnfollowUser', methods=['POST'])
def unfollow_user():
    auth = request.headers
    user = request.args.get('userId')
    req = requests.post(
        '/api/v1/IsAuthenticated',
        {'id': auth['Authorization']}
    )
    req.json()
    if req.authenticated:
        cur = MY_SQL.connection.cursor()
        cur.execute(
            '''DELETE from follows WHERE followerid = %d AND
            followingid = %d''',
            req.user_id,
            user
        )
        output = 'Done'
    else:
        output = 'Not Authenticated'

    return output


if __name__ == "__main__":
    APP.run(host='0.0.0.0', port='8000')
