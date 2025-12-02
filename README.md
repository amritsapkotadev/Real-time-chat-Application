# 💬 Real-Time Chat Application

A modern, full-stack MERN chat application inspired by WhatsApp Web and Slack, featuring real-time messaging, group chats, and a beautiful, responsive UI.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Chakra UI](https://img.shields.io/badge/UI-Chakra_UI-teal)

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

Real-time-chat-Application/
├── Backend/
│   ├── Routes/
│   │   ├── ChatRoutes.js           # Chat API routes
│   │   ├── MessageRoute.js         # Message API routes
│   │   └── UserRoutes.js           # User API routes
│   ├── controllers/
│   │   ├── chatcontoller.js        # Chat logic
│   │   ├── messageController.js    # Message logic
│   │   └── userController.js       # User logic
│   ├── middleware/
│   │   └── Authmiddleware.js       # JWT verification
│   ├── models/
│   │   ├── chatModel.js            # Chat schema
│   │   ├── messageModel.js         # Message schema
│   │   └── userModel.js            # User schema
│   ├── config/
│   │   └── db.js                   # Database connection
│   ├── data.js                      # Sample data
│   ├── .env                         # Environment variables
│   └── Server.js                   # Entry point + Socket.IO setup
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── chatpage/
        │   │   ├── GroupChatModal.js           # Group creation modal
        │   │   ├── NewChatModal.jsx            # New chat modal
        │   │   └── UpdateGroupChatModal.jsx    # Group settings modal
        │   ├── userAvatar/
        │   │   ├── UserListItem.jsx            # User search result
        │   │   └── UserBadgeItem.jsx           # Selected user badge
        │   ├── SideDrawer.jsx                  # Chat list + notifications
        │   ├── ChatWindow.jsx                  # Chat display area
        │   ├── MessageBubble.jsx               # Individual messages
        │   └── MessageInput.jsx                # Message input bar
        ├── context/
        │   └── chatprovider.js                 # Global state + Socket.IO
        ├── pages/
        │   ├── Chatpage.js                     # Main chat interface
        │   ├── Homepage.js                     # Landing page
        │   ├── Login.js                        # Login page
        │   └── Signup.js                       # Registration page
        ├── App.js
        └── index.js
        └── index.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

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
   
   Create `.env` file in the `Backend` folder:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
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

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Protected Routes** - Middleware verification
- **Authorization Checks** - Permission validation
- **Input Validation** - Server-side validation
- **Error Handling** - Async error wrapper

## 📱 Responsive Breakpoints

```javascript
Mobile: < 768px (base)
Tablet: ≥ 768px (md)
Desktop: ≥ 992px (lg)
```

## 🐛 Known Issues & Future Enhancements

### Planned Features
- [ ] Real-time messaging with Socket.io
- [ ] Message persistence to backend
- [ ] File/image attachments
- [ ] Emoji picker integration
- [ ] Voice messages
- [ ] Message reactions
- [ ] Typing indicators
- [ ] Message read status
- [ ] User online/offline status (real-time)
- [ ] Message search
- [ ] Chat archiving
- [ ] Notifications

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Amrit Sapkota**
- GitHub: [@amritsapkotadev](https://github.com/amritsapkotadev)

## 🙏 Acknowledgments
 
- Design inspired by WhatsApp Web and Slack
- UI components from Chakra UI
- Icons from React Icons
- MongoDB Atlas for database hosting

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

⭐ **If you like this project, please give it a star!** ⭐
