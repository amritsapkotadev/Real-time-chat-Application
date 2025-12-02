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
    <HStack p={2} spacing={2} bg="#f0f2f5">
      <IconButton
        icon={<BsPaperclip size={24} />}
        variant="ghost"
        borderRadius="full"
        color="#54656f"
        _hover={{ bg: '#e9edef' }}
        aria-label="Attach"
      />
      <Box flex="1" bg="white" borderRadius="lg" px={3} py={2}>
        <Input
          placeholder="Type a message"
          value={message}
          onChange={handleTyping}
          onKeyPress={handleKeyPress}
          border="none"
          _focus={{ outline: 'none', boxShadow: 'none' }}
          fontSize="15px"
          p={0}
        />
      </Box>
      <IconButton
        icon={<IoSend size={20} />}
        bg={message.trim() ? '#00a884' : '#e9edef'}
        color={message.trim() ? 'white' : '#54656f'}
        borderRadius="full"
        _hover={{ bg: message.trim() ? '#06cf9c' : '#d3d6d8' }}
        onClick={handleSend}
        isDisabled={!message.trim()}
        aria-label="Send message"
      />
    </HStack>
  );
};

export default MessageInput;
