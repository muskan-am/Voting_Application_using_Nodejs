# 🗳️ Voting Application using Node.js

A backend-based **Voting Application** built using **Node.js, Express.js, and MongoDB**.  
This project implements **secure user authentication**, **role-based access (Admin/User)**, and a **one-time voting system**.

---

## 🚀 Features

### 👤 User
- Sign up and login using **Aadhar Card Number**
- View list of candidates
- Vote for a candidate (**only once**)
- View user profile
- Change password

### 🛠️ Admin
- Add new candidates
- Update candidate details
- Delete candidates
- View vote count of all candidates
- ❌ Admin is **not allowed to vote**

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**

---

## 📁 Project Structure

```
Voting_Application_using_Nodejs/
│
├── models/          # Mongoose schemas
├── routers/         # API routes
├── db.js            # MongoDB connection
├── jwt.js           # JWT utilities & middleware
├── server.js        # Application entry point
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/muskan-am/Voting_Application_using_Nodejs.git
```

### 2️⃣ Go to project directory
```bash
cd Voting_Application_using_Nodejs
```

### 3️⃣ Install dependencies
```bash
npm install
```

### 4️⃣ Create `.env` file
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5️⃣ Start the server
```bash
node server.js
```

Server will run on:
```
http://localhost:3000
```

---

## 🔐 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/user/signup` | Register a new user |
| POST | `/user/login` | Login user & get JWT |

---

### 👥 Candidates

| Method | Endpoint | Access |
|------|---------|--------|
| GET | `/candidates` | User |
| POST | `/candidates` | Admin |
| PUT | `/candidates/:id` | Admin |
| DELETE | `/candidates/:id` | Admin |

---

### 🗳️ Voting

| Method | Endpoint | Access |
|------|---------|--------|
| POST | `/candidates/vote/:id` | User |
| GET | `/candidates/vote/count` | Admin |

---

### 👤 User Profile

| Method | Endpoint |
|------|---------|
| GET | `/user/profile` |
| PUT | `/user/profile/password` |

---

## 🔒 Security Rules

- JWT-based authentication
- Role-based authorization (Admin/User)
- One user can vote only once
- Admin cannot vote
- Sensitive data handled using environment variables

---

## 📌 Future Enhancements

- Swagger API documentation
- Pagination for candidates
- Frontend integration
- Election result declaration

---

## 👩‍💻 Author

**Muskan Kesharwani**  
Backend Developer | Node.js | MongoDB  

---

⭐ If you like this project, don’t forget to star the repository!

