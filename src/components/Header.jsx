import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

function Header() {
  console.log('🎩 Rendering Header component')
  return (
    <Box bg="white" py={4} px={8} shadow="sm">
      <Heading size="lg">Bizzy Data Explorer</Heading>
    </Box>
  )
}

export default Header
