import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import ControlPanel from '../components/ControlPanel'
import DataTable from '../components/DataTable'

function HomePage() {
  console.log('🏠 Rendering HomePage component')
  return (
    <Grid
      templateColumns="300px 1fr"
      gap={6}
      p={6}
      h="calc(100vh - 72px)"
    >
      <GridItem>
        <ControlPanel />
      </GridItem>
      <GridItem>
        <DataTable />
      </GridItem>
    </Grid>
  )
}

export default HomePage
