import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5001"; // Backend server URL

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    // Initialize socket connection
    if (userInfo) {
      const newSocket = io(ENDPOINT);
      setSocket(newSocket);

      newSocket.emit("setup", userInfo);
      newSocket.on("connected", () => {
        setSocketConnected(true);
      });

      // Cleanup on unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return (
    <ChatContext.Provider 
      value={{ 
        user, 
        setUser, 
        chats, 
        setChats, 
        selectedChat, 
        setSelectedChat,
        socket,
        socketConnected,
        notification,
        setNotification
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
