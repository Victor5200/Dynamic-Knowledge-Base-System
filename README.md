# Dynamic Knowledge Base System

![CI](https://github.com/Victor5200/Dynamic-Knowledge-Base-System/actions/workflows/ci.yml/badge.svg)
![Security Audit](https://github.com/Victor5200/Dynamic-Knowledge-Base-System/actions/workflows/security.yml/badge.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Victor5200/Dynamic-Knowledge-Base-System)

## 📌 Objective

This project is a **RESTful API** for a **Dynamic Knowledge Base System**. It manages interconnected topics and resources with **version control**, **user roles**, and **permissions**. The system demonstrates **advanced object-oriented programming concepts**, **design patterns**, and **algorithms**, while maintaining **high code quality** and **testing standards**.

---

### 📝 API Documentation
API documentation is available at `http://localhost:3000/api-docs`.

## 📌 API Endpoints

### 📚 Topics
- `POST /topics`: Create a new topic
- `GET /topics/:id`: Retrieve a topic by ID
- `PUT /topics/:id`: Update a topic (creates a new version)
- `DELETE /topics/:id`: Delete a topic

### 📎 Resources
- `POST /resources`: Create a new resource
- `GET /resources/:id`: Retrieve a resource by ID

### 👤 Users
- `POST /users`: Create a new user
- `GET /users/:id`: Retrieve a user by ID

### ⚙️ Business Logic
- `GET /topics/:id/tree`: Retrieve a topic and its subtopics recursively
- `GET /topics/path`: Find the shortest path between two topics

---

## ⚙️ Project Setup

### 📋 Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### 🛠 Installation

Clone the repository:
```bash
git clone <repository-url>
cd dynamic-knowledge-base
```

Install dependencies:
```bash
npm install
```

### 🏃‍♂️ Building the Application
Build the application:
```bash
npm run build
```

### 🏃‍♂️ Running the Application
Start the server:
```bash
npm run dev
```
Access the API at `http://localhost:3000/api-docs`.

### 🧪 Running Tests
Run unit tests:
```bash
npm test
```

