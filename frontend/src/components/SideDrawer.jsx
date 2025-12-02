import React, { useState } from 'react';
import { 
  Box, VStack, HStack, Avatar, Text, Input, InputGroup, InputLeftElement,
  IconButton, Drawer, DrawerContent, DrawerOverlay, Badge, Tooltip, Spinner, 
  Menu, MenuButton, MenuList, MenuItem, useToast, useDisclosure,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, Button
} from '@chakra-ui/react';
import { FiSearch, FiMenu, FiMoreVertical } from 'react-icons/fi';
import { BsChatLeftText, BsPersonPlus } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { AiOutlineWarning } from 'react-icons/ai';
import GroupChatModal from './chatpage/GroupChatModal';
import NewChatModal from './chatpage/NewChatModal';
import { ChatState } from '../context/chatprovider';
import axios from 'axios';

const ChatListItem = ({ chat, isActive, onClick }) => {
  const toast = useToast();
  const { user, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = React.useRef();

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

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onOpen();
  };

  const handleDeleteChat = async () => {
    setIsDeleting(true);
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      await axios.delete(`/api/chat/${chat.id}`, config);
      
      setChats((prevChats) => prevChats.filter((c) => c.id !== chat.id));
      
      toast({
        title: "Chat deleted successfully! 🗑️",
        description: `"${chat.name}" has been removed from your chats`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "subtle",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Failed to delete chat ❌",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
        position="relative"
        role="group"
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
            <Text fontWeight="600" fontSize="15px" color="gray.800" noOfLines={1}>
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
        <Tooltip 
          label="Delete chat" 
          placement="top" 
          hasArrow
          bg="red.600"
        >
          <IconButton
            icon={<BiTrash size={18} />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            aria-label="Delete chat"
            opacity={0}
            _groupHover={{ opacity: 1 }}
            onClick={handleDeleteClick}
            transition="all 0.2s"
            _hover={{ 
              bg: 'red.50',
              transform: 'scale(1.1)'
            }}
          />
        </Tooltip>
      </HStack>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" alignItems="center" gap={2}>
              <Box as={AiOutlineWarning} color="red.500" size="24px" />
              Delete Chat?
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack align="start" spacing={2}>
                <Text>
                  Are you sure you want to delete <Text as="span" fontWeight="bold">"{chat.name}"</Text>?
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {chat.isGroupChat 
                    ? "This will delete the group for all members. This action cannot be undone."
                    : "This will delete the chat permanently. This action cannot be undone."}
                </Text>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button 
                ref={cancelRef} 
                onClick={onClose}
                variant="ghost"
                isDisabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={handleDeleteChat} 
                ml={3}
                isLoading={isDeleting}
                loadingText="Deleting..."
                leftIcon={<BiTrash />}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const SideDrawer = ({ chats, activeChat, onSelectChat, currentUser, isOpen, onClose, onOpen, isMobile, fetchChats, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats ? chats.filter(chat => 
    chat.name && chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <>
      {isMobile ? (
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
                    <Avatar name={currentUser?.avatar} size="sm" />
                    <Text fontWeight="600" fontSize="md">
                      {currentUser?.name}
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Menu>
                      <Tooltip label="New Chat">
                        <MenuButton
                          as={IconButton}
                          icon={<BsPersonPlus />}
                          variant="ghost"
                          size="sm"
                          borderRadius="full"
                          aria-label="New Chat"
                        />
                      </Tooltip>
                      <MenuList>
                        <NewChatModal>
                          <MenuItem icon={<BsPersonPlus />}>New Chat</MenuItem>
                        </NewChatModal>
                        <GroupChatModal fetchChats={fetchChats}>
                          <MenuItem icon={<BsChatLeftText />}>New Group</MenuItem>
                        </GroupChatModal>
                      </MenuList>
                    </Menu>
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
                  {loading ? (
                    <VStack py={8}>
                      <Spinner size="lg" color="blue.500" />
                      <Text color="gray.500" fontSize="sm">Loading chats...</Text>
                    </VStack>
                  ) : filteredChats.length > 0 ? (
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
                        {searchQuery ? 'No chats found' : 'No chats yet. Create a group or start a conversation!'}
                      </Text>
                    </VStack>
                  )}
                </VStack>
              </Box>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
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
              <Avatar name={currentUser?.avatar} size="sm" />
              <Text fontWeight="600" fontSize="md">
                {currentUser?.name}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Menu>
                <Tooltip label="New Chat">
                  <MenuButton
                    as={IconButton}
                    icon={<BsPersonPlus />}
                    variant="ghost"
                    size="sm"
                    borderRadius="full"
                    aria-label="New Chat"
                  />
                </Tooltip>
                <MenuList>
                  <NewChatModal>
                    <MenuItem icon={<BsPersonPlus />}>New Chat</MenuItem>
                  </NewChatModal>
                  <GroupChatModal fetchChats={fetchChats}>
                    <MenuItem icon={<BsChatLeftText />}>New Group</MenuItem>
                  </GroupChatModal>
                </MenuList>
              </Menu>
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
            {loading ? (
              <VStack py={8}>
                <Spinner size="lg" color="blue.500" />
                <Text color="gray.500" fontSize="sm">Loading chats...</Text>
              </VStack>
            ) : filteredChats.length > 0 ? (
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
                  {searchQuery ? 'No chats found' : 'No chats yet. Create a group or start a conversation!'}
                </Text>
              </VStack>
            )}
          </VStack>
        </Box>
      )}
    </>
  );
};

export default SideDrawer;
