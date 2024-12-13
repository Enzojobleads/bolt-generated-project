import React from 'react'
import { 
  Box, 
  Button, 
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  IconButton,
  Tooltip
} from '@chakra-ui/react'
import { useDataStore } from '../../hooks/useDataStore'
import { exportToCsv } from '../../utils/csvExport'
import TableComponent from './TableComponent'

function DataTable() {
  const { filteredData, visibleColumns, setVisibleColumns } = useDataStore()
  
  const allColumns = [
    { id: 'basic', label: 'Informations de base' },
    { id: 'status', label: 'Statut' },
    { id: 'contact', label: 'Contact' },
    { id: 'location', label: 'Localisation' },
    { id: 'business', label: 'Business' },
    { id: 'social', label: 'Réseaux sociaux' },
    { id: 'people', label: 'Personnes' },
  ]

  return (
    <Box bg="white" p={6} rounded="lg" shadow="sm" h="100%">
      <HStack spacing={4} mb={4} justify="flex-end">
        <Menu closeOnSelect={false}>
          <Tooltip label="Gérer les colonnes">
            <MenuButton as={IconButton}>
              Colonnes
            </MenuButton>
          </Tooltip>
          <MenuList>
            <MenuOptionGroup 
              type="checkbox" 
              value={visibleColumns} 
              onChange={setVisibleColumns}
            >
              {allColumns.map(col => (
                <MenuItemOption key={col.id} value={col.id}>
                  {col.label}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        
        <Tooltip label="Exporter en CSV">
          <Button
            colorScheme="green"
            onClick={() => exportToCsv(filteredData)}
          >
            Exporter
          </Button>
        </Tooltip>
      </HStack>
      
      <TableComponent 
        data={filteredData}
        visibleColumns={visibleColumns}
      />
    </Box>
  )
}

export default DataTable
