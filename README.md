# 🎓 LearnFlow — Online Learning & Course Recommendation Platform

> A full-stack MERN application featuring a personalized AI recommendation engine, progress tracking, gamification, and an advanced learner dashboard.

![LearnFlow](https://img.shields.io/badge/MERN-Stack-6366f1?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

---

## 📌 Problem Statement

Learners today are overwhelmed by thousands of online courses with no guidance on what to learn next. LearnFlow solves this by combining personalized recommendations, progress tracking, and gamification to keep learners engaged and on track.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 JWT Auth | Secure register/login with token-based auth |
| 🎯 Smart Recommendations | Multi-factor recommendation engine (interests, skills, level, popularity) |
| 📊 Advanced Dashboard | Charts, stats, leaderboard, streak tracking |
| 📚 Course Catalog | 20+ courses with search, filter, sort, pagination |
| 📈 Progress Tracking | Lesson-level completion, percentage, time spent |
| 🏆 Gamification | Points, streaks, certificates, leaderboard |
| 👤 Profile | Customizable interests & skills that power recommendations |

---

## 🧠 Recommendation Engine Logic

```
Score = (Interest Match × 30) + (Skill Match × 20) + (Level Match × 25) + (Popularity ÷ 100) + (Rating × 2) + (Featured × 15)
```

Courses already enrolled in are excluded. Returns:
- **Top Picks** — personalized by score
- **Trending** — most enrolled overall
- **Category-Based** — similar to what you're already learning

---

## 🛠 Tech Stack

**Frontend:** React 18, React Router v6, Recharts, Axios, CSS Variables  
**Backend:** Node.js, Express.js, JWT, bcryptjs, Morgan  
**Database:** MongoDB, Mongoose  
**Design:** Custom dark theme with Sora font, CSS Grid, animations

---

## 🏗 Architecture

```
Client (React)
    │
    ├── AuthContext (JWT stored in localStorage)
    ├── Pages: Login, Register, Dashboard, Courses, CourseDetail, MyLearning, Recommendations, Profile
    └── Services: api.js (Axios with interceptors)
          │
          ▼
Server (Express)
    ├── /api/auth       → register, login, me, updateProfile
    ├── /api/courses    → list, detail, featured, create
    ├── /api/enrollments → enroll, myEnrollments, checkEnrollment
    ├── /api/progress   → get, update, summary
    ├── /api/recommendations → personalized recommendations
    └── /api/users      → leaderboard
          │
          ▼
MongoDB (Mongoose)
    ├── users       → auth, interests, skills, points, streak
    ├── courses     → catalog, tags, category, level
    ├── enrollments → user↔course mapping, status
    └── progress    → completedLessons, progressPercent, timeSpent
```

---

## 📁 Folder Structure

```
LearnFlow/
├── client/
│   ├── public/index.html
│   ├── src/
│   │   ├── components/    Navbar, CourseCard
│   │   ├── context/       AuthContext
│   │   ├── pages/         All page components
│   │   ├── services/      api.js
│   │   ├── App.js         Routes
│   │   ├── index.js       Entry
│   │   └── index.css      Global styles
│   └── package.json
├── server/
│   ├── config/db.js
│   ├── controllers/       authController, courseController, etc.
│   ├── middleware/        authMiddleware (JWT)
│   ├── models/            User, Course, Enrollment, Progress
│   ├── routes/            All route files
│   ├── utils/seeder.js    20 sample courses + demo user
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 How to Run

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/LearnFlow.git
cd LearnFlow
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm run dev
```

### 3. Seed the database
```bash
cd server
node utils/seeder.js
# Creates 20 courses + demo user (demo@learnflow.com / demo1234)
```

### 4. Frontend setup
```bash
cd client
npm install
npm start
```

### 5. Open app
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login user |
| GET | /api/auth/me | Yes | Get current user |
| PUT | /api/auth/profile | Yes | Update profile |
| GET | /api/courses | No | List courses (filter/sort/paginate) |
| GET | /api/courses/:id | No | Course detail |
| POST | /api/enrollments/:courseId | Yes | Enroll in course |
| GET | /api/enrollments/my | Yes | My enrollments |
| GET | /api/progress/summary | Yes | Learning summary |
| PUT | /api/progress/:courseId | Yes | Update lesson progress |
| GET | /api/recommendations | Yes | Personalized recommendations |
| GET | /api/users/leaderboard | Yes | Top learners |

---

## 🎯 Learning Outcomes

- MERN full-stack development
- JWT authentication & middleware
- REST API design with Express
- MongoDB schema design (relationships)
- Recommendation algorithm design
- React Context API for state management
- Recharts data visualization
- Responsive UI with CSS custom properties

---

## 👤 Demo Account

```
Email: demo@learnflow.com
Password: demo1234
```

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Dashboard | Stats, charts, leaderboard, recommendations |
| Course Catalog | Search, filter by category/level, sort |
| Course Detail | Enroll, curriculum, progress tracking |
| Recommendations | AI-powered personalized suggestions |
| Profile | Interest & skill selection |

---

## 🏷 GitHub Tags

`mern-stack` `react` `nodejs` `mongodb` `express` `recommendation-system` `edtech` `full-stack` `jwt-auth` `recharts` `gamification` `course-platform`

---

Made with 💜 for the EdTech community | Open for contributions
