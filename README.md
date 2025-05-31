# Complete-FYP-Process-Automation-with-AI-ChatBot-and-Meeting-Schedular

This project automates the Final Year Project (FYP) process by integrating AI-powered idea selection, team formation, advisor selection, project submission, and review workflows. The system caters to **Students, Advisors, and the Project Office**, streamlining project management with authentication, document handling, feedback integration, and meeting scheduling.

## Features

### **1. Student Stakeholder**
- **Authentication & User Management**
  - Microsoft OAuth login (no manual signup)
- **AI-Powered Project Idea Selection & Refinement**
  - AI chatbot for idea selection
  - Department-based suggestion filtering
  - Store selected ideas in student profiles
- **Group Formation & Team Registration**
  - Team creation & invitation system
- **Advisor Selection & Meeting Scheduling**
  - Advisor filtering & request system
  - Automated meeting scheduler with notifications
- **Project Submission & Plagiarism Check**
  - Document upload with plagiarism detection
  - Submission deadline validation & version tracking
- **Feedback Integration**
  - Feedback submission & notifications

### **2. Advisor Stakeholder**
- **Authentication & Profile Management**
  - Microsoft OAuth login
  - Profile setup with expertise selection
  - Availability tracking
- **Student Request Management**
  - Dashboard for student requests
  - Approval/rejection workflow
- **Project Oversight & Progress Tracking**
  - Milestone-based tracking & grading
  - Automated feedback system
- **Meeting Scheduling & Notifications**
  - Calendar integration with reminders
  - Meeting history tracking

### **3. Project Office Stakeholder**
- **Authentication & Role-Based Access Control (RBAC)**
  - Microsoft OAuth login
  - Role-based permissions
- **Project Record & Database Management**
  - Centralized project database with search & filters
- **Review & Approval of Project Submissions**
  - Submission review dashboard
  - Document evaluation & plagiarism detection
  - Approval/rejection workflow with notifications
- **Announcements & Resource Management**
  - Announcement & event notifications
  - Resource sharing (templates, guides, FAQs)

## Folder Structure

```
FYP_Automation/
│── client/       # Frontend (React + Vite)
│   ├── src/
│   |   ├── assets/       # Static assets used in the app
│   │   ├── components/   # UI Components
│   │   ├── context/      # Global state management
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Different page views (Dashboard, Login, etc.)
│   │   ├── services/     # API calls with Axios
│   │   ├── utils/        # Helper functions
│   │   ├── App.jsx       # Main React component
│   │   ├── main.jsx      # Entry point
│   ├── public/
│   ├── .env.example      # Frontend environment variables
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.js    # Vite configuration
│
│── server/       # Backend (Node.js + Express + PostgreSQL)
│   ├── config/       # Database & server configurations
│   ├── controllers/  # Business logic for API endpoints
│   ├── middleware/   # Authentication & error handling middleware
│   ├── models/       # Database schemas
│   ├── routes/       # API routes
│   ├── services/     # External service integrations (OAuth, AI, etc.)
│   ├── utils/        # Helper functions
│   ├── logs/         # Logs for tracking changes
│   ├── .env.example  # Backend environment variables
│   ├── package.json  # Backend dependencies
│   ├── server.js     # Entry point
│
│── .gitignore        # Git ignore file
│── README.md         # Project documentation
```

## Installation

### Prerequisites
- Node.js
- PostgreSQL with pgAdmin

### Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Muhammadosama007/Complete-FYP-Process-Automation-with-AI-ChatBot-and-Meeting-Schedular.git
   cd Complete-FYP-Process-Automation-with-AI-ChatBot-and-Meeting-Schedular
   ```

2. **Install Dependencies**
   - **Frontend:**
     ```sh
     cd client
     npm install
     ```
   - **Backend:**
     ```sh
     cd ../server
     npm install
     ```

3. **Setup Environment Variables**
   - Create a `.env` file inside `server/` and add:
     ```env
     DATABASE_URL=your_postgresql_connection_string
     JWT_SECRET=your_super_secret_key
     MICROSOFT_OAUTH_CLIENT_ID=your_client_id
     MICROSOFT_OAUTH_CLIENT_SECRET=your_client_secret
     ```
   - Create a `.env` file inside `client/` and add:
     ```env
     Port=3002
     dbConnection=mongodb://localhost:27017/FYP
     VITE_API_URL=http://localhost:3002
     ```

4. **Start Backend Server**
   ```sh
   cd server
   npm start
   ```
   The backend will run at `http://localhost:3002`

5. **Start Frontend Server**
   ```sh
   cd ../client
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`

## Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**  
   ```sh
   git checkout -b feature/jira ticket
   ```
3. **Commit your changes**  
   ```sh
   git commit -m "feat: your feature description"
   ```
4. **Push changes**  
   ```sh
   git push origin feature/your-feature
   ```
5. **Create a Pull Request on GitHub**

---
Happy coding! 🚀

