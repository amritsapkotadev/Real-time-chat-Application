import React, { useState } from 'react';
import { Box, Flex, Text, VStack, Icon, useDisclosure } from '@chakra-ui/react';
import { BsChatDots } from 'react-icons/bs';
import SideDrawer from '../components/SideDrawer';
import ChatWindow from '../components/ChatWindow';

const sampleChats = [
  { 
    id: '1', 
    name: 'Alice Johnson', 
    lastMessage: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    isOnline: true,
    avatar: 'Alice Johnson'
  },
  { 
    id: '2', 
    name: 'Bob Smith', 
    lastMessage: 'See you tomorrow!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    unread: 0,
    isOnline: false,
    avatar: 'Bob Smith'
  },
  { 
    id: '3', 
    name: 'Charlie Brown', 
    lastMessage: 'Thanks for your help!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unread: 1,
    isOnline: true,
    avatar: 'Charlie Brown'
  },
  { 
    id: '4', 
    name: 'Diana Prince', 
    lastMessage: 'Let me check and get back to you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 0,
    isOnline: false,
    avatar: 'Diana Prince'
  },
];

const sampleMessages = {
  '1': [
    { senderId: '1', content: 'Hi there!', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { senderId: 'me', content: 'Hello Alice! How have you been?', timestamp: new Date(Date.now() - 1000 * 60 * 25) },
    { senderId: '1', content: 'Great! Just working on some projects', timestamp: new Date(Date.now() - 1000 * 60 * 20) },
    { senderId: 'me', content: 'That sounds exciting!', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
    { senderId: '1', content: 'Hey! How are you doing?', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  ],
  '2': [
    { senderId: '2', content: 'Yo! What\'s up?', timestamp: new Date(Date.now() - 1000 * 60 * 120) },
    { senderId: 'me', content: 'Hi Bob, not much. You?', timestamp: new Date(Date.now() - 1000 * 60 * 115) },
    { senderId: '2', content: 'See you tomorrow!', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
  ],
  '3': [
    { senderId: 'me', content: 'Here\'s the document you needed', timestamp: new Date(Date.now() - 1000 * 60 * 200) },
    { senderId: '3', content: 'Thanks for your help!', timestamp: new Date(Date.now() - 1000 * 60 * 180) },
  ],
};

const Chatpage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(sampleMessages);
  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'John Doe'
  };

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    onClose(); // Close drawer on mobile after selecting chat
  };

  return (
    <Flex h="100vh" bg="#f0f2f5" overflow="hidden">
      {/* Left Sidebar - Desktop */}
      <Box 
        display={{ base: 'none', md: 'block' }}
        w="380px" 
        borderRight="1px solid"
        borderColor="gray.200"
        bg="white"
      >
        <SideDrawer
          chats={sampleChats}
          activeChat={activeChat}
          onSelectChat={handleSelectChat}
          currentUser={currentUser}
        />
      </Box>

      {/* Mobile Drawer */}
      <Box display={{ base: 'block', md: 'none' }}>
        <SideDrawer
          chats={sampleChats}
          activeChat={activeChat}
          onSelectChat={handleSelectChat}
          currentUser={currentUser}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          isMobile
        />
      </Box>

      {/* Right Chat Window */}
      <Flex flex="1" direction="column" bg="#efeae2" position="relative">
        {activeChat ? (
          <ChatWindow
            chat={activeChat}
            messages={messages[activeChat.id] || []}
            onSend={(msg) => {
              const newMessage = {
                senderId: 'me',
                content: msg,
                timestamp: new Date()
              };
              setMessages(prev => ({
                ...prev,
                [activeChat.id]: [...(prev[activeChat.id] || []), newMessage],
              }));
            }}
            onMenuClick={onOpen}
          />
        ) : (
          <VStack 
            flex="1" 
            justify="center" 
            align="center" 
            spacing={4}
            bg="white"
          >
            <Icon as={BsChatDots} boxSize={24} color="gray.300" />
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight="semibold" color="gray.600">
                Welcome to Chat App
              </Text>
              <Text fontSize="md" color="gray.500" textAlign="center" maxW="400px">
                Select a conversation from the sidebar to start messaging
              </Text>
            </VStack>
          </VStack>
        )}
      </Flex>
    </Flex>
  );
};

export default Chatpage;
