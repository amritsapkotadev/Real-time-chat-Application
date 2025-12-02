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
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  VStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/chatprovider";
import UserListItem from "../userAvatar/UserListItem";

const NewChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const toast = useToast();

  const { user, setChats } = ChatState();

  // Debug: Check if user is loaded
  const handleModalOpen = () => {
    if (!user) {
      toast({
        title: "Please login first! 🔐",
        description: "You need to be logged in to start a chat",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    onOpen();
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }

    if (!user || !user.token) {
      toast({
        title: "Authentication Error! 🔒",
        description: "Please login again to continue",
        status: "error",
        duration: 3000,
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
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      console.error("Search error:", error.response || error);
      toast({
        title: "Failed to load search results ❌",
        description: error.response?.data?.message || error.message || "Please check your connection and try again",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const accessChat = async (userId) => {
    if (!user || !user.token) {
      toast({
        title: "Authentication Error! 🔒",
        description: "Please login again to continue",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      // Check if chat already exists in the list
      setChats((prevChats) => {
        const chatExists = prevChats.find((c) => c._id === data._id);
        if (!chatExists) {
          return [data, ...prevChats];
        }
        return prevChats;
      });

      setLoadingChat(false);
      onClose();
      toast({
        title: "Chat started! 💬",
        description: "You can now start messaging",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      setLoadingChat(false);
      console.error("Access chat error:", error.response || error);
      toast({
        title: "Failed to create chat ❌",
        description: error.response?.data?.message || error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <span onClick={handleModalOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent mx={4}>
          <ModalHeader
            fontSize="24px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            pb={2}
          >
            Start New Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <InputGroup mb={3}>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search users by name or email"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </InputGroup>

            {loading ? (
              <VStack py={4}>
                <Spinner size="lg" color="blue.500" />
                <Text fontSize="sm" color="gray.500">
                  Searching...
                </Text>
              </VStack>
            ) : searchResult.length > 0 ? (
              <VStack w="100%" align="stretch" maxH="300px" overflowY="auto">
                {searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
              </VStack>
            ) : search && !loading ? (
              <Text color="gray.500" fontSize="sm" py={4}>
                No users found
              </Text>
            ) : (
              <Text color="gray.400" fontSize="sm" py={4}>
                Type to search for users
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            {loadingChat && <Spinner size="sm" mr={3} />}
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewChatModal;
