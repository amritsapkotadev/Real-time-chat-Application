import React, { useRef, useEffect } from 'react';
import { Flex, HStack, Avatar, Text, Box, VStack, IconButton, Tooltip, Spinner } from '@chakra-ui/react';
import { FiMenu, FiSettings } from 'react-icons/fi';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import UpdateGroupChatModal from './chatpage/UpdateGroupChatModal';
import { ChatState } from '../context/chatprovider';

const ChatWindow = ({ chat, messages, onSend, onMenuClick, fetchChats, loadingMessages, isTyping }) => {
  const messagesEndRef = useRef(null);
  const { selectedChat, user } = ChatState();
  const prevMessagesLengthRef = useRef(0);
  const isInitialLoadRef = useRef(true);

  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    // Scroll on initial load or when new messages arrive
    if (isInitialLoadRef.current && messages.length > 0 && !loadingMessages) {
      // Initial load - scroll instantly to bottom
      scrollToBottom('auto');
      isInitialLoadRef.current = false;
      prevMessagesLengthRef.current = messages.length;
    } else if (messages.length > prevMessagesLengthRef.current && prevMessagesLengthRef.current !== 0) {
      // New message added - smooth scroll
      scrollToBottom('smooth');
      prevMessagesLengthRef.current = messages.length;
    }
  }, [messages, loadingMessages]);

  // Reset when chat changes
  useEffect(() => {
    isInitialLoadRef.current = true;
    prevMessagesLengthRef.current = 0;
  }, [chat.id]);

  return (
    <Flex direction="column" h="100%" bgGradient="linear(to-b, gray.50, blue.50)">
      {/* Header */}
      <HStack 
        p={4} 
        bgGradient="linear(to-r, blue.500, blue.600)"
        justify="space-between"
        boxShadow="md"
      >
        <HStack spacing={3}>
          {onMenuClick && (
            <IconButton
              icon={<FiMenu />}
              variant="ghost"
              size="sm"
              display={{ base: 'flex', md: 'none' }}
              onClick={onMenuClick}
              aria-label="Open menu"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
            />
          )}
          <Box position="relative">
            <Avatar name={chat.name} size="sm" bg="white" color="blue.600" />
            {chat.isOnline && (
              <Box
                position="absolute"
                bottom="0"
                right="0"
                w="10px"
                h="10px"
                bg="green.400"
                borderRadius="full"
                border="2px solid white"
              />
            )}
          </Box>
          <Box>
            <Text fontWeight="700" fontSize="md" color="white">
              {chat.name}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.900">
              {chat.isGroupChat 
                ? `${selectedChat?.users?.length || 0} members` 
                : chat.isOnline ? 'Online' : 'Offline'}
            </Text>
          </Box>
        </HStack>
        <HStack spacing={1}>
          {chat.isGroupChat && (
            <UpdateGroupChatModal fetchChats={fetchChats} fetchMessages={() => {}}>
              <Tooltip label="Group Settings" hasArrow>
                <IconButton
                  icon={<FiSettings size={20} />}
                  variant="ghost"
                  size="md"
                  borderRadius="full"
                  aria-label="Group settings"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200', transform: 'rotate(90deg)' }}
                  transition="all 0.3s"
                />
              </Tooltip>
            </UpdateGroupChatModal>
          )}
        </HStack>
      </HStack>

      {/* Messages Area */}
      <Flex 
        flex="1" 
        direction="column" 
        overflowY="auto"
        p={5}
        bg="transparent"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(66, 153, 225, 0.5)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(66, 153, 225, 0.8)',
          },
        }}
      >
        {loadingMessages ? (
          <VStack justify="center" flex="1" spacing={3}>
            <Spinner size="lg" color="blue.500" thickness="4px" />
            <Text fontSize="sm" color="gray.600" fontWeight="600">Loading messages...</Text>
          </VStack>
        ) : messages.length === 0 ? (
          <VStack justify="center" flex="1" spacing={3} bg="white" p={8} borderRadius="2xl" boxShadow="md">
            <Box fontSize="4xl">💬</Box>
            <Text fontSize="lg" color="gray.700" fontWeight="700">No messages yet</Text>
            <Text fontSize="sm" color="gray.500" fontWeight="500">Start the conversation!</Text>
          </VStack>
        ) : (
          <VStack align="stretch" spacing={3} pb={2}>
            {messages.map((msg, index) => (
              <MessageBubble 
                key={msg._id || index} 
                message={{
                  senderId: msg.sender._id,
                  senderName: msg.sender.name,
                  content: msg.content,
                  timestamp: new Date(msg.createdAt)
                }}
                isOwn={msg.sender._id === user._id} 
              />
            ))}
            {isTyping && (
              <Box alignSelf="flex-start">
                <HStack 
                  bg="white" 
                  px={4}
                  py={3}
                  borderRadius="2xl" 
                  spacing={1.5}
                  boxShadow="md"
                >
                  <Box 
                    w="9px" 
                    h="9px" 
                    bg="blue.400" 
                    borderRadius="full"
                    animation="typing 1.4s infinite"
                    sx={{
                      '@keyframes typing': {
                        '0%, 60%, 100%': { transform: 'translateY(0)' },
                        '30%': { transform: 'translateY(-10px)' },
                      }
                    }}
                  />
                  <Box 
                    w="9px" 
                    h="9px" 
                    bg="blue.400" 
                    borderRadius="full"
                    animation="typing 1.4s infinite 0.2s"
                    sx={{
                      '@keyframes typing': {
                        '0%, 60%, 100%': { transform: 'translateY(0)' },
                        '30%': { transform: 'translateY(-10px)' },
                      }
                    }}
                  />
                  <Box 
                    w="9px" 
                    h="9px" 
                    bg="blue.400" 
                    borderRadius="full"
                    animation="typing 1.4s infinite 0.4s"
                    sx={{
                      '@keyframes typing': {
                        '0%, 60%, 100%': { transform: 'translateY(0)' },
                        '30%': { transform: 'translateY(-10px)' },
                      }
                    }}
                  />
                </HStack>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </VStack>
        )}
      </Flex>

      {/* Input Area */}
      <Box bg="#f0f2f5" borderTop="1px solid #d1d7db">
        <MessageInput onSend={onSend} chatId={chat.id} />
      </Box>
    </Flex>
  );
};

export default ChatWindow;
