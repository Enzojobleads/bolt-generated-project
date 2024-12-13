import React, { useState } from 'react'
import { 
  Box, 
  VStack, 
  FormControl, 
  FormLabel, 
  Input, 
  Checkbox, 
  Button,
  HStack,
  useColorMode,
  IconButton,
  Select,
  Tooltip,
  Text,
  Progress,
  Heading,
  Flex,
  Spacer,
  Divider,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { 
  SunIcon, 
  MoonIcon, 
  SearchIcon, 
  RepeatIcon, 
  CloseIcon,
  DeleteIcon,
  InfoIcon
} from '@chakra-ui/icons'
import { useDataStore } from '../hooks/useDataStore'

function ControlPanel() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { 
    offset, 
    limit, 
    includePeople, 
    includeNL,
    totalLeads,
    retrievedLeads,
    autoExtract,
    loading,
    setOffset, 
    setLimit, 
    setIncludePeople,
    setIncludeNL,
    setTotalLeads,
    fetchData,
    startAutoExtraction,
    stopAutoExtraction,
    resetStore
  } = useDataStore()

  const [manualLeads, setManualLeads] = useState(200)
  const [startOffset, setStartOffset] = useState(offset)

  const handleStartSearch = () => {
    setOffset(parseInt(startOffset))
    fetchData()
  }

  const handleStartAutoExtraction = () => {
    setOffset(parseInt(startOffset))
    startAutoExtraction(manualLeads)
  }

  const handleReset = () => {
    resetStore()
    setManualLeads(200)
    setStartOffset(0)
  }

  return (
    <Box 
      bg={colorMode === 'light' ? 'white' : 'gray.800'} 
      p={6} 
      rounded="lg" 
      shadow="sm"
    >
      <VStack align="stretch" spacing={4}>
        <Flex align="center">
          <Heading size="md" mb={0}>
            Paramètres d'extraction
          </Heading>
          <Spacer />
          <IconButton
            size="sm"
            ml={2}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />
        </Flex>
        
        <Text fontSize="sm" color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
          Définissez le nombre de leads à extraire et les résultats par page, puis lancez la recherche ou l'extraction automatique.
        </Text>

        <VStack spacing={4} align="stretch">
          <FormControl>
            <HStack justify="space-between" align="center">
              <FormLabel mb={0}>
                Position de départ
              </FormLabel>
              <Tooltip label="Définissez à partir de quelle position commencer l'extraction. Utile pour reprendre une recherche interrompue.">
                <InfoIcon color="blue.500" />
              </Tooltip>
            </HStack>
            <InputGroup>
              <Input 
                type="number" 
                value={startOffset}
                min={0}
                onChange={(e) => setStartOffset(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="Position de départ"
              />
              <InputRightElement width="4.5rem">
                <Text fontSize="sm" color="gray.500">
                  leads
                </Text>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <HStack justify="space-between" align="center">
              <FormLabel mb={0}>
                Leads à extraire
              </FormLabel>
              <Tooltip label="Indiquez le nombre de leads que vous souhaitez récupérer (aucune limite maximale).">
                <InfoIcon color="blue.500" />
              </Tooltip>
            </HStack>
            <InputGroup>
              <Input 
                type="number" 
                value={manualLeads}
                min={0}
                onChange={(e) => setManualLeads(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="Nombre de leads"
              />
              <InputRightElement width="4.5rem">
                <Text fontSize="sm" color="gray.500">
                  leads
                </Text>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Résultats par page</FormLabel>
            <Select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            >
              <option value="10">10 par page</option>
              <option value="50">50 par page</option>
              <option value="100">100 par page</option>
              <option value="150">150 par page</option>
              <option value="200">200 par page</option>
            </Select>
          </FormControl>

          <FormControl>
            <Checkbox 
              isChecked={includePeople}
              onChange={(e) => setIncludePeople(e.target.checked)}
            >
              Inclure les personnes
            </Checkbox>
          </FormControl>

          <FormControl>
            <Checkbox 
              isChecked={includeNL}
              onChange={(e) => setIncludeNL(e.target.checked)}
            >
              Inclure les entreprises avec NL
            </Checkbox>
          </FormControl>

          <Divider />

          <HStack spacing={4} wrap="wrap">
            <Button 
              colorScheme="blue" 
              onClick={handleStartSearch}
              leftIcon={<SearchIcon />}
              isLoading={loading}
              size="md"
              minW="140px"
            >
              Rechercher
            </Button>
            <Button 
              colorScheme="green" 
              onClick={handleStartAutoExtraction}
              leftIcon={<RepeatIcon />}
              isDisabled={autoExtract}
              size="md"
              minW="140px"
            >
              Extraction auto
            </Button>
            <Button 
              colorScheme="red" 
              onClick={stopAutoExtraction}
              leftIcon={<CloseIcon />}
              isDisabled={!autoExtract}
              size="md"
              minW="140px"
            >
              Arrêter
            </Button>
          </HStack>

          <Button
            variant="outline"
            colorScheme="gray"
            onClick={handleReset}
            leftIcon={<DeleteIcon />}
            size="md"
            width="100%"
          >
            Réinitialiser la recherche
          </Button>

          <Box mt={4}>
            <Text fontWeight="bold" mb={2}>
              Leads récupérés : {retrievedLeads} / {totalLeads || manualLeads}
            </Text>
            <Progress 
              value={totalLeads > 0 ? (retrievedLeads / totalLeads) * 100 : 0} 
              hasStripe 
              isAnimated 
              colorScheme="blue" 
              size="sm" 
              borderRadius="md"
            />
          </Box>
        </VStack>
      </VStack>
    </Box>
  )
}

export default ControlPanel
