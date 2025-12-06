import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  HStack,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Divider,
  AbsoluteCenter,
  Avatar,
  Center,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiMail, FiLock, FiUser, FiCamera, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";   // 🔥 replaced useHistory
import axios from "axios";
import { ChatState } from "../context/chatprovider";

function SignupPage() {
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();   // 🔥 new hook
  const { setUser } = ChatState();

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50, pink.50)",
    "linear(to-br, gray.900, purple.900, blue.900)"
  );
  const bgCardGlass = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(26, 32, 44, 0.9)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("gray.50", "gray.700");

  const submitSignup = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top ",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top ",
      });
      setLoading(false);
      return;
    }
    try {
      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post("/api/user/register", { name, email, password }, config);

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data); // Update context immediately

      setLoading(false);
      navigate("/chats");  
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center" justifyContent="center" p={4}>
      <Box
        maxW="lg"
        w="full"
        bg={bgCardGlass}
        backdropFilter="blur(30px)"
        shadow="2xl"
        rounded="3xl"
        border="2px"
        borderColor={borderColor}
        p={10}
        transform="auto"
        _hover={{ shadow: '3xl' }}
        transition="all 0.3s"
      >
        <Heading
          fontSize="3xl"
          textAlign="center"
          mb={2}
          bgGradient="linear(to-r, blue.600, purple.600)"
          bgClip="text"
          fontWeight="900"
        >
          Create an Account
        </Heading>
        <Text textAlign="center" mb={8} fontSize="md" fontWeight="500" color="gray.600">
          Join us and start chatting today
        </Text>

        <VStack spacing={6}>
          <Center w="100%" flexDirection="column">
            <Box position="relative" mb={3}>
              <Avatar size="2xl" src={preview} showBorder borderColor="blue.400" borderWidth="3px" boxShadow="xl" />
              <Box
                position="absolute"
                bottom="0"
                right="0"
                bg="blue.500"
                p={2}
                borderRadius="full"
                cursor="pointer"
                _hover={{ bg: 'blue.600', transform: 'scale(1.1)' }}
                transition="all 0.2s"
                onClick={() => document.getElementById("profilePicInput").click()}
              >
                <Icon as={FiCamera} color="white" boxSize={5} />
              </Box>
            </Box>
            <Button
              leftIcon={<FiCamera />}
              variant="outline"
              colorScheme="blue"
              borderWidth="2px"
              rounded="xl"
              size="sm"
              fontWeight="600"
              _hover={{ bg: 'blue.50', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              onClick={() => document.getElementById("profilePicInput").click()}
            >
              Upload Profile Picture
            </Button>
            <Input
              id="profilePicInput"
              type="file"
              accept="image/*"
              display="none"
              onChange={handlePicChange}
            />
          </Center>

          <FormControl>
            <FormLabel fontWeight="600" fontSize="sm" color="gray.700">Full Name</FormLabel>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiUser} color="gray.400" />
              </InputLeftElement>
              <Input 
                placeholder="John Doe" 
                bg={inputBg} 
                border="2px solid"
                borderColor="gray.200"
                rounded="xl"
                _hover={{ borderColor: 'gray.300' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #4299E1', bg: 'white' }}
                transition="all 0.2s"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="600" fontSize="sm" color="gray.700">Email Address</FormLabel>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiMail} color="gray.400" />
              </InputLeftElement>
              <Input 
                placeholder="you@example.com" 
                bg={inputBg}
                border="2px solid"
                borderColor="gray.200"
                rounded="xl"
                _hover={{ borderColor: 'gray.300' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #4299E1', bg: 'white' }}
                transition="all 0.2s"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="600" fontSize="sm" color="gray.700">Password</FormLabel>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                bg={inputBg}
                border="2px solid"
                borderColor="gray.200"
                rounded="xl"
                _hover={{ borderColor: 'gray.300' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #4299E1', bg: 'white' }}
                transition="all 0.2s"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  icon={showPassword ? <FiEyeOff /> : <FiEye />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="600" fontSize="sm" color="gray.700">Confirm Password</FormLabel>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                bg={inputBg}
                border="2px solid"
                borderColor="gray.200"
                rounded="xl"
                _hover={{ borderColor: 'gray.300' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #4299E1', bg: 'white' }}
                transition="all 0.2s"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            w="100%"
            size="lg"
            h="56px"
            bgGradient="linear(to-r, blue.500, blue.600)"
            color="white"
            rounded="xl"
            fontSize="lg"
            fontWeight="700"
            isLoading={loading}
            loadingText="Creating Account..."
            _hover={{ bgGradient: 'linear(to-r, blue.600, blue.700)', transform: 'translateY(-2px)', shadow: 'xl' }}
            _active={{ transform: 'translateY(0)' }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            onClick={submitSignup}
          >
            Create Account
          </Button>

          <Text fontSize="sm" fontWeight="500">
            Already have an account?{" "}
            <Link color="blue.600" fontWeight="700" _hover={{ color: 'blue.700', textDecoration: 'underline' }} onClick={() => navigate("/login")}>
              Log in
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default SignupPage;
