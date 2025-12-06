import React, { useState } from 'react';
import { 
  Box, VStack, HStack, Avatar, Text, Input, InputGroup, InputLeftElement,
  IconButton, Drawer, DrawerContent, DrawerOverlay, Badge, Tooltip, Spinner, 
  Menu, MenuButton, MenuList, MenuItem, useToast, useDisclosure,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, Button
} from '@chakra-ui/react';
import { FiSearch, FiMenu, FiMoreVertical, FiLogOut, FiUser, FiSettings, FiBell } from 'react-icons/fi';
import { MdGroupAdd } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { AiOutlineWarning, AiOutlinePlus } from 'react-icons/ai';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import GroupChatModal from './chatpage/GroupChatModal';
import NewChatModal from './chatpage/NewChatModal';
import { ChatState } from '../context/chatprovider';
import axios from 'axios';

const ChatListItem = ({ chat, isActive, onClick, hasNotification }) => {
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
        bg={isActive ? '#f0f2f5' : hasNotification ? '#e3f2fd' : 'transparent'}
        _hover={{ bg: isActive ? '#f0f2f5' : hasNotification ? '#bbdefb' : '#f5f6f6' }}
        onClick={onClick}
        transition="all 0.2s"
        borderBottom="1px solid"
        borderColor="gray.100"
        borderLeft={hasNotification ? "3px solid" : "3px solid transparent"}
        borderLeftColor={hasNotification ? "blue.500" : "transparent"}
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
            <HStack spacing={2} flex="1">
              <Text 
                fontWeight={hasNotification ? "700" : "600"} 
                fontSize="15px" 
                color={hasNotification ? "gray.900" : "gray.800"} 
                noOfLines={1}
                flex="1"
              >
                {chat.name}
              </Text>
              {hasNotification && (
                <Box
                  w="8px"
                  h="8px"
                  bg="blue.500"
                  borderRadius="full"
                  flexShrink={0}
                />
              )}
            </HStack>
            <Text fontSize="xs" color={hasNotification ? "blue.600" : "gray.500"} fontWeight={hasNotification ? "600" : "400"}>
              {formatTime(chat.timestamp)}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text 
              fontSize="sm" 
              color={hasNotification ? "gray.800" : "gray.600"}
              fontWeight={hasNotification ? "600" : "400"}
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
  const toast = useToast();
  const { notification, setNotification, user } = ChatState();

  // Format chat data for display
  const formatChatForDisplay = (chat) => {
    if (!chat) return null;
    
    // For group chats
    if (chat.isGroupChat) {
      return {
        id: chat._id,
        name: chat.chatName,
        lastMessage: chat.latestMessage?.content || 'No messages yet',
        timestamp: chat.latestMessage?.createdAt ? new Date(chat.latestMessage.createdAt) : new Date(chat.updatedAt),
        unread: 0,
        isOnline: false,
        avatar: chat.chatName,
        isGroupChat: true,
        users: chat.users,
        groupAdmin: chat.groupAdmin
      };
    }
    
    // For one-on-one chats
    const otherUser = chat.users?.find(u => u._id !== user._id);
    return {
      id: chat._id,
      name: otherUser?.name || 'Unknown User',
      lastMessage: chat.latestMessage?.content || 'Start a conversation',
      timestamp: chat.latestMessage?.createdAt ? new Date(chat.latestMessage.createdAt) : new Date(chat.updatedAt),
      unread: 0,
      isOnline: false,
      avatar: otherUser?.name || 'Unknown',
      isGroupChat: false,
      users: chat.users
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast({
      title: "Logged out successfully! 👋",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

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
                  p={5} 
                  bgGradient="linear(to-r, #4299E1, #3182CE, #2C5282)"
                  justify="space-between"
                  boxShadow="xl"
                  borderBottom="1px solid"
                  borderColor="blue.700"
                >
                  <HStack spacing={3}>
                    <Avatar name={currentUser?.avatar} size="sm" bg="white" color="blue.600" />
                    <Text fontWeight="700" fontSize="md" color="white">
                      {currentUser?.name}
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Menu>
                      <Tooltip label="Notifications" hasArrow placement="bottom">
                        <Box position="relative">
                          <MenuButton
                            as={IconButton}
                            icon={<FiBell size={20} />}
                            variant="ghost"
                            size="md"
                            borderRadius="full"
                            aria-label="Notifications"
                            color="white"
                            _hover={{ bg: 'whiteAlpha.200' }}
                          />
                          {notification && notification.length > 0 && (
                            <Badge
                              position="absolute"
                              top="-1"
                              right="-1"
                              colorScheme="red"
                              borderRadius="full"
                              fontSize="10px"
                              minW="18px"
                              h="18px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              {notification.length}
                            </Badge>
                          )}
                        </Box>
                      </Tooltip>
                      <MenuList
                        shadow="xl"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="xl"
                        p={0}
                        minW="350px"
                        maxH="450px"
                        overflowY="auto"
                        css={{
                          '&::-webkit-scrollbar': {
                            width: '6px',
                          },
                          '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: '#cbd5e0',
                            borderRadius: '3px',
                          },
                        }}
                      >
                        <Box p={3} borderBottom="1px solid" borderColor="gray.100">
                          <Text fontWeight="700" fontSize="md" color="gray.800">
                            Notifications
                          </Text>
                        </Box>
                        {!notification || notification.length === 0 ? (
                          <VStack py={8} spacing={2}>
                            <Box fontSize="3xl">🔕</Box>
                            <Text fontSize="sm" color="gray.500" fontWeight="500">
                              No new notifications
                            </Text>
                            <Text fontSize="xs" color="gray.400">
                              You're all caught up!
                            </Text>
                          </VStack>
                        ) : (
                          <VStack spacing={0} align="stretch">
                            {notification.map((notif, index) => (
                              <MenuItem
                                key={notif._id}
                                onClick={() => {
                                  onSelectChat(formatChatForDisplay(notif.chat));
                                  setNotification(notification.filter((n) => n._id !== notif._id));
                                }}
                                _hover={{ bg: 'blue.50' }}
                                bg="white"
                                p={0}
                                borderBottom={index < notification.length - 1 ? "1px solid" : "none"}
                                borderColor="gray.100"
                              >
                                <HStack spacing={3} p={3} w="100%" align="start">
                                  <Box position="relative">
                                    <Avatar 
                                      name={notif.sender.name} 
                                      size="md"
                                      bg="blue.500"
                                    />
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
                                  </Box>
                                  <VStack align="start" spacing={0.5} flex="1">
                                    <HStack justify="space-between" w="100%">
                                      <Text fontWeight="700" fontSize="sm" color="gray.800">
                                        {notif.chat.isGroupChat
                                          ? notif.chat.chatName
                                          : notif.sender.name}
                                      </Text>
                                      <Text fontSize="xs" color="gray.500">
                                        now
                                      </Text>
                                    </HStack>
                                    {notif.chat.isGroupChat && (
                                      <Text fontSize="xs" color="blue.600" fontWeight="600">
                                        {notif.sender.name}
                                      </Text>
                                    )}
                                    <Text fontSize="sm" color="gray.700" noOfLines={2} mt={0.5}>
                                      {notif.content}
                                    </Text>
                                  </VStack>
                                  <Box
                                    w="8px"
                                    h="8px"
                                    bg="blue.500"
                                    borderRadius="full"
                                    flexShrink={0}
                                  />
                                </HStack>
                              </MenuItem>
                            ))}
                          </VStack>
                        )}
                      </MenuList>
                    </Menu>
                    <Menu>
                      <Tooltip label="Start new chat" hasArrow placement="bottom">
                        <MenuButton
                          as={IconButton}
                          icon={<AiOutlinePlus size={20} />}
                          variant="ghost"
                          size="md"
                          borderRadius="full"
                          aria-label="New Chat"
                          color="white"
                          _hover={{ 
                            bg: 'whiteAlpha.200',
                            transform: 'rotate(90deg)',
                            transition: 'all 0.3s'
                          }}
                        />
                      </Tooltip>
                      <MenuList 
                        shadow="lg" 
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="lg"
                        py={2}
                        minW="200px"
                      >
                        <NewChatModal>
                          <MenuItem 
                            icon={<IoChatbubbleEllipsesOutline size={18} />}
                            _hover={{ bg: 'blue.50' }}
                            fontWeight="500"
                          >
                            New Chat
                          </MenuItem>
                        </NewChatModal>
                        <GroupChatModal fetchChats={fetchChats}>
                          <MenuItem 
                            icon={<MdGroupAdd size={18} />}
                            _hover={{ bg: 'blue.50' }}
                            fontWeight="500"
                          >
                            New Group
                          </MenuItem>
                        </GroupChatModal>
                      </MenuList>
                    </Menu>
                    <Menu>
                      <Tooltip label="Menu" hasArrow placement="bottom">
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreVertical size={18} />}
                          variant="ghost"
                          size="md"
                          borderRadius="full"
                          aria-label="Menu"
                          color="white"
                          _hover={{ bg: 'whiteAlpha.200' }}
                        />
                      </Tooltip>
                      <MenuList
                        shadow="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="lg"
                        py={2}
                        minW="200px"
                      >
                        <MenuItem 
                          icon={<FiUser size={18} />}
                          _hover={{ bg: 'gray.50' }}
                          fontWeight="500"
                          onClick={() => {
                            toast({
                              title: "Profile Feature 🚧",
                              description: "Profile management is under development. Coming soon!",
                              status: "success",
                              duration: 3000,
                              isClosable: true,
                              position: "top",
                            });
                          }}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem 
                          icon={<FiSettings size={18} />}
                          _hover={{ bg: 'gray.50' }}
                          fontWeight="500"
                          onClick={() => {
                            toast({
                              title: "Settings Feature 🚧",
                              description: "Settings page is under development. Stay tuned!",
                              status: "warning",
                              duration: 3000,
                              isClosable: true,
                              position: "top",
                            });
                          }}
                        >
                          Settings
                        </MenuItem>
                        <MenuItem 
                          icon={<FiLogOut size={18} />}
                          _hover={{ bg: 'red.50', color: 'red.600' }}
                          fontWeight="500"
                          onClick={handleLogout}
                        >
                          Logout
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </HStack>

                {/* Search Bar */}
                <Box px={4} py={4} bg="gray.50" borderBottom="2px solid" borderColor="gray.200">
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiSearch color="gray" size={18} />
                    </InputLeftElement>
                    <Input 
                      placeholder="Search chats" 
                      bg="white"
                      border="2px solid"
                      borderColor="gray.200"
                      borderRadius="xl"
                      _hover={{ borderColor: 'blue.300' }}
                      _focus={{ bg: 'white', borderColor: 'blue.500', boxShadow: '0 0 0 1px #4299E1' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      fontWeight="500"
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
                        hasNotification={notification?.some(n => n.chat._id === chat.id)}
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
            p={5} 
            bgGradient="linear(to-r, #4299E1, #3182CE, #2C5282)"
            justify="space-between"
            boxShadow="xl"
            borderBottom="1px solid"
            borderColor="blue.700"
          >
            <HStack spacing={3}>
              <Avatar name={currentUser?.avatar} size="sm" bg="white" color="blue.600" />
              <Text fontWeight="700" fontSize="md" color="white">
                {currentUser?.name}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Menu>
                <Tooltip label="Notifications" hasArrow placement="bottom">
                  <Box position="relative">
                    <MenuButton
                      as={IconButton}
                      icon={<FiBell size={20} />}
                      variant="ghost"
                      size="md"
                      borderRadius="full"
                      aria-label="Notifications"
                      color="white"
                      _hover={{ bg: 'whiteAlpha.200' }}
                    />
                    {notification && notification.length > 0 && (
                      <Badge
                        position="absolute"
                        top="-1"
                        right="-1"
                        colorScheme="red"
                        borderRadius="full"
                        fontSize="10px"
                        minW="18px"
                        h="18px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {notification.length}
                      </Badge>
                    )}
                  </Box>
                </Tooltip>
                <MenuList
                  shadow="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="xl"
                  p={0}
                  minW="350px"
                  maxH="450px"
                  overflowY="auto"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#cbd5e0',
                      borderRadius: '3px',
                    },
                  }}
                >
                  <Box p={3} borderBottom="1px solid" borderColor="gray.100">
                    <Text fontWeight="700" fontSize="md" color="gray.800">
                      Notifications
                    </Text>
                  </Box>
                  {!notification || notification.length === 0 ? (
                    <VStack py={8} spacing={2}>
                      <Box fontSize="3xl">🔕</Box>
                      <Text fontSize="sm" color="gray.500" fontWeight="500">
                        No new notifications
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        You're all caught up!
                      </Text>
                    </VStack>
                  ) : (
                    <VStack spacing={0} align="stretch">
                      {notification.map((notif, index) => (
                        <MenuItem
                          key={notif._id}
                          onClick={() => {
                            onSelectChat(formatChatForDisplay(notif.chat));
                            setNotification(notification.filter((n) => n._id !== notif._id));
                          }}
                          _hover={{ bg: 'blue.50' }}
                          bg="white"
                          p={0}
                          borderBottom={index < notification.length - 1 ? "1px solid" : "none"}
                          borderColor="gray.100"
                        >
                          <HStack spacing={3} p={3} w="100%" align="start">
                            <Box position="relative">
                              <Avatar 
                                name={notif.sender.name} 
                                size="md"
                                bg="blue.500"
                              />
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
                            </Box>
                            <VStack align="start" spacing={0.5} flex="1">
                              <HStack justify="space-between" w="100%">
                                <Text fontWeight="700" fontSize="sm" color="gray.800">
                                  {notif.chat.isGroupChat
                                    ? notif.chat.chatName
                                    : notif.sender.name}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  now
                                </Text>
                              </HStack>
                              {notif.chat.isGroupChat && (
                                <Text fontSize="xs" color="blue.600" fontWeight="600">
                                  {notif.sender.name}
                                </Text>
                              )}
                              <Text fontSize="sm" color="gray.700" noOfLines={2} mt={0.5}>
                                {notif.content}
                              </Text>
                            </VStack>
                            <Box
                              w="8px"
                              h="8px"
                              bg="blue.500"
                              borderRadius="full"
                              flexShrink={0}
                            />
                          </HStack>
                        </MenuItem>
                      ))}
                    </VStack>
                  )}
                </MenuList>
              </Menu>
              <Menu>
                <Tooltip label="Start new chat" hasArrow placement="bottom">
                  <MenuButton
                    as={IconButton}
                    icon={<AiOutlinePlus size={20} />}
                    variant="ghost"
                    size="md"
                    borderRadius="full"
                    aria-label="New Chat"
                    color="white"
                    _hover={{ 
                      bg: 'whiteAlpha.200',
                      transform: 'rotate(90deg)',
                      transition: 'all 0.3s'
                    }}
                  />
                </Tooltip>
                <MenuList 
                  shadow="lg" 
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="lg"
                  py={2}
                  minW="200px"
                >
                  <NewChatModal>
                    <MenuItem 
                      icon={<IoChatbubbleEllipsesOutline size={18} />}
                      _hover={{ bg: 'blue.50' }}
                      fontWeight="500"
                    >
                      New Chat
                    </MenuItem>
                  </NewChatModal>
                  <GroupChatModal fetchChats={fetchChats}>
                    <MenuItem 
                      icon={<MdGroupAdd size={18} />}
                      _hover={{ bg: 'blue.50' }}
                      fontWeight="500"
                    >
                      New Group
                    </MenuItem>
                  </GroupChatModal>
                </MenuList>
              </Menu>
              <Menu>
                <Tooltip label="Menu" hasArrow placement="bottom">
                  <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical size={18} />}
                    variant="ghost"
                    size="md"
                    borderRadius="full"
                    aria-label="Menu"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                  />
                </Tooltip>
                <MenuList
                  shadow="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="lg"
                  py={2}
                  minW="200px"
                >
                  <MenuItem 
                    icon={<FiUser size={18} />}
                    _hover={{ bg: 'gray.50' }}
                    fontWeight="500"
                    onClick={() => {
                      toast({
                        title: "Profile Feature 🚧",
                        description: "Profile management is under development. Coming soon!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                      });
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem 
                    icon={<FiSettings size={18} />}
                    _hover={{ bg: 'gray.50' }}
                    fontWeight="500"
                    onClick={() => {
                      toast({
                        title: "Settings Feature 🚧",
                        description: "Settings page is under development. Stay tuned!",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                      });
                    }}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem 
                    icon={<FiLogOut size={18} />}
                    _hover={{ bg: 'red.50', color: 'red.600' }}
                    fontWeight="500"
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>

                {/* Search Bar */}
                <Box px={4} py={3} bg="white" borderBottom="1px solid" borderColor="gray.100">
                  <InputGroup size="md">
                    <InputLeftElement pointerEvents="none">
                      <FiSearch color="gray" />
                    </InputLeftElement>
                    <Input 
                      placeholder="Search chats" 
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="xl"
                      _hover={{ borderColor: 'blue.300', bg: 'white' }}
                      _focus={{ bg: 'white', borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      fontWeight="500"
                    />
                  </InputGroup>
                </Box>          {/* Chat List */}
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
                  hasNotification={notification?.some(n => n.chat._id === chat.id)}
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
