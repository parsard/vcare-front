Vcare is a platform that provides medical services at home. Patients can reserve services from doctors, nurses, and physiotherapists, view profiles, read blogs, and more. This project includes a backend built with Node.js and Express.js, and a frontend built with React.


## Features
- **Authentication**:
  - Login/logout using a token-based system.
  - Token refresh mechanism to ensure seamless user sessions.
- **State Management**:
  - Centralized state management using Redux Toolkit.
  - Efficient API calls managed with Redux slices and async actions.
- **API Integration**:
  - Endpoints for user data, cities, services, and articles.
  - Axios interceptors for handling token injection and response errors.

## Folder Structure
- `src/Components`: Contains reusable UI components.
- `src/slice`: Redux slices for managing state.
- `src/Verification`: Handles token logic and Axios configuration.

## API Details
- **Base URL**: `http://localhost:8080`
- **Endpoints**:
  - `/api/user`: Fetch user profile.
  - `/api/refresh`: Refresh access token.
  - `/api/logout`: Log out.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
