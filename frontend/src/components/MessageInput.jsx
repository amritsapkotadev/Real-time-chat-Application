import React, { useState } from 'react';
import { HStack, Input, IconButton, Box } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';
import { BsPaperclip } from 'react-icons/bs';
import { ChatState } from '../context/chatprovider';

const MessageInput = ({ onSend, chatId }) => {
  const [message, setMessage] = useState('');
  const { socket } = ChatState();
  const [typing, setTyping] = useState(false);

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!socket) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId);
    }

    // Stop typing after 3 seconds of inactivity
    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleSend = () => {
    if (message.trim()) {
      if (socket) {
        socket.emit("stop typing", chatId);
      }
      onSend(message);
      setMessage('');
      setTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <HStack p={4} spacing={3} bg="white" borderTop="1px solid" borderColor="gray.200" boxShadow="sm">
      <IconButton
        icon={<BsPaperclip size={22} />}
        variant="ghost"
        borderRadius="full"
        color="gray.600"
        _hover={{ bg: 'blue.50', color: 'blue.500' }}
        aria-label="Attach"
        size="md"
      />
      <Box flex="1" bg="gray.50" borderRadius="2xl" px={4} py={2} border="1px solid" borderColor="gray.200">
        <Input
          placeholder="Type a message"
          value={message}
          onChange={handleTyping}
          onKeyPress={handleKeyPress}
          border="none"
          _focus={{ outline: 'none', boxShadow: 'none' }}
          fontSize="15px"
          p={0}
          bg="transparent"
          fontWeight="500"
        />
      </Box>
      <IconButton
        icon={<IoSend size={20} />}
        bg={message.trim() ? 'blue.500' : 'gray.200'}
        color={message.trim() ? 'white' : 'gray.500'}
        borderRadius="full"
        _hover={{ bg: message.trim() ? 'blue.600' : 'gray.300', transform: message.trim() ? 'scale(1.05)' : 'none' }}
        onClick={handleSend}
        isDisabled={!message.trim()}
        aria-label="Send message"
        size="md"
        transition="all 0.2s"
      />
    </HStack>
  );
};

export default MessageInput;
