import React from 'react'
import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <Container maxW="container.md" centerContent>
      <Box p={8} minH="100vh" w="100%">
        <VStack spacing={8} mt={20}>
          <Heading size="2xl" color="teal.600">Welcome to Chat App</Heading>
          <Text fontSize="xl" color="gray.600">Start messaging with your friends</Text>
          <Link to="/chat">
            <Button colorScheme="teal" size="lg" px={8}>
              Go to Chat
            </Button>
          </Link>
        </VStack>
      </Box>
    </Container>
  )
}

export default Homepage
