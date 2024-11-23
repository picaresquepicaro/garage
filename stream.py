#import RPi.GPIO as GPIO
#import time
from importlib import import_module
import os
from .camera_pi2 import Camera

from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, Response
)
from werkzeug.exceptions import abort

from garage.auth import login_required
from garage.db import get_db

bp = Blueprint('stream', __name__)

#GPIO.setmode(GPIO.BCM)
#GPIO.setup(18, GPIO.OUT)


@bp.route('/stream', methods=('GET', 'POST'))
@login_required
def index():
    if request.method == 'GET':
        db = get_db()
        state = db.execute('SELECT condition FROM state').fetchone()
    return render_template('stream/stream.html', state=state['condition'])

"""
@bp.route('/toggle_garage_door', methods=('GET', 'POST'))
def toggle_garage_door():
    db = get_db()
    error = None
    state = db.execute('SELECT * FROM state').fetchone()
    print(state['condition'])
    if state['condition'] == 'open':
        flash("closing garage")
        db.execute('UPDATE state SET condition = ? WHERE id = ?', ('closed', state['id']))
        db.commit()
        open_close()
        return render_template('stream/stream.html', state='closed')
    elif state['condition'] == 'closed':
        flash("opening garage")
        db.execute('UPDATE state SET condition = ? WHERE id = ?', ('open', state['id']))
        db.commit()
        open_close()
        return render_template('stream/stream.html', state='open')
    else:
        print("we're in trouble")
    
    return render_template('stream/stream.html', state=state['condition'])
"""

def gen(camera):
    """Video streaming generator function."""
    yield b'--frame\r\n'
    while True:
        frame = camera.get_frame()
        yield b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n--frame\r\n'


@bp.route('/stream.video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


