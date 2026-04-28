📅  ScheduleFlow
Mini Class Scheduling & Dashboard System
Internship Assignment Submission

🌐 Live Site
scheduleflow-client-1.vercel.app	💻 Frontend
github: scheduleflow-client	🛠️ Backend
github: scheduleflow-server	⚙️ API
scheduleflow-server.vercel.app


📌  Project Overview
ScheduleFlow is a full-stack web application where teachers can create and manage 15-minute class slots, and students can browse and book those slots in real time.

Users register with their name, email, password and select their role (Teacher or Student) during signup. The role is stored in MongoDB and used to show the correct dashboard after login. Passwords are securely hashed using bcrypt.


🛠️  Technology Stack
Layer	Technology	Purpose
Frontend	React.js + Vite	UI & client-side routing
Styling	Tailwind CSS	Responsive design
Backend	Node.js + Express.js	REST API server
Database	MongoDB + Mongoose	Data persistence
Auth	bcrypt + Role-based	Secure signup & login
Deployment	Vercel	Live hosting


✅  What I Implemented
👨‍🏫  Teacher Dashboard
●	Displays teacher name and total number of slots created
●	Add new 15-minute time slots by choosing date and time
●	View all created slots with status: Available or Booked
●	Prevents past time slots from being added
●	Prevents overlapping slots automatically

👩‍🎓  Student View
●	See all available (unbooked) slots in a clean list
●	Book any slot with a single click
●	Slot status instantly changes to Booked after reservation

🔐  Auth & Role System
●	User registers with name, email, password and selects role: Teacher or Student
●	Role is saved in MongoDB and used to direct user to the correct dashboard
●	Passwords are hashed with bcrypt before storing — never saved as plain text
●	Login checks credentials and role, then shows Teacher dashboard or Student view accordingly

🧠  Slot Conflict Logic
●	Every slot is exactly 15 minutes long
●	On slot creation, server checks all existing slots for time overlap
●	New slot is rejected if it conflicts with any existing slot window
●	Both client and server validate that past date/time cannot be used
🔑  Demo Login Credentials
You can log in with these pre-created accounts or register a new one and choose your role during signup.

👨‍🏫  Teacher Account
Email:      teacher@demo.com
Password:  12345

👩‍🎓  Student Account
Email:      student@demo.com
Password:  12345


🔗  Live Links

🌐  Live Application	https://scheduleflow-client-1.vercel.app

💻  Frontend GitHub	https://github.com/Abdul-Kader-Rimon/scheduleflow-client

🛠️  Backend GitHub	https://github.com/Abdul-Kader-Rimon/scheduleflow-server

⚙️  Backend API	https://scheduleflow-server.vercel.app
