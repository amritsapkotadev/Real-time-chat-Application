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
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occurred!",
        description: "Failed to load the search results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
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
        title: "Chat started!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      setLoadingChat(false);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="24px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
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
