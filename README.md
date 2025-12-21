# Career Path Finder API 🚀

Developed by **Rodas Awgichew**, this is a robust Backend API built with **Django REST Framework**. It uses a matching algorithm to recommend career paths to users based on their unique skill sets.

## 📁 Project Overview

Finding the right career can be overwhelming. This API simplifies the process by allowing users to:

1. **Create a Profile** with their specific skills and interests.
2. **Compare** their profile against a database of career paths.
3. **Receive a Match Score (%)** for each career, helping them identify where they fit best in the job market.

---

## ✨ Key Features

* **JWT Authentication:** Secure login and registration using `djangorestframework-simplejwt`.
* **Profile Automation:** Automatic profile creation upon user registration using Django Signals.
* **Recommendation Engine:** Logic-based matching that calculates scores based on skill overlaps.
* **Full CRUD:** Complete management of Career Paths (Admin) and Profiles (User).
* **Cloud Hosted:** Fully deployed and accessible on PythonAnywhere.

---

## 🛠️ Tech Stack

* **Language:** Python 3.10+
* **Framework:** Django 5.x & Django REST Framework
* **Database:** SQLite (Development)
* **Auth:** JSON Web Tokens (JWT)
* **Deployment:** PythonAnywhere

---

## 🚀 Installation & Local Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
```bash
git clone https://github.com/rodas-awgichew/Career-Path-Finder-API.git
cd Career-Path-Finder-API

```


2. **Create and activate a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  

```


3. **Install dependencies:**
```bash
pip install -r requirements.txt

```


4. **Run Migrations:**
```bash
python manage.py migrate

```


5. **Start the server:**
```bash
python manage.py runserver

```



---

## 🚦 API Endpoints

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/auth/register/` | POST | Register a new user |
| `/api/auth/login/` | POST | Login and receive JWT tokens |
| `/api/profile/` | GET/PATCH | View or update your skills |
| `/api/career-paths/` | GET | List all available careers |
| `/api/recommendations/generate/` | POST | Trigger the matching engine |
| `/api/recommendations/` | GET | View saved career matches |

---


## 👤 Author

**Rodas Awgichew**

* GitHub: [@rodas-awgichew](https://www.google.com/search?q=https://github.com/rodas-awgichew)
* Deployment: [RodasAwgichew.pythonanywhere.com](https://www.google.com/search?q=https://RodasAwgichew.pythonanywhere.com)

