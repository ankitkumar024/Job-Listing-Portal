
# Job Listing Portal

The Job Portal is a dynamic web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) designed to connect job seekers and employers efficiently. This platform serves as a comprehensive solution for job postings, applications, and management, streamlining the hiring process.


## Features

- User Authentication: Secure login and registration for job seekers and employers using JWT.
- Job Postings: Employers can create, edit, and manage job listings with detailed descriptions and requirements.
- Job Search: Job seekers can browse, search, and filter job opportunities based on various criteria such as location, skills, or company.
- Application Management: Real-time application tracking for job seekers and an organized dashboard for employers to review candidates.
- Responsive Design: Optimized for a seamless experience across all devices.


## Technologies Used

- Frontend: React.js with a modern UI, ensuring a fast and interactive user experience.
- Backend: Node.js and Express.js for a robust server-side architecture.
- Database: MongoDB to handle data storage efficiently.
## Cloning the Repository
Run the following commands in your terminal to clone the repository:

```
# Clone the repository
git clone <gh repo clone ankitkumar024/Job-Listing-Portal>

# Navigate to the project folder
cd job-portal
```

## Installation and Setup
## Step 1: Backend Setup
Navigate to the backend folder:

```
cd backend
```
Install the required dependencies:

```
npm install
```
Create a .env file in the backend folder and add the following environment variables:
```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```
Start the backend server:
```
npm start
```

The backend server should now run on http://localhost:5000.


## Step 2: Frontend Setup
Navigate back to the root directory:
```
cd ..
```
Install the frontend dependencies (located in the src/ folder):
```
npm install
```
Start the frontend development server:

```
npm run dev
```
The frontend should now run on http://localhost:5173 (default for Vite).


    