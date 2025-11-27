import React, { useState } from "react";
import {
  Container,
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
} from "@chakra-ui/react";

import { FiMail, FiLock, FiUser, FiGithub, FiCamera, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

function Homepage() {
  const [selected, setSelected] = useState("login");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setPreview(URL.createObjectURL(file));
  };

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
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="md" py={10} position="relative">
        {/* MAIN CARD */}
        <Box
          bg={bgCardGlass}
          backdropFilter="blur(20px)"
          shadow="2xl"
          rounded="3xl"
          border="1px"
          borderColor={borderColor}
          overflow="hidden"
        >
          {/* TOGGLE BUTTONS */}
          <Box p={6} pb={4}>
            <HStack spacing={0} w="100%" bg={inputBg} p={1.5} rounded="2xl">
              <Button
                flex={1}
                rounded="xl"
                bg={selected === "login" ? bgCard : "transparent"}
                color={selected === "login" ? "blue.600" : textSecondary}
                fontWeight="bold"
                onClick={() => setSelected("login")}
              >
                Login
              </Button>

              <Button
                flex={1}
                rounded="xl"
                bg={selected === "signup" ? bgCard : "transparent"}
                color={selected === "signup" ? "blue.600" : textSecondary}
                fontWeight="bold"
                onClick={() => setSelected("signup")}
              >
                Sign Up
              </Button>
            </HStack>
          </Box>

          {/* FORM */}
          <Box px={8} pb={8}>
            <Heading
              size="lg"
              textAlign="center"
              mb={3}
              bgGradient="linear(to-r, blue.600, blue.400)"
              bgClip="text"
              fontWeight="extrabold"
            >
              {selected === "login" ? "Welcome Back" : "Create an Account"}
            </Heading>

            <Text textAlign="center" color={textSecondary} mb={6} fontSize="sm">
              {selected === "login"
                ? "Login to continue"
                : "Signup to get started"}
            </Text>

            {selected === "login" ? (
              /* LOGIN FORM */
              <VStack spacing={5}>
                {/* Email */}
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement><Icon as={FiMail} /></InputLeftElement>
                    <Input placeholder="you@example.com" bg={inputBg} />
                  </InputGroup>
                </FormControl>

                {/* Password */}
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement><Icon as={FiLock} /></InputLeftElement>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      bg={inputBg} 
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

                <HStack w="100%" justify="flex-end">
                  <Link color="blue.500">Forgot Password?</Link>
                </HStack>

                {/* Submit */}
                <Button
                  w="100%"
                  size="lg"
                  bgGradient="linear(to-r, blue.500, blue.600)"
                  color="white"
                  rounded="xl"
                >
                  Sign In
                </Button>

                {/* Divider */}
                <Box position="relative" w="100%" py={4}>
                  <Divider />
                  <AbsoluteCenter bg={bgCardGlass} px={4}>
                    <Text fontSize="sm">or continue with</Text>
                  </AbsoluteCenter>
                </Box>

                {/* Social */}
                <HStack w="100%" spacing={3}>
                  <Button flex={1} variant="outline" leftIcon={<FcGoogle />}>
                    Google
                  </Button>
                  <Button flex={1} variant="outline" leftIcon={<FiGithub />}>
                    GitHub
                  </Button>
                </HStack>
              </VStack>
            ) : (
              /* SIGNUP FORM */
              <VStack spacing={5}>
                {/* Profile Picture Upload */}
                <Center w="100%" flexDirection="column">
                  <Avatar
                    size="xl"
                    src={preview}
                    mb={2}
                    showBorder
                    borderColor="blue.400"
                  />
                  <Button
                    leftIcon={<FiCamera />}
                    variant="outline"
                    rounded="xl"
                    size="sm"
                    onClick={() =>
                      document.getElementById("profilePicInput").click()
                    }
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

                {/* Full Name */}
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement><Icon as={FiUser} /></InputLeftElement>
                    <Input placeholder="John Doe" bg={inputBg} />
                  </InputGroup>
                </FormControl>

                {/* Email */}
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement><Icon as={FiMail} /></InputLeftElement>
                    <Input placeholder="you@example.com" bg={inputBg} />
                  </InputGroup>
                </FormControl>

                {/* Password */}
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement><Icon as={FiLock} /></InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      bg={inputBg}
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

                {/* Confirm Password */}
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement><Icon as={FiLock} /></InputLeftElement>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      bg={inputBg}
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

                {/* Signup Button */}
                <Button
                  w="100%"
                  size="lg"
                  bgGradient="linear(to-r, blue.500, blue.600)"
                  color="white"
                  rounded="xl"
                >
                  Create Account
                </Button>

                {/* Divider */}
                <Box position="relative" w="100%" py={4}>
                  <Divider />
                  <AbsoluteCenter bg={bgCardGlass} px={4}>
                    <Text fontSize="sm">or continue with</Text>
                  </AbsoluteCenter>
                </Box>

                {/* Social */}
                <HStack w="100%" spacing={3}>
                  <Button flex={1} variant="outline" leftIcon={<FcGoogle />}>
                    Google
                  </Button>
                  <Button flex={1} variant="outline" leftIcon={<FiGithub />}>
                    GitHub
                  </Button>
                </HStack>
              </VStack>
            )}
          </Box>
        </Box>

        {/* Bottom Switch Text */}
        <Text textAlign="center" mt={6} fontSize="sm">
          {selected === "login" ? (
            <>
              Don't have an account?{" "}
              <Link color="blue.500" onClick={() => setSelected("signup")}>
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link color="blue.500" onClick={() => setSelected("login")}>
                Log in
              </Link>
            </>
          )}
        </Text>
      </Container>
    </Box>
  );
}

export default Homepage;