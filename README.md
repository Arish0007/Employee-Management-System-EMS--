# Employee Management System (EMS)

A role-based **Employee Management System** built with **React, Vite, Context API, and Node.js**. The system provides separate dashboards for administrators and employees, allowing organizations to manage employees, assign tasks, track progress, and monitor workloads.

## 🚀 Features

* 🔐 **Admin & Employee Authentication**
* 👨‍💼 **Employee Management**
* 📋 **Task Management**

  * Create tasks
  * Assign tasks
  * Edit tasks
  * Reassign tasks
  * Delete tasks
* 🔄 **Task Status Tracking**
* 💬 **Task Comments & Completion Notes**
* 📊 **Employee & Task Dashboard**
* 📈 **Team Workload Overview**
* 🌙 **Light/Dark Mode**
* 💾 **Persistent Data Storage**

  * Browser `localStorage`
  * JSON file through a local Node.js API

---

## 👥 User Roles

### 👨‍💼 Admin

Administrators can:

* Manage employee accounts
* Create employee accounts
* Update employee information
* Activate or deactivate employee access
* Remove employee accounts
* Create and assign tasks
* Edit and reassign tasks
* Delete tasks
* Monitor employee task status
* View overall team workload

### 👨‍💻 Employee

Employees can:

* View assigned tasks
* Accept or reject tasks
* Provide rejection reasons
* Update task status
* Add comments
* Add completion notes
* Track their assigned workload

---

## 🛠️ Tech Stack

| Technology       | Purpose                  |
| ---------------- | ------------------------ |
| **React**        | Frontend UI              |
| **Vite**         | Development & build tool |
| **JavaScript**   | Application logic        |
| **Context API**  | State management         |
| **Node.js**      | Backend/local API        |
| **JSON**         | Data persistence         |
| **LocalStorage** | Browser-side persistence |
| **CSS**          | Styling                  |

---

## 📂 Project Structure

```text
Employee-Management-System-EMS--
│
├── data/
│   └── employees.json
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   └── ...
│
├── package.json
├── vite.config.js
└── README.md
```

> The exact structure may vary depending on the current implementation of the project.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Arish0007/Employee-Management-System-EMS--.git
```

### 2. Navigate to the project directory

```bash
cd Employee-Management-System-EMS--
```

### 3. Install dependencies

```bash
npm install
```

---

## ▶️ Running the Application

### Start the Backend

Open a terminal and run:

```bash
npm run server
```

### Start the Frontend

Open another terminal and run:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite, usually:

```text
http://localhost:5173
```

---

## 🧪 Available Scripts

### Start development server

```bash
npm run dev
```

### Start backend server

```bash
npm run server
```

### Run ESLint

```bash
npm run lint
```

### Create production build

```bash
npm run build
```

---

## 💾 Storage

The application uses two forms of local persistence:

### JSON File

Employee and task data can be stored in:

```text
data/employees.json
```

through the local Node.js API.

### Browser LocalStorage

A copy of application data is also maintained in the browser's `localStorage` to support client-side persistence.

---

## 🔐 Security Notice

This project is intended for **educational and demonstration purposes**.

The current implementation uses client-side authentication and stores passwords in plaintext. **Do not use real passwords, credentials, or sensitive personal information with this application.**

For a production-ready system, the application should implement:

* Secure authentication
* Password hashing using algorithms such as bcrypt or Argon2
* Database-backed storage
* Session or token-based authentication
* Role-based authorization on the backend
* Input validation and sanitization
* Secure API endpoints
* Environment variables for sensitive configuration
* HTTPS

---

## 🎯 Project Purpose

This project was developed as a learning and demonstration project to practice:

* React development
* Component-based architecture
* State management with Context API
* Role-based application design
* CRUD operations
* REST-style backend communication
* Local data persistence
* Task management workflows
* Responsive UI development
* Light/Dark theme implementation

---

## 🔮 Future Improvements

Possible future enhancements include:

* 🗄️ MongoDB/PostgreSQL database integration
* 🔑 Secure JWT authentication
* 🔒 Password hashing
* 👥 Advanced role-based permissions
* 📧 Email notifications
* 🔔 Real-time task notifications
* 📱 Improved mobile responsiveness
* 📊 Advanced analytics and reports
* ☁️ Cloud deployment
* 🧪 Automated testing

---

## 👨‍💻 Author

**Arish Manandhar**


This project was developed for **learning and demonstration purposes**.


## 📄 License

This project is intended for educational and demonstration purposes. You are free to study and modify the code for learning purposes.
