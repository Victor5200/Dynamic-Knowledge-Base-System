# Dynamic Knowledge Base System

## 📌 Objective

This project is a **RESTful API** for a **Dynamic Knowledge Base System**. It manages interconnected topics and resources with **version control**, **user roles**, and **permissions**. The system demonstrates **advanced object-oriented programming concepts**, **design patterns**, and **algorithms**, while maintaining **high code quality** and **testing standards**.

---

## 🚀 Features

### 🔧 Core Functionality

#### Entities
- **Topic**: Represents a subject or concept within the knowledge base.
- **Resource**: Represents external links or documents associated with topics.
- **User**: Represents users with roles (`Admin`, `Editor`, `Viewer`).

#### Topic Management
- CRUD operations for topics with **version control**.
- **Hierarchical topics** with parent-child relationships.

### 🧠 Complex Business Logic
- **Version Control**: Each update creates a new version of a topic.
- **Recursive Topic Retrieval**: Retrieve topics and subtopics in a tree structure.
- **Custom Algorithm**: Find the shortest path between two topics in the hierarchy.

### 💡 Advanced Object-Oriented Design
- Use of **abstract classes** and **interfaces** for entities.
- **Design Patterns**:
    - `Factory` for topic versions
    - `Strategy` for user roles and permissions
    - `Composite` for hierarchical topics

### 📁 Code Structure and Quality
- **Modularized code**: controllers, services, models, routes, and middleware.
- Follows **SOLID principles** for maintainability and scalability.

### ⚠️ Error Handling and Validation
- Comprehensive error handling for all endpoints.
- Input validation for API requests.

### 🧪 Unit and Integration Testing (Bonus)
- Unit tests for services and controllers using **Jest**.
- Integration tests for **user permissions** and **topic retrieval**.

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

### 🏃‍♂️ Running the Application
Start the server:
```bash
npm start
```

Access the API at `http://localhost:3000/api`.
### 🧪 Running Tests
Run unit tests:
```bash
npm test
```

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
