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
      maxW="65%"
      position="relative"
    >
      <Box
        bg={isOwn ? '#d9fdd3' : 'white'}
        color="#111"
        px={3}
        py={2}
        borderRadius="lg"
        boxShadow="0 1px 0.5px rgba(0,0,0,0.13)"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: '0',
          [isOwn ? 'right' : 'left']: '-8px',
          width: '0',
          height: '0',
          borderStyle: 'solid',
          borderWidth: isOwn ? '0 0 10px 10px' : '0 10px 10px 0',
          borderColor: isOwn 
            ? 'transparent transparent #d9fdd3 transparent'
            : 'transparent white transparent transparent',
        }}
      >
        <Text fontSize="14.2px" lineHeight="19px" mb={1}>
          {message.content}
        </Text>
        <HStack 
          spacing={1} 
          justify="flex-end" 
          fontSize="11px" 
          color="#667781"
        >
          <Text>{formatTime(message.timestamp)}</Text>
          {isOwn && (
            <BsCheck2All size={16} color="#53bdeb" />
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default MessageBubble;
