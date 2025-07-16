💸 Paytm Clone
A full-stack clone of the Paytm platform, replicating core features like user authentication, payments interface, wallet management, and a responsive UI. Built for educational purposes to understand how modern fintech apps are structured.
🚀 Demo
👉 Live Demo (replace with actual deployment URL)
🛠️ Tech Stack
Frontend:

React.js
Tailwind CSS
React Router
Axios

Backend:

Node.js
Express.js
MongoDB (Mongoose)
JWT for Authentication

📆 Features

🔐 User Authentication (Signup/Login with JWT)
💳 Digital Wallet Simulation
💰 Add / Transfer / Withdraw Money
🧾 Transaction History
🎨 Modern, responsive UI (mobile-friendly)
🔡 Secure API integration

📁 Project Structure
```
paytm-clone/
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # UI Components
│   │   ├── pages/           # Routes (Login, Dashboard, etc.)
│   │   └── App.js
│   └── tailwind.config.js
│
├── server/                  # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
│
├── .env                     # Environment variables
└── README.md
```

🧑‍💻 Getting Started
Prerequisites:

Node.js and npm
MongoDB instance or MongoDB Atlas account

1. Clone the Repository
git clone https://github.com/abhassen44/paytm-clone.git
cd paytm-clone

2. Install Dependencies
# For backend
cd server
npm install

# For frontend
cd ../client
npm install

3. Setup Environment Variables
Create a .env file in the server directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Run the App
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start

Now open http://localhost:3000 to view the app.


✍️ Author

Abhas Sen

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.



