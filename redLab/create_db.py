import sqlite3

connection = sqlite3.connect('database.db')

with open('makeDb.sql') as f:
    connection.executescript(f.read())