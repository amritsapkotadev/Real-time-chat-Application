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

### 💬 Chat Functionality
- **One-to-One Messaging** - Start private conversations with any user
- **Group Chats** - Create and manage group conversations
  - Add/remove members
  - Assign group admins
  - Custom group names
- **Real-time Updates** - Chat list updates dynamically
- **Chat Deletion** - Delete chats with permission checks
  - Individual chats: Any participant can delete
  - Group chats: Only admin can delete

### 🎨 Modern UI/UX
- **WhatsApp-Inspired Design**
  - Green message bubbles for sent messages (#d9fdd3)
  - White bubbles for received messages
  - Background pattern in chat area
  - Message tails (triangular pointers)
  - Read receipts with double checkmarks
  
- **Slack-Inspired Elements**
  - Clean, professional layout
  - Prominent search functionality
  - Good typography hierarchy
  - Minimal, modern aesthetic

- **Interactive Elements**
  - Hover effects and animations
  - Online/offline status indicators
  - Unread message badges
  - Smart timestamps (5m, 2h, 3d format)
  - Emoji and attachment buttons
  - Dynamic send/mic button

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
  - Positioned for optimal visibility
  
- **State Management**
  - Context API for global state
  - Centralized chat and user management
  - Efficient re-renders

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Chakra UI** 2.8.2 - Component library
- **React Router** 6.30.2 - Navigation
- **Axios** 1.13.2 - HTTP client
- **React Icons** 5.5.0 - Icon library
- **Framer Motion** 7.6.12 - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** 9.0.0 - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-async-handler** - Error handling

## 📁 Project Structure

```
Real-time-chat-Application/
├── Backend/
│   ├── Routes/
│   │   ├── ChatRoutes.js       # Chat API routes
│   │   └── UserRoutes.js        # User API routes
│   ├── controllers/
│   │   ├── chatcontoller.js    # Chat logic
│   │   └── userController.js    # User logic
│   ├── middleware/
│   │   └── Authmiddleware.js   # JWT verification
│   ├── models/
│   │   ├── chatModel.js        # Chat schema
│   │   ├── messageModel.js     # Message schema
│   │   └── userModel.js        # User schema
│   ├── config/
│   │   └── db.js               # Database connection
│   ├── .env                     # Environment variables
│   └── Server.js               # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── chatpage/
        │   │   ├── GroupChatModal.js       # Group creation modal
        │   │   └── NewChatModal.jsx        # New chat modal
        │   ├── userAvatar/
        │   │   ├── UserListItem.jsx        # User search result
        │   │   └── UserBadgeItem.jsx       # Selected user badge
        │   ├── SideDrawer.jsx              # Chat list sidebar
        │   ├── ChatWindow.jsx              # Chat display area
        │   ├── MessageBubble.jsx           # Individual messages
        │   └── MessageInput.jsx            # Message input bar
        ├── context/
        │   └── chatprovider.js             # Global state
        ├── pages/
        │   ├── Chatpage.js                 # Main chat interface
        │   ├── Homepage.js                 # Landing page
        │   ├── Login.js                    # Login page
        │   └── Signup.js                   # Registration page
        ├── App.js
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
| POST | `/api/user` | Register new user | ❌ |
| POST | `/api/user/login` | Login user | ❌ |
| GET | `/api/user?search=query` | Search users | ✅ |

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

## 🎨 UI Components

### SideDrawer
- User profile header with avatar
- Search bar for filtering chats
- Chat list with online indicators
- Unread message badges
- Delete chat on hover
- New chat and group chat buttons

### ChatWindow
- Chat header with user info
- WhatsApp-style message bubbles
- Background pattern
- Auto-scroll to latest message
- Message timestamps
- Read receipts

### MessageInput
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
