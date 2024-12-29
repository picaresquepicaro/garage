import cv2
from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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


@app.get("/stream", response_class=StreamingResponse)
async def video_feed():
    video_capture = cv2.VideoCapture(0)  # Use 0 for default camera

    async def generate():
        while True:
            ret, frame = video_capture.read()
            if not ret:
                break

            # Encode the frame in JPEG format
            _, encoded_image = cv2.imencode(".jpg", frame)

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + 
                   bytearray(encoded_image) + b'\r\n')

    return StreamingResponse(generate(), media_type="multipart/x-mixed-replace; boundary=frame")


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
