import sqlite3
import os
from werkzeug.security import check_password_hash

db_name = "database.db"


def check_user(username, password):
    user = None
    with sqlite3.connect(db_name) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * from user WHERE username = ?', (username,))
        user = cursor.fetchone()
        cursor.close()
    
    if user is None:
        return False
    elif not check_password_hash(user[2], password):
        return False

    return True 
