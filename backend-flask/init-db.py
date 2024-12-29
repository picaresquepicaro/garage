import sqlite3
import os
from werkzeug.security import generate_password_hash

db_name = "database.db"

def init_db():
    if not os.path.isfile(db_name):
        with sqlite3.connect(db_name) as conn:
            cursor = conn.cursor()

            with open('schema.sql', 'r') as f:
                schema = f.read()
                cursor.executescript(schema)

            cursor.close()

    else:
        print("database already exists")


def add_user():
    username = ""
    password = ""
    with sqlite3.connect(db_name) as conn:
        cursor = conn.cursor()
        try:
            cursor.execute("INSERT INTO user (username, password) VALUES (?, ?)",
                (username, generate_password_hash(password)),
            )
            conn.commit()
            cursor.close()
        except conn.IntegrityError:
            print("user already exists")

        print("success")
