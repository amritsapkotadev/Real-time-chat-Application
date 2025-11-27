import React from 'react'
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Chatpage() {
  return (
    <Box p={6} minH="100vh" bg="gray.50">
      <VStack spacing={6} maxW="lg" mx="auto" mt={12}>
        <Heading>Chat</Heading>
        <Text color="gray.600">This is a placeholder chat page. Messages will appear here.</Text>
        <Link to="/">
          <Button colorScheme="teal">Back</Button>
        </Link>
      </VStack>
    </Box>
  )
}

export default Chatpage
