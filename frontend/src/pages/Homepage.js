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
    <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center" justifyContent="center" position="relative" overflow="hidden">
      <Container maxW="lg" centerContent zIndex={1}>
        <VStack spacing={10} textAlign="center">
          <Box bgGradient="linear(to-br, blue.500, purple.600)" p={8} rounded="full" shadow="2xl" transform="auto" _hover={{ scale: 1.05 }} transition="all 0.3s">
            <FiMessageCircle size={60} color="white" />
          </Box>

          <VStack spacing={4}>
            <Heading
              fontSize={{ base: '4xl', md: '5xl' }}
              bgGradient="linear(to-r, blue.600, purple.600, pink.500)"
              bgClip="text"
              fontWeight="900"
              letterSpacing="tight"
            >
              Welcome to ChatApp
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="md" fontWeight="500">
              Connect with friends and family. Start chatting in seconds.
            </Text>
          </VStack>

          <VStack spacing={4} w="100%" maxW="sm" pt={8}>
            <Button
              w="100%"
              size="lg"
              h="60px"
              bgGradient="linear(to-r, blue.500, blue.600)"
              color="white"
              rounded="2xl"
              shadow="xl"
              fontSize="lg"
              fontWeight="700"
              _hover={{ transform: "translateY(-4px)", shadow: "2xl", bgGradient: "linear(to-r, blue.600, blue.700)" }}
              _active={{ transform: "translateY(-2px)" }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              w="100%"
              size="lg"
              h="60px"
              variant="outline"
              colorScheme="blue"
              borderWidth="2px"
              rounded="2xl"
              fontSize="lg"
              fontWeight="700"
              _hover={{ transform: "translateY(-4px)", bg: useColorModeValue("blue.50", "gray.700"), shadow: "xl" }}
              _active={{ transform: "translateY(-2px)" }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
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
