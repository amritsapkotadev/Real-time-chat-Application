import React, { useRef, useEffect } from 'react';
import { Flex, HStack, Avatar, Text, Box, VStack, IconButton, Tooltip, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiMoreVertical, FiSearch, FiMenu, FiSettings } from 'react-icons/fi';
import { MdGroupAdd } from 'react-icons/md';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import UpdateGroupChatModal from './chatpage/UpdateGroupChatModal';
import { ChatState } from '../context/chatprovider';

const ChatWindow = ({ chat, messages, onSend, onMenuClick, fetchChats }) => {
  const messagesEndRef = useRef(null);
  const { selectedChat } = ChatState();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex direction="column" h="100%" bg="#efeae2">
      {/* Header */}
      <HStack 
        p={3} 
        bg="#f0f2f5" 
        borderBottom="1px solid #d1d7db"
        justify="space-between"
        boxShadow="sm"
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
            />
          )}
          <Box position="relative">
            <Avatar name={chat.name} size="sm" />
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
            <Text fontWeight="600" fontSize="md" color="gray.800">
              {chat.name}
            </Text>
            <Text fontSize="xs" color="gray.600">
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
                  _hover={{ bg: 'gray.100', transform: 'rotate(90deg)' }}
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
        p={4}
        backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9IiNlZmVhZTIiLz48cGF0aCBkPSJNMzAgMzBtLTIgMGEyIDIgMCAxIDAgNCAwYTIgMiAwIDEgMC00IDAiIGZpbGw9IiNkOGQzY2IiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#8888',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <VStack align="stretch" spacing={2} pb={2}>
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index} 
              message={msg} 
              isOwn={msg.senderId === 'me'} 
            />
          ))}
          <div ref={messagesEndRef} />
        </VStack>
      </Flex>

      {/* Input Area */}
      <Box bg="#f0f2f5" borderTop="1px solid #d1d7db">
        <MessageInput onSend={onSend} />
      </Box>
    </Flex>
  );
};

export default ChatWindow;
