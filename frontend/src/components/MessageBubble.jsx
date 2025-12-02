import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { BsCheck2All } from 'react-icons/bs';

const MessageBubble = ({ message, isOwn }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Box
      alignSelf={isOwn ? 'flex-end' : 'flex-start'}
      maxW="70%"
      position="relative"
    >
      {!isOwn && message.senderName && (
        <Text fontSize="12px" fontWeight="700" color="blue.600" ml={3} mb={1}>
          {message.senderName}
        </Text>
      )}
      <Box
        bg={isOwn ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'}
        bgGradient={isOwn ? 'linear(135deg, blue.500, blue.600)' : undefined}
        color={isOwn ? 'white' : 'gray.800'}
        px={4}
        py={3}
        borderRadius="2xl"
        boxShadow="md"
        _hover={{ boxShadow: 'lg', transform: 'translateY(-1px)' }}
        transition="all 0.2s"
        position="relative"
        border={!isOwn ? '1px solid' : 'none'}
        borderColor={!isOwn ? 'gray.100' : undefined}
      >
        <Text fontSize="15px" lineHeight="1.5" mb={1} fontWeight="500">
          {message.content}
        </Text>
        <HStack 
          spacing={1.5} 
          justify="flex-end" 
          fontSize="11px" 
          color={isOwn ? 'whiteAlpha.900' : 'gray.500'}
          mt={2}
        >
          <Text fontWeight="600">{formatTime(message.timestamp)}</Text>
          {isOwn && (
            <BsCheck2All size={18} color="white" style={{ marginLeft: '2px' }} />
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default MessageBubble;
