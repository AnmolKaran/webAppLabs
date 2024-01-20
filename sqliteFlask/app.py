import sqlite3
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    data = conn.execute('SELECT c_name FROM characters').fetchall()
    conn.close()
    
    return render_template('characters.html', characters=data)

@app.route('/characters/<c_name>')
def character_page(c_name):
    conn = get_db_connection()
    data = conn.execute("SELECT * FROM characters ").fetchall()
    for d in data:
        if d['c_name'] == c_name:
            print(c_name)
            return render_template('displayChar.html',data = d)



    conn.close()
    return
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)