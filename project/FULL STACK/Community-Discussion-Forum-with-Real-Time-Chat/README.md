# `README.md`

Copy-paste this into your README.md file.

````md
# Community Discussion Forum with Real-Time Chat

A modern full-stack MERN community discussion platform with real-time messaging using Socket.IO.

---

# Project Overview

This project is a modern community discussion forum where users can communicate in real time like WhatsApp or Discord.

The application demonstrates:

- Full Stack MERN Development
- Real-Time Communication
- Socket.IO Integration
- Frontend + Backend Integration
- Modern UI Design
- Client-Server Architecture

This project is useful for:

- Student Communities
- Online Discussion Platforms
- Team Communication
- Group Collaboration
- Learning Platforms
- Real-Time Chat Applications

---

# Features

## Working Features

- Real-Time Chat
- Modern WhatsApp Style UI
- Socket.IO Integration
- Community Sidebar
- Online Status Indicator
- Responsive Design
- Multiple Browser Chat
- Full Stack Architecture

---

# Tech Stack

## Frontend

- React.js
- CSS3
- Socket.IO Client

## Backend

- Node.js
- Express.js
- Socket.IO

## Database

- MongoDB (Optional)

---

# Project Architecture

```text
Frontend (React.js)
        ↓
Socket.IO Client
        ↓
Backend Server (Node.js + Express)
        ↓
Socket.IO Server
        ↓
Real-Time Message Broadcast
````

---

# Folder Structure

```text
Community-Discussion-Forum-with-Real-Time-Chat
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│
├── Output Image/
│   ├── Output.png
│   ├── Backend.png
│   ├── Frontend.png
│
├── README.md
```

---

# Installation Guide

# Step 1 — Clone Repository

```bash
git clone https://github.com/Atharvbunde/Community-Discussion-Forum-with-Real-Time-Chat.git
```

---

# Step 2 — Open Project

```bash
cd Community-Discussion-Forum-with-Real-Time-Chat
```

---

# Step 3 — Install Backend Packages

```bash
cd server

npm install
```

---

# Step 4 — Install Frontend Packages

```bash
cd ../client

npm install
```

---

# Step 5 — Run Backend

```bash
cd ../server

node server.js
```

Expected Output:

```text
Server running on port 5000
```

---

# Step 6 — Run Frontend

```bash
cd ../client

npm start
```

Expected Output:

```text
Compiled successfully!
```

---

# Localhost URLs

## Frontend

```text
http://localhost:3000
```

## Backend

```text
http://localhost:5000
```

---

# How Real-Time Chat Works

## Workflow

```text
User sends message
        ↓
Socket.IO Client
        ↓
Backend Socket.IO Server
        ↓
Broadcast Message
        ↓
Other Users Receive Instantly
```

---

# Output Screenshots

# Main UI

![Main UI](Output%20Image/Output.png)

---

# Backend Running

![Backend](Output%20Image/Backend.png)

---

# Frontend Running

![Frontend](Output%20Image/Frontend.png)

---

# GitHub Upload Steps

## Initialize Git

```bash
git init
```

---

## Add Files

```bash
git add .
```

---

## Commit

```bash
git commit -m "Initial modern community discussion forum project"
```

---

## Connect GitHub Repository

```bash
git remote add origin https://github.com/Atharvbunde/Community-Discussion-Forum-with-Real-Time-Chat.git
```

---

## Push Project

```bash
git push -u origin main
```

---

# Deploy Online (IMPORTANT)

GitHub Pages cannot run backend servers.

Use:

* Render → Backend
* Vercel → Frontend

---

# Backend Deployment on Render

## Step 1

Create account:

[https://render.com](https://render.com)

---

## Step 2

Click:

```text
New +
```

Then:

```text
Web Service
```

---

## Step 3

Connect GitHub repository.

---

## Step 4

Select:

```text
Community-Discussion-Forum-with-Real-Time-Chat
```

---

## Step 5

Configure Render

## Root Directory

```text
server
```

## Build Command

```text
npm install
```

## Start Command

```text
node server.js
```

---

## Step 6

Deploy backend.

You will get backend URL:

```text
https://your-backend-name.onrender.com
```

Example:

```text
https://community-chat-backend.onrender.com
```

---

# Frontend Deployment on Vercel

## Step 1

Create account:

[https://vercel.com](https://vercel.com)

---

## Step 2

Import GitHub repository.

---

## Step 3

Set:

## Root Directory

```text
client
```

---

## Step 4

Add Environment Variable

## Key

```text
REACT_APP_SOCKET_URL
```

## Value

```text
https://your-backend-name.onrender.com
```

Example:

```text
https://community-chat-backend.onrender.com
```

---

# IMPORTANT FRONTEND CHANGE

Before deploying online:

Open:

```text
client/src/App.js
```

Replace:

```js
const socket = io("http://localhost:5000");
```

WITH:

```js
const socket = io(
  process.env.REACT_APP_SOCKET_URL
);
```

---

# Final Online Workflow

```text
Frontend (Vercel)
        ↓
Connects to
        ↓
Backend (Render)
        ↓
Socket.IO Real-Time Chat
```

---

# Future Improvements

* Authentication System
* MongoDB Database Storage
* Discussion Rooms
* User Profiles
* Online User Count
* Voice Chat
* Video Calling
* Notifications

---

# Output Screenshots

## Main UI

![Main UI](output/home-ui.png)

---

## Real-Time Chat

![Chat](output/realtime-chat.png)

---

## Two Users Chat

![Two Users](output/two-users-chat.png)

---

## Backend Running

![Backend](output/backend-running.png)

---

## Frontend Running

![Frontend](output/frontend-running.png)

# Author

## Atharv Vishnudas Bunde

Mechatronics Engineering Student

---


---

# GitHub Repository

[https://github.com/Atharvbunde/Community-Discussion-Forum-with-Real-Time-Chat](https://github.com/Atharvbunde/Community-Discussion-Forum-with-Real-Time-Chat)

```
```
