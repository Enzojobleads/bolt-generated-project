import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import App from './App'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        _dark: {
          bg: 'gray.900'
        }
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
