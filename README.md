# Learning Platforms

A learning platform for the delivery of educational
materials. In the context of a learning platform, a
community feature allows users to connect with each
other and collaborate on shared learning objectives.

## Features

- Modules: User, Admin, and Teacher.
- Allows teachers to add courses and view courses.
- Integrated Google authentication for seamless user login and registration.
- To ensure secure access and authentication, have implemented user authentication using JSON Web Tokens (JWT).
- Payment gateway implementation using Stripe.
- Created a community feature that enables users to
- join or create groups based on shared interests or goals.
- To enable real-time communication within each group, Socket.IO was used.
- Technologies used:Node.js, React.js, MongoDB
- Live link: https://learnifix.netlify.app

## Prerequisites

Before you can run the app, make sure you have the following installed on your machine:

- Node.js (v12 or above)
- npm (v6 or above)

## Getting Started

1. Clone this repository to your local machine:

   git clone E-learn_Client

2. Navigate to the project directory:

   cd E-learn_Client

3. Install the dependencies:

   npm install

4. Start the development server:

   npm run dev

## Folder Structure

Explain the structure of the project's folders and files. Describe the purpose of each important file or directory.

src/  
 |- assets/ # All images

|- axios/ # Axios instance

|- components/ # React components

|- pages/ # React pages or views

|- Redux/ # Redux store,slice,action

|- routes/ # All route

|- services/ # All API services

|- utils/ # Utility functions or modules

|- App.jsx # Entry point of the application

public/ # Public assets directory
dist/ # Build output directory

The app should now be running at http://localhost:5173.