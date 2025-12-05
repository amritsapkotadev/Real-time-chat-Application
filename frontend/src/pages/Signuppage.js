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
    <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center" justifyContent="center">
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
          Create an Account
        </Heading>
        <Text textAlign="center" mb={6} fontSize="sm">
          Signup to get started
        </Text>

        <VStack spacing={5}>
          <Center w="100%" flexDirection="column">
            <Avatar size="xl" src={preview} mb={2} showBorder borderColor="blue.400" />
            <Button
              leftIcon={<FiCamera />}
              variant="outline"
              rounded="xl"
              size="sm"
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
            <FormLabel>Full Name</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FiUser} />
              </InputLeftElement>
              <Input placeholder="John Doe" bg={inputBg} value={name} onChange={(e) => setName(e.target.value)} />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FiMail} />
              </InputLeftElement>
              <Input placeholder="you@example.com" bg={inputBg} value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FiLock} />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FiLock} />
              </InputLeftElement>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                bg={inputBg}
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
            bgGradient="linear(to-r, blue.500, blue.600)"
            color="white"
            rounded="xl"
            onClick={submitSignup}
          >
            Create Account
          </Button>

          <Text fontSize="sm">
            Already have an account?{" "}
            <Link color="blue.500" onClick={() => navigate("/login")}>
              Log in
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default SignupPage;
