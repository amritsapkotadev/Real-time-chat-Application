import React, { useState } from 'react';
import { HStack, Input, IconButton, Box } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile, BsPaperclip, BsMic } from 'react-icons/bs';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
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
        icon={<BsEmojiSmile size={24} />}
        variant="ghost"
        borderRadius="full"
        color="#54656f"
        _hover={{ bg: '#e9edef' }}
        aria-label="Emoji"
      />
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
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          border="none"
          _focus={{ outline: 'none', boxShadow: 'none' }}
          fontSize="15px"
          p={0}
        />
      </Box>
      <IconButton
        icon={message.trim() ? <IoSend size={20} /> : <BsMic size={24} />}
        bg={message.trim() ? '#00a884' : 'transparent'}
        color={message.trim() ? 'white' : '#54656f'}
        borderRadius="full"
        _hover={{ bg: message.trim() ? '#06cf9c' : '#e9edef' }}
        onClick={handleSend}
        isDisabled={!message.trim()}
        aria-label={message.trim() ? 'Send' : 'Voice message'}
      />
    </HStack>
  );
};

export default MessageInput;
