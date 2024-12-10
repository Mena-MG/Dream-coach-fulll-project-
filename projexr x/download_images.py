import requests
import os

def download_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Image URLs
images = {
    'coach1.jpg': 'https://media.gettyimages.com/id/1437699576/video/female-mentor-pointing-at-a-laptop-screen-and-talking-to-an-intern-two-business-women.jpg',
    'coach2.jpg': 'https://media.istockphoto.com/id/1398577959/photo/woman-mentoring-a-young-employee-in-the-office.jpg',
    'coach3.jpg': 'https://media.istockphoto.com/id/1325565887/photo/business-people-meeting-planning-start-up-talking-discussing-ideas-brainstorming-scrum-master.jpg',
    'coach4.jpg': 'https://img.freepik.com/free-photo/close-up-woman-holding-notebook_23-2148928846.jpg'
}

# Download each image
for filename, url in images.items():
    filepath = os.path.join('images', filename)
    try:
        download_image(url, filepath)
        print(f'Successfully downloaded {filename}')
    except Exception as e:
        print(f'Failed to download {filename}: {str(e)}')
