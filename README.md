# Collaborative C++ Coding Platform

## Overview
This application is a real-time collaborative C++ coding platform. Users can create a room, set a password, and invite others to join the room by sharing the room name and password. Multiple users can code together in a single file, with changes being reflected in real time.

## Features
- **Room Creation:** Create a room with a unique name and set a password for secure access.
- **Real-time Collaboration:** Multiple users can edit the code simultaneously with real-time updates.
- **C++ Compilation:** Code can be compiled and executed within the platform.
- **WebSocket Integration:** Ensures real-time communication and synchronization of code changes.

## Technologies Used
- **Frontend:** React
- **Backend:** Node.js, Express
- **Real-time Communication:** Socket.io
- **Compiler:** C++ compiler integration using Node.js

## Future Enhancements
- **Responsiveness:** Improve the responsiveness of the site to ensure compatibility with various devices.
- **Docker Integration:** Add Docker support to simplify deployment and ensure consistent development environments (for some safety issues too).

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/SuperexMack/Coding_Collab_Application
    ```

2. **Install dependencies:**
    ```bash
    # For the backend
    cd backend
    npm install

    # For the frontend
    cd ../frontend
    npm install
    ```

3. **Start the application:**
    ```bash
    # Start the backend server
    cd backend
    node app.js

    # Start the frontend server
    cd ../frontend
    cd compile
    npm run dev
    ```

4. **Open your browser and navigate to:**
    ```
    http://localhost:5173
    ```

## Usage
1. **Create a Room:**
    - Enter a unique room name and set a password.
    - Share the room name and password with collaborators.

2. **Join a Room:**
    - Enter the room name and password provided by the room creator.
    - Start coding collaboratively with others in real-time.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.


## Contact
For any questions or suggestions, please contact [flux7500560@gmai.com](mailto:flux7500560@gmai.com).

---

Thank you for using our collaborative C++ coding platform!
