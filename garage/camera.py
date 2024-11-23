import time
from .base_camera import BaseCamera


class Camera(BaseCamera):
    @staticmethod
    def frames():
        while True:
            yield Camera.imgs[int(time.time()) % 3]
            time.sleep(1)
