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
    >
      <Box
        maxW="md"
        w="full"
        bg={bgCardGlass}
        backdropFilter="blur(20px)"
        shadow="2xl"
        rounded="3xl"
        border="1px"
        borderColor={borderColor}
        p={8}
      >
        <Heading
          size="lg"
          textAlign="center"
          mb={3}
          bgGradient="linear(to-r, blue.600, blue.400)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Welcome Back
        </Heading>
        <Text textAlign="center" color={textSecondary} mb={6} fontSize="sm">
          Login to continue
        </Text>

        <VStack spacing={5}>
          {/* Email */}
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FiMail} />
              </InputLeftElement>
              <Input
                placeholder="you@example.com"
                bg={inputBg}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          {/* Password */}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FiLock} />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                bg={inputBg}
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
            bgGradient="linear(to-r, blue.500, blue.600)"
            color="white"
            rounded="xl"
            onClick={() => {SubmitLogin()}}
          >
            Sign In
          </Button>

          <Text fontSize="sm">
            Don't have an account?{" "}
            <Link color="blue.500" onClick={() => navigate("/signup")}>
              Sign up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default LoginPage;
