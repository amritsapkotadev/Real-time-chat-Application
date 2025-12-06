import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, VStack, Icon, useDisclosure, useToast } from '@chakra-ui/react';
import { BsChatDots } from 'react-icons/bs';
import SideDrawer from '../components/SideDrawer';
import ChatWindow from '../components/ChatWindow';
import axios from 'axios';
import { ChatState } from '../context/chatprovider';

const Chatpage = () => {
  const { user, chats, setChats, setSelectedChat, socket, socketConnected, notification, setNotification } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();

  const selectedChatCompare = React.useRef();

  // Format chat data for display
  const formatChatForDisplay = (chat) => {
    if (!chat) return null;
    
    // For group chats
    if (chat.isGroupChat) {
      return {
        id: chat._id,
        name: chat.chatName,
        lastMessage: chat.latestMessage?.content || 'No messages yet',
        timestamp: chat.latestMessage?.createdAt ? new Date(chat.latestMessage.createdAt) : new Date(chat.updatedAt),
        unread: 0,
        isOnline: false,
        avatar: chat.chatName,
        isGroupChat: true,
        users: chat.users,
        groupAdmin: chat.groupAdmin
      };
    }
    
    // For one-on-one chats
    const otherUser = chat.users?.find(u => u._id !== user._id);
    return {
      id: chat._id,
      name: otherUser?.name || 'Unknown User',
      lastMessage: chat.latestMessage?.content || 'Start a conversation',
      timestamp: chat.latestMessage?.createdAt ? new Date(chat.latestMessage.createdAt) : new Date(chat.updatedAt),
      unread: 0,
      isOnline: false,
      avatar: otherUser?.name || 'Unknown',
      isGroupChat: false,
      users: chat.users
    };
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('/api/chat', config);
      setChats(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error fetching chats',
        description: error.response?.data?.message || 'Failed to load chats',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const fetchMessages = async (chatId) => {
    if (!chatId) return;

    try {
      setLoadingMessages(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/message/${chatId}`, config);
      setMessages(data);
      setLoadingMessages(false);

      // Join the chat room via socket
      if (socket) {
        socket.emit("join chat", chatId);
      }
    } catch (error) {
      setLoadingMessages(false);
      toast({
        title: 'Error loading messages ❌',
        description: error.response?.data?.message || 'Failed to load messages',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const sendMessage = async (content) => {
    if (!content.trim() || !activeChat) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/message',
        {
          content: content,
          chatId: activeChat.id,
        },
        config
      );

      // Emit the new message via socket
      if (socket) {
        socket.emit("new message", data);
      }

      setMessages([...messages, data]);
      
      // Update the latest message in chat list locally (no API call)
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === activeChat.id
            ? { ...chat, latestMessage: data }
            : chat
        )
      );
    } catch (error) {
      toast({
        title: 'Failed to send message ❌',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
    // eslint-disable-next-line
  }, [user]);

  // Socket.IO: Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare.current || // If no chat is selected
        selectedChatCompare.current.id !== newMessageReceived.chat._id // Or different chat is selected
      ) {
        // Add to notifications
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
        }
        console.log("New message from different chat - added to notifications");
        // Update chat list locally (no API call)
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === newMessageReceived.chat._id
              ? { ...chat, latestMessage: newMessageReceived }
              : chat
          )
        );
      } else {
        // Add message to current chat
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        // Update chat list locally
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === newMessageReceived.chat._id
              ? { ...chat, latestMessage: newMessageReceived }
              : chat
          )
        );
      }
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // Cleanup
    return () => {
      socket.off("message received");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [socket, notification]);

  // Update the compare ref when active chat changes
  useEffect(() => {
    selectedChatCompare.current = activeChat;
  }, [activeChat]);

  const formattedChats = chats ? chats.map(formatChatForDisplay).filter(Boolean) : [];

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    // Set selected chat in context for group settings
    const originalChat = chats.find(c => c._id === chat.id);
    setSelectedChat(originalChat);
    // Fetch messages for this chat
    fetchMessages(chat.id);
    // Clear notifications for this chat
    setNotification(notification.filter((n) => n.chat._id !== chat.id));
    onClose(); // Close drawer on mobile after selecting chat
  };

  return (
    <Flex h="100vh" bg="#E8EAF6" overflow="hidden">
      {/* Left Sidebar - Desktop & Tablet */}
      <Box 
        display={{ base: 'none', md: activeChat ? 'none' : 'block', lg: 'block' }}
        w={{ md: activeChat ? '0px' : '100%', lg: '350px', xl: '400px' }}
        minW={{ lg: '300px' }}
        maxW={{ lg: '450px' }}
        borderRight="2px solid"
        borderColor="gray.300"
        bg="white"
        transition="all 0.3s ease"
        flexShrink={0}
        boxShadow="xl"
      >
        <SideDrawer
          chats={formattedChats}
          activeChat={activeChat}
          onSelectChat={handleSelectChat}
          currentUser={user}
          fetchChats={fetchChats}
          loading={loading}
        />
      </Box>

      {/* Mobile Drawer */}
      <Box display={{ base: 'block', md: 'none' }}>
        <SideDrawer
          chats={formattedChats}
          activeChat={activeChat}
          onSelectChat={handleSelectChat}
          currentUser={user}
          fetchChats={fetchChats}
          loading={loading}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          isMobile
        />
      </Box>

      {/* Right Chat Window */}
      <Flex 
        flex="1" 
        direction="column" 
        bg="#efeae2" 
        position="relative"
        display={{ base: activeChat ? 'flex' : 'none', md: activeChat ? 'flex' : 'none', lg: 'flex' }}
        minW={0}
      >
        {activeChat ? (
          <ChatWindow
            chat={activeChat}
            messages={messages}
            onSend={sendMessage}
            onMenuClick={onOpen}
            fetchChats={fetchChats}
            loadingMessages={loadingMessages}
            isTyping={isTyping}
            onBack={() => setActiveChat(null)}
          />
        ) : (
          <VStack 
            flex="1" 
            justify="center" 
            align="center" 
            spacing={6}
            bgGradient="linear(to-br, white, blue.50)"
            display={{ base: 'none', lg: 'flex' }}
            p={8}
          >
            <Box 
              bg="blue.500" 
              p={8} 
              borderRadius="full" 
              boxShadow="2xl"
              transform="auto"
              _hover={{ scale: 1.05, rotate: 5 }}
              transition="all 0.3s"
            >
              <Icon as={BsChatDots} boxSize={28} color="white" />
            </Box>
            <VStack spacing={3}>
              <Text fontSize="3xl" fontWeight="800" color="gray.700" letterSpacing="tight">
                Welcome to Chat App
              </Text>
              <Text fontSize="lg" color="gray.500" textAlign="center" maxW="500px" fontWeight="500">
                Select a conversation from the sidebar to start messaging
              </Text>
              <Text fontSize="sm" color="gray.400" mt={2}>
                💬 Send messages • 👥 Create groups • 🔔 Get notifications
              </Text>
            </VStack>
          </VStack>
        )}
      </Flex>
    </Flex>
  );
};

export default Chatpage;
