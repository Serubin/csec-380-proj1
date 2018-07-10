from flask import Flask
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

@app.route('/UserSearch')
def userSearch():
    value = app.Request().headers
    cur = mysql.connection.cursor
    cur.execute('''SELECT id, username FROM accounts.users WHERE username LIKE %%%s%%;''', (value.search))
    users = JSON.loads(cur.fetchall())
	return users

@app.route('/FollowUser')
def followUser():
    value = app.Request().headers
    r = requests.post('/api/v1/IsAuthenticated',value.Auth)
    r.json()
    if r.authenticated:
        cur = mysql.connection.cursor()
        cur.execute('''INSERT into follows VALUES (%d,%d)''',r.user_id,value.user)
        return 'Done' 
    else:
        return 'Not Authenticated'

@app.route('/UnfollowUser')
def unfollowUser():
    value = app.Request().headers
    r = requests.post('/api/v1/IsAuthenticated',value.Auth)
    r.json()
    if r.authenticated:
        cur = mysql.connection.cursor()
        cur.execute('''DELETE from follows WHERE followerid = %d AND followingid = %d''',r.user_id,value.user)
        return 'Done' 
    else:
        return 'Not Authenticated'


if __name__ == "__main__":
	app.run()
