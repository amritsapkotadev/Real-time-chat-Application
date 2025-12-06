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
    <HStack p={5} spacing={3} bg="white" borderTop="1px solid" borderColor="gray.200" boxShadow="lg">
      <IconButton
        icon={<BsPaperclip size={22} />}
        variant="ghost"
        borderRadius="full"
        color="gray.500"
        _hover={{ bg: 'blue.50', color: 'blue.500', transform: 'rotate(45deg)' }}
        aria-label="Attach"
        size="lg"
        transition="all 0.3s"
      />
      <Box flex="1" bg="gray.50" borderRadius="3xl" px={5} py={3} border="2px solid" borderColor="gray.200" _focusWithin={{ borderColor: 'blue.400', bg: 'white' }} transition="all 0.3s">
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
        icon={<IoSend size={22} />}
        bgGradient={message.trim() ? 'linear(to-r, blue.500, blue.600)' : undefined}
        bg={!message.trim() ? 'gray.200' : undefined}
        color={message.trim() ? 'white' : 'gray.400'}
        borderRadius="full"
        _hover={{ bg: message.trim() ? undefined : 'gray.300', bgGradient: message.trim() ? 'linear(to-r, blue.600, blue.700)' : undefined, transform: message.trim() ? 'scale(1.1) rotate(15deg)' : 'none' }}
        _active={{ transform: message.trim() ? 'scale(0.95)' : 'none' }}
        onClick={handleSend}
        isDisabled={!message.trim()}
        aria-label="Send message"
        size="lg"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        boxShadow={message.trim() ? 'lg' : 'none'}
      />
    </HStack>
  );
};

export default MessageInput;
