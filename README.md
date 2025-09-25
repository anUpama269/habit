Habit Tracker – Quick Guide

Track your habits, stay consistent, and see your progress at a glance. Built with React on the frontend and Django REST Framework on the backend.

What It Does

Sign up, log in, and log out securely.

Add, update, or remove your habits (like Health, Work, Learning).

Check in daily to track your progress.

See your max streak and success rate for each habit.

Tech Stack

Backend: Django, Django REST Framework, Token Authentication

Frontend: React, Axios, Bootstrap

Database: SQLite (default) / MySQL optional

Getting Started

Backend:

cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Frontend:

cd frontend
npm install
npm start


Backend: http://127.0.0.1:8000/

Frontend: http://localhost:3000/

Key API Endpoints

/users/ → Register

/login/ → Login & get token

/logout/ → Logout

/habits/ → List or add habits

/habits/<id>/ → Get, update, or delete a habit

/checkin/?habit=<id> → View check-ins

/checkin/ → Add a check-in

/streaks/<habit_id> → Max streak

/success_rate/<habit_id> → Success rate

Tips

Keep your token in localStorage for authorization.

Use the singular /checkin/ endpoint, not checkins/.

Success rate calculations need the Habit object, not just the ID.
