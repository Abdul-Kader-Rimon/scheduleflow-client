# 📅 ScheduleFlow

### **Mini Class Scheduling & Dashboard System**

ScheduleFlow is a full-stack web application designed for seamless class management. Teachers can create and manage precise 15-minute class slots, while students can browse and book available slots in real-time.

---

## 🔗 Quick Links

| Item | Link |
| :--- | :--- |
| 🌐 **Live Application** | [View Live Site](https://scheduleflow-client-1.vercel.app) |
| 💻 **Frontend GitHub** | [Frontend Repository](https://github.com/Abdul-Kader-Rimon/scheduleflow-client) |
| 🛠️ **Backend GitHub** | [Backend Repository](https://github.com/Abdul-Kader-Rimon/scheduleflow-server) |
| ⚙️ **API Documentation** | [Backend API](https://scheduleflow-server.vercel.app) |

---

## 📌 Project Overview

ScheduleFlow provides a streamlined experience for educational scheduling. Key highlights include:
* **Role-Based Access:** Dedicated dashboards for Teachers and Students.
* **Real-time Booking:** Instant status updates from 'Available' to 'Booked'.
* **Security:** Robust authentication with `bcrypt` password hashing.
* **Conflict Prevention:** Intelligent logic to prevent overlapping or past-date schedules.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js + Vite | High-performance UI & Client Routing |
| **Styling** | Tailwind CSS | Modern, Responsive Design |
| **Backend** | Node.js + Express.js | Scalable REST API Server |
| **Database** | MongoDB + Mongoose | Data Persistence & Schema Modeling |
| **Auth** | Bcrypt & Role-based | Secure User Management |
| **Deployment** | Vercel | Fast & Reliable Hosting |

---

## ✅ Key Features

### 👨‍🏫 Teacher Dashboard
* **Statistics:** View teacher name and total slots created.
* **Slot Management:** Create 15-minute slots by selecting date and time.
* **Smart Validation:** Prevents past-time slots and automatic **overlap detection**.
* **Status Tracking:** Monitor slots labeled as *Available* or *Booked*.

### 👩‍🎓 Student View
* **Browse:** A clean list of all available (unbooked) slots.
* **One-Click Booking:** Reserve a session instantly.
* **Live Updates:** Visual feedback as slot status changes upon reservation.

### 🔐 Authentication System
* Secure registration with role selection (Teacher/Student).
* Credentials verification during login to redirect to the appropriate dashboard.
* Passwords are never stored in plain text.

---

## 🧠 Slot Conflict Logic
To ensure a smooth scheduling experience, I implemented custom logic:
1. **Fixed Duration:** Every slot is strictly 15 minutes.
2. **Server-Side Checks:** Before saving, the server scans MongoDB for any existing slot within that time window.
3. **Validation:** Both client and server reject attempts to schedule in the past.

---

## 🔑 Demo Login Credentials

If you'd like to test the system quickly, use the following accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Teacher** | `teacher@demo.com` | `12345` |
| **Student** | `student@demo.com` | `12345` |

---

### 👨‍💻 Developed by
**Abdul Kader Rimon**  
*Full Stack Developer*
