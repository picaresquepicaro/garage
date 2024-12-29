import jwt, subprocess, time
from datetime import datetime, timezone, timedelta
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

class Login(BaseModel):
    username: str
    password: str

app = FastAPI()

origins = [ 
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

key = ""


@app.post("/login")
async def login(login: Login):
    from db import check_user
    if check_user(login.username, login.password):
        print("success")
        encoded = jwt.encode({"jwt": "payload",
                              "exp": datetime.now(tz=timezone.utc) + timedelta(minutes=5)},
                              key, algorithm="HS256")
        return encoded

    return { "error": "wrong username or password" }


@app.get("/video")
async def video(request: Request):
    token = request.headers['authorization']
    error = None
    try:
        jwt.decode(token, key, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        error = "expired"

    if error is None:
        print("starting video stream")
        process1 = subprocess.Popen(["bash", "start_video_stream.sh"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process1.communicate()
        print(stdout.decode(), stderr.decode())
        process2 = subprocess.Popen(["bash", "end_video_stream.sh"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        time.sleep(5)
        return { "url": "http://localhost:8000/stream" }
    else:
        return { "url": error }    


if __name__ == '__main__':
    uvicorn.run(app, host="localhost", port=5000)
