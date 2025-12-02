import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { FiEdit2, FiUserPlus, FiUserMinus } from "react-icons/fi";
import { MdGroupAdd } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/chatprovider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchChats, fetchMessages, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred! ❌",
        description: "Failed to load the search results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      toast({
        title: "Please enter a group name",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      fetchChats();
      setRenameLoading(false);
      setGroupChatName("");
      
      toast({
        title: "Group renamed successfully! ✨",
        description: `Group name changed to "${groupChatName}"`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title: "Failed to rename group ❌",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
      setRenameLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User already in group",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add users! 🔒",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      fetchChats();
      setLoading(false);
      
      toast({
        title: "User added successfully! 👥",
        description: `${user1.name} has been added to the group`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title: "Failed to add user ❌",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
      setLoading(false);
    }
  };

  const handleRemove = async (user1) => {
    // Check if user trying to leave is the admin
    if (user1._id === user._id && selectedChat.groupAdmin._id === user._id) {
      toast({
        title: "Admin cannot leave the group! 🔒",
        description: "Please transfer admin rights to another member before leaving",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove users! 🔒",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      fetchChats();
      fetchMessages();
      setLoading(false);
      
      toast({
        title: user1._id === user._id ? "Left the group 👋" : "User removed successfully! ✅",
        description: user1._id === user._id 
          ? "You have left the group"
          : `${user1.name} has been removed from the group`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title: "Failed to remove user ❌",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW="500px" mx={4}>
          <ModalHeader
            fontSize="28px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <MdGroupAdd />
            {selectedChat?.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <VStack w="100%" spacing={4}>
              {/* Group Members */}
              <Box w="100%">
                <Text fontSize="sm" fontWeight="600" mb={2} color="gray.600">
                  Group Members ({selectedChat?.users.length})
                </Text>
                <Box display="flex" flexWrap="wrap" w="100%">
                  {selectedChat?.users.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      admin={selectedChat.groupAdmin}
                      handleFunction={() => handleRemove(u)}
                    />
                  ))}
                </Box>
              </Box>

              {/* Rename Group */}
              <FormControl w="100%">
                <HStack spacing={2}>
                  <Input
                    placeholder="Enter new group name"
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    borderRadius="md"
                  />
                  <Button
                    colorScheme="teal"
                    onClick={handleRename}
                    isLoading={renameLoading}
                    loadingText="Updating..."
                    leftIcon={<FiEdit2 />}
                    minW="120px"
                  >
                    Rename
                  </Button>
                </HStack>
              </FormControl>

              {/* Add Users */}
              <FormControl w="100%">
                <Input
                  placeholder="Add users to group"
                  onChange={(e) => handleSearch(e.target.value)}
                  borderRadius="md"
                />
              </FormControl>

              {/* Search Results */}
              {loading ? (
                <VStack py={4}>
                  <Spinner size="lg" color="teal.500" />
                  <Text fontSize="sm" color="gray.500">
                    Searching...
                  </Text>
                </VStack>
              ) : (
                searchResult.length > 0 && (
                  <Box w="100%" maxH="200px" overflowY="auto">
                    {searchResult.slice(0, 4).map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleAddUser(user)}
                      />
                    ))}
                  </Box>
                )
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            {selectedChat?.groupAdmin?._id !== user?._id && (
              <Button
                onClick={() => handleRemove(user)}
                colorScheme="red"
                variant="outline"
                leftIcon={<FiUserMinus />}
              >
                Leave Group
              </Button>
            )}
            {selectedChat?.groupAdmin?._id === user?._id && (
              <Text fontSize="sm" color="gray.500" fontStyle="italic">
                Admin cannot leave the group
              </Text>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
