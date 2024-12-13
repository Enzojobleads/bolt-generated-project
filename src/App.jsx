import React from 'react'
import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import HomePage from './pages/HomePage'

function App() {
  console.log('📱 Rendering App component')
  return (
    <Box minH="100vh">
      <Header />
      <HomePage />
    </Box>
  )
}

export default App
