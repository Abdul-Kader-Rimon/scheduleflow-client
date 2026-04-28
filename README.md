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
* Displays teacher name and total number of slots created
* Add new 15-minute time slots by choosing date and time
* View all created slots with status: Available or Booked
* Prevents past time slots from being added
* Prevents overlapping slots automatically


### 👩‍🎓 Student View
* See all available (unbooked) slots in a clean list
* Book any slot with a single click
* Slot status instantly changes to Booked after reservation


### 🔐 Authentication System
* User registers with name, email, password and selects role: Teacher or Student
* Role is saved in MongoDB and used to direct user to the correct dashboard
* Passwords are hashed with bcrypt before storing — never saved as plain text
* Login checks credentials and role, then shows Teacher dashboard or Student view accordingly


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
