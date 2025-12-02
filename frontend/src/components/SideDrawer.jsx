import React, { useState } from 'react';
import { 
  Box, VStack, HStack, Avatar, Text, Input, InputGroup, InputLeftElement,
  IconButton, Drawer, DrawerContent, DrawerOverlay, Badge, Tooltip
} from '@chakra-ui/react';
import { FiSearch, FiMenu, FiMoreVertical } from 'react-icons/fi';
import { BsChatLeftText } from 'react-icons/bs';

const ChatListItem = ({ chat, isActive, onClick }) => {
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  return (
    <HStack
      p={3}
      cursor="pointer"
      bg={isActive ? '#f0f2f5' : 'transparent'}
      _hover={{ bg: '#f5f6f6' }}
      onClick={onClick}
      transition="all 0.2s"
      borderBottom="1px solid"
      borderColor="gray.100"
      spacing={3}
    >
      <Box position="relative">
        <Avatar name={chat.avatar} size="md" />
        {chat.isOnline && (
          <Box
            position="absolute"
            bottom="0"
            right="0"
            w="12px"
            h="12px"
            bg="green.400"
            borderRadius="full"
            border="2px solid white"
          />
        )}
      </Box>
      <VStack flex="1" align="stretch" spacing={0.5}>
        <HStack justify="space-between">
          <Text fontWeight="600" fontSize="15px" color="gray.800">
            {chat.name}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {formatTime(chat.timestamp)}
          </Text>
        </HStack>
        <HStack justify="space-between">
          <Text 
            fontSize="sm" 
            color="gray.600" 
            noOfLines={1}
            flex="1"
          >
            {chat.lastMessage}
          </Text>
          {chat.unread > 0 && (
            <Badge 
              colorScheme="green" 
              borderRadius="full" 
              px={2}
              fontSize="xs"
            >
              {chat.unread}
            </Badge>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
};

const SideDrawer = ({ chats, activeChat, onSelectChat, currentUser, isOpen, onClose, onOpen, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SidebarContent = () => (
    <Box h="100%" display="flex" flexDirection="column" bg="white">
      {/* User Profile Header */}
      <HStack 
        p={4} 
        bg="#f0f2f5" 
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <HStack spacing={3}>
          <Avatar name={currentUser.avatar} size="sm" />
          <Text fontWeight="600" fontSize="md">
            {currentUser.name}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Tooltip label="New chat">
            <IconButton
              icon={<BsChatLeftText />}
              variant="ghost"
              size="sm"
              borderRadius="full"
              aria-label="New chat"
            />
          </Tooltip>
          <Tooltip label="Menu">
            <IconButton
              icon={<FiMoreVertical />}
              variant="ghost"
              size="sm"
              borderRadius="full"
              aria-label="Menu"
            />
          </Tooltip>
        </HStack>
      </HStack>

      {/* Search Bar */}
      <Box p={3} bg="white">
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="#54656f" />
          </InputLeftElement>
          <Input 
            placeholder="Search or start new chat" 
            bg="#f0f2f5"
            border="none"
            borderRadius="lg"
            _focus={{ bg: 'white', border: '1px solid', borderColor: 'blue.400' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </Box>

      {/* Chat List */}
      <VStack 
        flex="1" 
        align="stretch" 
        spacing={0} 
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={activeChat?.id === chat.id}
              onClick={() => onSelectChat(chat)}
            />
          ))
        ) : (
          <VStack py={8} spacing={2}>
            <Text color="gray.500" fontSize="sm">
              No chats found
            </Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          icon={<FiMenu />}
          onClick={onOpen}
          position="fixed"
          top={4}
          left={4}
          zIndex={10}
          colorScheme="blue"
          borderRadius="full"
          size="lg"
          aria-label="Open menu"
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent />
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return <SidebarContent />;
};

export default SideDrawer;
