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
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";    
import axios from "axios";
import { ChatState } from "../context/chatprovider";
  
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();    
  const toast = useToast();
  const { setUser } = ChatState();

  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50, pink.50)",
    "linear(to-br, gray.900, purple.900, blue.900)"
  );
  const bgCard = useColorModeValue("white", "gray.800");
  const bgCardGlass = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(26, 32, 44, 0.9)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const inputBg = useColorModeValue("gray.50", "gray.700");

  const SubmitLogin = async () => {
  if (!email || !password) {
    toast({
      title: "Please fill all fields",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }

  try {
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post("/api/user/login", { email, password }, config);

    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data); // Update context immediately

    toast({
      title: "Login Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

    navigate("/chats");
  } catch (error) {
    toast({
      title: "Error Occurred!",
      description: error.response?.data?.message || error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }
};


  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
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
          Welcome Back
        </Heading>
        <Text textAlign="center" color={textSecondary} mb={8} fontSize="md" fontWeight="500">
          Login to continue your conversations
        </Text>

        <VStack spacing={6}>
          {/* Email */}
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

          {/* Password */}
          <FormControl>
            <FormLabel fontWeight="600" fontSize="sm" color="gray.700">Password</FormLabel>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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

          {/* Submit */}
          <Button
            w="100%"
            size="lg"
            h="56px"
            bgGradient="linear(to-r, blue.500, blue.600)"
            color="white"
            rounded="xl"
            fontSize="lg"
            fontWeight="700"
            _hover={{ bgGradient: 'linear(to-r, blue.600, blue.700)', transform: 'translateY(-2px)', shadow: 'xl' }}
            _active={{ transform: 'translateY(0)' }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            onClick={() => {SubmitLogin()}}
          >
            Sign In
          </Button>

          <Text fontSize="sm" fontWeight="500">
            Don't have an account?{" "}
            <Link color="blue.600" fontWeight="700" _hover={{ color: 'blue.700', textDecoration: 'underline' }} onClick={() => navigate("/signup")}>
              Sign up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default LoginPage;
