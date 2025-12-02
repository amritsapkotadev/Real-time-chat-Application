import React, { useEffect } from "react";
import { Box, Container, Heading, Text, Button, VStack, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";

function Homepage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50, pink.50)",
    "linear(to-br, gray.900, purple.900, blue.900)"
  );

  const textColor = useColorModeValue("gray.600", "gray.400");
  const iconBg = useColorModeValue("blue.500", "blue.600");

  return (
    <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center" justifyContent="center">
      <Container maxW="lg" centerContent>
        <VStack spacing={8} textAlign="center">
          <Box bg={iconBg} p={6} rounded="full" shadow="xl">
            <FiMessageCircle size={60} color="white" />
          </Box>

          <VStack spacing={3}>
            <Heading
              size="2xl"
              bgGradient="linear(to-r, blue.600, purple.600)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Welcome to ChatApp
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="md">
              Connect with friends and family. Start chatting in seconds.
            </Text>
          </VStack>

          <VStack spacing={4} w="100%" maxW="sm" pt={6}>
            <Button
              w="100%"
              size="lg"
              bgGradient="linear(to-r, blue.500, blue.600)"
              color="white"
              rounded="xl"
              shadow="lg"
              _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              w="100%"
              size="lg"
              variant="outline"
              colorScheme="blue"
              rounded="xl"
              _hover={{ transform: "translateY(-2px)", bg: useColorModeValue("blue.50", "gray.700") }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </VStack>

          <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.500")} pt={4}>
            Free • Secure • Fast
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}

export default Homepage;
