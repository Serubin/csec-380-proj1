from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)
mysql = MySQL(app)

names = ["test1","test2"]
cur = mysql.connection.cursor()
cur.execute('''create database users;''')


@app.route('/')
def index():
	return 'You shouldn\'t be here' 

@app.route('/UserSearch')
def userSearch(search):
	rNames = []
	for x in names:
		if x in search:
			rNames.append(x)
	return rNames

@app.route('/FollowUser')
def followUser(user):
	cur = mysql.connection.cursor()
	cur.execute('''use users;''')
    	cur.execute('''alter table '''+ this +''' add column ''' +user+ ''' varchar (20);''')
	rv = cur.fetchall()
	return 'Follow User' 

@app.route('/UnfollowUser')
def unfollowUser(user):
	cur = mysql.connection.cursor()
	cur.execute('''use users;''')
    	cur.execute('''DELETE from'''+ this +''' where followers''' +user +''';''')
	rv = cur.fetchall()
	return 'Unfollow User' 

if __name__ == "__main__":
	app.run(debug=True)