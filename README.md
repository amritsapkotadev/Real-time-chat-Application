# 💬 Real-Time Chat Application

A modern, full-stack MERN chat application inspired by WhatsApp Web and Slack, featuring real-time messaging, group chats, and a beautiful, responsive UI.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Chakra UI](https://img.shields.io/badge/UI-Chakra_UI-teal)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://real-time-chat-application-b4r5.onrender.com)

<div align="center">

## 🚀 [**TRY LIVE DEMO**](https://real-time-chat-application-b4r5.onrender.com) 🚀

[![Live Demo Button](https://img.shields.io/badge/🌐_Visit_Live_Application-4299E1?style=for-the-badge&logoColor=white)](https://real-time-chat-application-b4r5.onrender.com)

**Experience real-time chat in action!** No installation required.

</div>

---

## 🎥 Demo Videos

### 📹 Group Chat Demo
Experience real-time group messaging, member management, and notifications in action!

[![Group Chat Demo](https://img.youtube.com/vi/-mQ_roFzUkc/maxresdefault.jpg)](https://www.youtube.com/watch?v=-mQ_roFzUkc)

**[▶️ Watch Group Chat Demo](https://www.youtube.com/watch?v=-mQ_roFzUkc)**

---

### 📹 One-to-One Chat Demo
See private messaging, typing indicators, and real-time communication!

[![One-to-One Chat Demo](https://img.youtube.com/vi/ZSE6DFaZHIc/maxresdefault.jpg)](https://www.youtube.com/watch?v=ZSE6DFaZHIc)

**[▶️ Watch One-to-One Chat Demo](https://www.youtube.com/watch?v=ZSE6DFaZHIc)**

---

## 📸 Screenshots

### Homepage
![Homepage](screenshots/Screenshot%202025-12-06%20at%2010.40.42.png)

### Login Page
![Login](screenshots/Screenshot%202025-12-06%20at%2010.40.58.png)

### Signup Page
![Signup](screenshots/Screenshot%202025-12-06%20at%2010.41.23.png)

### Chat Interface
![Chat Interface](screenshots/Screenshot%202025-12-06%20at%2011.53.53.png)

### Group Chat & Features
![Group Chat](screenshots/Screenshot%202025-12-06%20at%2011.54.08.png)

---

## 📑 Table of Contents

- [Demo Videos](#-demo-videos)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Socket.IO Events](#-socketio-events)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌟 Features

### 🔐 Authentication & User Management
- **User Registration** with email and password
- **Secure Login** with JWT token authentication
- **Password Encryption** using bcrypt
- **User Search** by name or email
- **Profile Management** with avatar display

### 💬 Real-Time Messaging
- **Instant Messaging** - Real-time message delivery with Socket.IO
- **One-to-One Chats** - Private conversations with any user
- **Group Chats** - Create and manage group conversations
  - Add/remove members
  - Assign group admins
  - Rename groups
  - Member count display
- **Message Persistence** - All messages saved to MongoDB
- **Chat Deletion** - Delete chats with permission checks
  - Individual chats: Any participant can delete
  - Group chats: Only admin can delete

### 🔔 Smart Notifications
- **Real-time Notifications** - Instant notification when receiving messages
- **Notification Badge** - Shows unread message count
- **Enhanced Dropdown** - Rich notification panel with:
  - Sender avatars
  - Message preview
  - Timestamp
  - Click to open chat
- **Unread Chat Highlighting** - Blue background and border for chats with unread messages
- **Auto-clear** - Notifications cleared when opening the chat

### ⌨️ Typing Indicators
- **Live Typing Status** - See when someone is typing
- **Animated Dots** - 3 bouncing dots animation
- **Smart Auto-stop** - Stops typing after 3 seconds of inactivity
- **Real-time Updates** - Typing status broadcasts to all participants

### 🎨 Modern UI/UX
- **WhatsApp-Inspired Design**
  - Green message bubbles for sent messages (#d9fdd3)
  - White bubbles for received messages
  - Background pattern in chat area
  - Message tails (triangular pointers)
  - Read receipts with double checkmarks
  
- **Interactive Elements**
  - Hover effects and animations
  - Online/offline status indicators
  - Unread message badges
  - Smart timestamps (5m, 2h, 3d format)
  - Attachment buttons
  - Rotating settings icon animation

### 📱 Responsive Design
- **Desktop View** (≥768px)
  - Fixed sidebar (380px)
  - Flexible chat window
  
- **Mobile View** (<768px)
  - Slide-out drawer navigation
  - Full-width chat window
  - Hamburger menu button

### 🎯 Advanced Features
- **Search Functionality**
  - Search chats in real-time
  - Search users for new conversations
  - Case-insensitive filtering
  
- **Beautiful Dialogs**
  - Confirmation dialog for chat deletion
  - Warning icons and descriptions
  - Loading states during operations
  
- **Toast Notifications**
  - Success messages with emojis
  - Error messages with detailed descriptions
  - Info toasts for features under development
  - Positioned for optimal visibility
  
- **Performance Optimizations**
  - Local state updates (no unnecessary API calls)
  - Efficient message routing with selectedChatCompare
  - Smart scroll behavior (only on new messages)
  
- **State Management**
  - Context API for global state
  - Socket.IO integration in global context
  - Centralized chat and user management
  - Efficient re-renders

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Chakra UI** 2.8.2 - Component library
- **Socket.IO Client** 4.8.1 - Real-time communication
- **React Router** 6.30.2 - Navigation
- **Axios** 1.13.2 - HTTP client
- **React Icons** 5.5.0 - Icon library
- **Framer Motion** 7.6.12 - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** 5.1.0 - Web framework
- **MongoDB** - Database
- **Mongoose** 9.0.0 - ODM
- **Socket.IO** 4.8.1 - Real-time WebSocket server
- **JWT** (jsonwebtoken 9.0.2) - Authentication
- **bcrypt** 6.0.0 - Password hashing
- **express-async-handler** - Error handling
- **CORS** - Cross-origin support

## 📁 Project Structure

```plaintext
Real-time-chat-Application/
│
├── 📂 Backend/                          # Server-side application
│   │
│   ├── 📂 Routes/                       # API route definitions
│   │   ├── ChatRoutes.js                # Chat endpoints
│   │   ├── MessageRoute.js              # Message endpoints
│   │   └── UserRoutes.js                # User/auth endpoints
│   │
│   ├── 📂 controllers/                  # Business logic layer
│   │   ├── chatcontoller.js             # Chat operations
│   │   ├── messageController.js         # Message operations
│   │   └── userController.js            # User operations
│   │
│   ├── 📂 middleware/                   # Express middleware
│   │   └── Authmiddleware.js            # JWT authentication
│   │
│   ├── 📂 models/                       # MongoDB schemas
│   │   ├── chatModel.js                 # Chat schema
│   │   ├── messageModel.js              # Message schema
│   │   └── userModel.js                 # User schema
│   │
│   ├── 📂 config/                       # Configuration files
│   │   └── db.js                        # MongoDB connection
│   │
│   ├── 📄 Server.js                     # Express app + Socket.IO
│   ├── 📄 data.js                       # Sample seed data
│   └── 📄 .env                          # Environment variables
│
└── 📂 frontend/                         # Client-side application
    │
    ├── 📂 public/                       # Static files
    │   ├── index.html                   # HTML template
    │   ├── manifest.json                # PWA manifest
    │   └── robots.txt                   # SEO robots file
    │
    └── 📂 src/                          # React source code
        │
        ├── 📂 components/               # Reusable components
        │   │
        │   ├── 📂 chatpage/             # Chat-specific modals
        │   │   ├── GroupChatModal.js    # Create group
        │   │   ├── NewChatModal.jsx     # Start new chat
        │   │   └── UpdateGroupChatModal.jsx  # Edit group
        │   │
        │   ├── 📂 userAvatar/           # User UI components
        │   │   ├── UserListItem.jsx     # Search results
        │   │   └── UserBadgeItem.jsx    # Selected badges
        │   │
        │   ├── SideDrawer.jsx           # Chat list sidebar
        │   ├── ChatWindow.jsx           # Main chat area
        │   ├── MessageBubble.jsx        # Message display
        │   └── MessageInput.jsx         # Message composer
        │
        ├── 📂 context/                  # React Context API
        │   └── chatprovider.js          # Global state + Socket.IO
        │
        ├── 📂 pages/                    # Page components
        │   ├── Chatpage.js              # Main chat UI
        │   ├── Homepage.js              # Landing page
        │   ├── Login.js                 # Login form
        │   └── Signup.js                # Registration form
        │
        ├── 📄 App.js                    # Root component
        ├── 📄 App.css                   # Global styles
        ├── 📄 index.js                  # React entry point
        └── 📄 index.css                 # Base CSS
```

## 🚀 Getting Started

### ⚡ Quick Start

Want to try the app right away? **[Visit Live Demo →](https://real-time-chat-application-b4r5.onrender.com)**

Or run locally by following the steps below:

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local or Atlas account) - [Get MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amritsapkotadev/Mern-chat-App.git
   cd Real-time-chat-Application
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `Backend` folder with the following:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
   
   **MongoDB Atlas Setup:**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string from "Connect" → "Connect your application"
   - Replace `<password>` with your database password
   - Whitelist your IP address (0.0.0.0/0 for development)
   ```

5. **Start the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd Backend
   node Server.js
   ```
   ✅ Backend running on http://localhost:5001

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   ✅ Frontend running on http://localhost:3000

6. **Open your browser**
   
   Navigate to: http://localhost:3000

## 📚 API Endpoints

### User Routes (`/api/user`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
### Chat Routes (`/api/chat`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/chat` | Create/access one-to-one chat | ✅ |
| GET | `/api/chat` | Fetch all user chats | ✅ |
| POST | `/api/chat/group` | Create group chat | ✅ |
| PUT | `/api/chat/rename` | Rename group chat | ✅ |
| PUT | `/api/chat/groupadd` | Add user to group | ✅ |
| PUT | `/api/chat/groupremove` | Remove user from group | ✅ |
| DELETE | `/api/chat/:chatId` | Delete chat | ✅ |

## 🔌 Socket.IO Events

### Client → Server
- `setup` - Initialize user socket connection
- `join chat` - Join a specific chat room
- `new message` - Send a new message
- `typing` - User started typing
- `stop typing` - User stopped typing

### Server → Client
- `connected` - Socket connection established
- `message received` - New message broadcast to room
- `typing` - Someone is typing in the chat
- `stop typing` - Typing stopped

## 🎨 UI Components

### SideDrawer
- User profile header with avatar
- Notification bell with badge count
- Enhanced notification dropdown:
  - Sender avatars
  - Message preview
  - Click to open chat
  - Empty state with bell icon
- Search bar for filtering chats
- Chat list with:
  - Online/offline indicators
  - Unread message highlighting (blue background)
  - Blue dot for unread chats
  - Smart timestamps
  - Delete chat on hover
- New chat and group chat buttons
- Menu with Profile/Settings (with "under development" toast)
## 🎯 Key Features Explained

### Real-Time Messaging
```javascript
// Socket.IO implementation in Server.js
io.on("connection", (socket) => {
  // User joins their personal room
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // User joins chat room
  socket.on("join chat", (room) => {
    socket.join(room);
  });

  // Broadcast new message
  socket.on("new message", (newMessage) => {
    chat.users.forEach(user => {
      if (user._id !== newMessage.sender._id) {
        socket.in(user._id).emit("message received", newMessage);
      }
    });
  });
});
```

### Typing Indicators
```javascript
// In MessageInput.jsx
const handleTyping = (e) => {
  if (!typing) {
    setTyping(true);
    socket.emit("typing", chatId);
  }
  
  // Auto-stop after 3 seconds
  setTimeout(() => {
    if (timeDiff >= 3000 && typing) {
      socket.emit("stop typing", chatId);
      setTyping(false);
    }
  }, 3000);
};
```

### Notification System
```javascript
// In Chatpage.js
socket.on("message received", (newMessage) => {
  if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
    // Add to notifications if not in current chat
    if (!notification.includes(newMessage)) {
      setNotification([newMessage, ...notification]);
    }
  } else {
    // Update messages if in current chat
    setMessages([...messages, newMessage]);
  }
});
```

### Performance Optimization
```javascript
// Local state update instead of API refetch
const sendMessage = async () => {
  // ... send message logic
  
  // Update chat list locally
  setChats((prevChats) =>
    prevChats.map((c) =>
      c._id === selectedChat._id
        ? { ...c, latestMessage: data }
        : c
    )
  );
  // No fetchChats() call needed!
};
```

### Chat Deletion
## ✅ Implemented Features

- [x] Real-time messaging with Socket.IO
- [x] Message persistence to MongoDB
- [x] Typing indicators with animated dots
- [x] Real-time notifications
- [x] Unread message highlighting
- [x] Group chat management
- [x] User search and discovery
- [x] Performance optimizations
- [x] Responsive design
- [x] Toast notifications

## 🚧 Under Development

- [ ] Profile page
- [ ] Settings page
- [ ] File/image attachments
- [ ] Emoji picker integration
- [ ] Voice messages
- [ ] Message reactions
- [ ] Message read receipts (double checkmark functionality)
- [ ] Real-time online/offline status
- [ ] Message search
- [ ] Chat archiving
- [ ] Push notifications
- [ ] Message editing/deletion
- [ ] User blockingdmin automatically
- Real-time chat list update
``` Rename group
  - Add/remove members
  - Leave group
- **DeleteDialog**: Confirm chat deletion with warning
- Text input field
- Emoji button
- Attach files button
- Dynamic send/mic button
- Enter key support

### Modals
- **NewChatModal**: Search and start one-to-one chats
- **GroupChatModal**: Create group with multiple users
- **DeleteDialog**: Confirm chat deletion with warning

## 🎯 Key Features Explained

### Chat Deletion
```javascript
// Permission checks:
- One-to-one: Any participant can delete
- Group: Only admin can delete
- Confirmation dialog before deletion
- Toast notification on success/error
```

### Group Chat Creation
```javascript
// Features:
- Search and select multiple users
- Minimum 2 users required
- User badges with remove option
- Creator becomes admin automatically
- Real-time chat list update
```

### One-to-One Chat
```javascript
// Features:
- Search users by name/email
- Creates chat if doesn't exist
- Returns existing chat if already created
- Auto-adds to chat list
```

## 🎨 Design System

### Colors
```javascript
Backgrounds:
- Sidebar: White
- Chat Area: #efeae2 (Warm beige)
- Your Messages: #d9fdd3 (Light green)
- Their Messages: White
- Page Background: #f0f2f5 (Light gray)

Accents:
- Primary: Blue (#3182CE)
- Send Button: Green (#00a884)
- Online Dot: Green (#48BB78)
- Delete: Red (#E53E3E)
- Unread Badge: Green
```

### Typography
```javascript
Font Family: "Work Sans", system-ui
Sizes:
- Heading: 24px, 20px
- Body: 15px, 14px
- Small: 13px, 12px
Weights: 400 (regular), 600 (semibold), 700 (bold)
```

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt encryption with salt rounds
- ✅ **Protected Routes** - Middleware authorization checks
- ✅ **CORS Configuration** - Controlled cross-origin requests
- ✅ **Input Validation** - Server-side data validation
- ✅ **Error Handling** - Comprehensive async error wrapper
- ✅ **XSS Protection** - Input sanitization
- ✅ **Environment Variables** - Sensitive data protection

## 📱 Responsive Breakpoints

```css
📱 Mobile:  < 768px  (base) - Full-screen chat with drawer navigation
💻 Tablet:  ≥ 768px  (md)   - Adaptive sidebar, collapsible on chat view
🖥️ Desktop: ≥ 992px  (lg)   - Side-by-side layout with fixed sidebar
```

## 🚀 Deployment

### Deploy to Render

This app is deployed on [Render](https://render.com). Follow these steps:

1. **Create a Web Service**
   - Connect your GitHub repository
   - Select your branch (main)

2. **Configure Build Settings**
   ```
   Build Command: npm run build
   Start Command: npm start
   ```

3. **Add Environment Variables**
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Deploy!**
   - Render will automatically build and deploy your app
   - Get your live URL: `https://your-app.onrender.com`

**Note:** Make sure to whitelist `0.0.0.0/0` in MongoDB Atlas Network Access for production.

## ✨ Highlights & Achievements

- 🎨 **Modern UI/UX** - Clean, intuitive interface inspired by industry leaders
- ⚡ **Real-Time Communication** - Instant message delivery with Socket.IO
- 🔐 **Secure Authentication** - JWT-based auth with encrypted passwords
- 📱 **Fully Responsive** - Seamless experience across all devices
- 🎯 **Performance Optimized** - Efficient state management and updates
- 🛠️ **Production Ready** - Deployed and tested on Render
- 📊 **Scalable Architecture** - MERN stack with clean code structure

## 🐛 Future Enhancements

### Planned Features
- [ ] File/image attachments with cloud storage
- [ ] Emoji picker integration
- [ ] Voice messages
- [ ] Message reactions (👍, ❤️, 😂)
- [ ] Message read receipts enhancement
- [ ] Real-time online/offline status
- [ ] Message search functionality
- [ ] Chat archiving
- [ ] Push notifications
- [ ] Message editing & deletion
- [ ] User blocking
- [ ] Dark mode theme
- [ ] Multi-language support

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/amritsapkotadev/Mern-chat-App/issues) for open issues or create a new one.

### How to Contribute

1. **Fork** the repository
2. **Create** your feature branch 
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes 
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch 
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Amrit Sapkota**
- 🌐 GitHub: [@amritsapkotadev](https://github.com/amritsapkotadev)
- 📧 Email: [Contact](mailto:your-email@example.com)
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments
 
- 💡 **Design Inspiration:** WhatsApp Web & Slack
- 🎨 **UI Framework:** [Chakra UI](https://chakra-ui.com/)
- 🎯 **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- 🗄️ **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- 🚀 **Deployment:** [Render](https://render.com/)
- 📚 **Learning Resources:** Web Dev Simplified, Traversy Media

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/amritsapkotadev/Mern-chat-App)
![GitHub stars](https://img.shields.io/github/stars/amritsapkotadev/Mern-chat-App?style=social)
![GitHub forks](https://img.shields.io/github/forks/amritsapkotadev/Mern-chat-App?style=social)
![GitHub issues](https://img.shields.io/github/issues/amritsapkotadev/Mern-chat-App)

## 📞 Support

If you have any questions or need help, feel free to:
- 🐛 [Open an issue](https://github.com/amritsapkotadev/Mern-chat-App/issues)
- 💬 Start a [discussion](https://github.com/amritsapkotadev/Mern-chat-App/discussions)
- 📧 Email me directly

---

<div align="center">

### ⭐ If you like this project, please give it a star! ⭐

**[🚀 Live Demo](https://real-time-chat-application-b4r5.onrender.com)** • **[📹 Watch Demos](#-demo-videos)** • **[📖 Documentation](#-table-of-contents)**

Made with ❤️ by [Amrit Sapkota](https://github.com/amritsapkotadev)

---

**Happy Chatting! 💬✨**

</div>
