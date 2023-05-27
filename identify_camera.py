import cv2

camera_id = 0
cam = cv2.VideoCapture(camera_id)

if not (cam.isOpened()):
    print("Unable to open camera!")

else:
    print("Camera is opened")