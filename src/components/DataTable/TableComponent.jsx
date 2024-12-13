import React from 'react'
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Box, 
  Text,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  List,
  ListItem
} from '@chakra-ui/react'
import { useTable } from 'react-table'
import { useMemo } from 'react'

function TableComponent({ data }) {
  console.log('🎯 Rendering TableComponent with data:', data)

  const columns = useMemo(() => {
    console.log('📊 Creating table columns')
    return [
      {
        Header: 'Basic Info',
        columns: [
          {
            Header: 'Company Name',
            accessor: 'company.name',
          },
          {
            Header: 'Legal Name',
            accessor: row => row.company.names?.displayName || '-',
          },
          {
            Header: 'Legal Form',
            accessor: 'company.legalForm',
          },
          {
            Header: 'Entity Type',
            accessor: 'company.entityType',
          },
          {
            Header: 'Company Number',
            accessor: 'company.companyNumber',
          },
          {
            Header: 'VAT Number',
            accessor: 'company.vatNumber',
          }
        ]
      },
      {
        Header: 'Status',
        columns: [
          {
            Header: 'Status',
            accessor: 'company.status',
            Cell: ({ value }) => (
              <Badge colorScheme={value === 'ACTIVE' ? 'green' : 'red'}>
                {value}
              </Badge>
            )
          },
          {
            Header: 'Legal Status',
            accessor: 'company.legalStatus',
          },
          {
            Header: 'Start Date',
            accessor: 'company.startDate',
          },
          {
            Header: 'Stop Date',
            accessor: 'company.stoppedDate',
          }
        ]
      },
      {
        Header: 'Contact',
        columns: [
          {
            Header: 'Email',
            accessor: 'company.email',
          },
          {
            Header: 'Phone',
            accessor: row => {
              const phones = row.company.phoneNumberWithMeta
              if (!phones?.length) return '-'
              return phones.map(p => `${p.phoneNumber} (${p.type})`).join(', ')
            }
          },
          {
            Header: 'Website',
            accessor: 'company.websiteUrl',
            Cell: ({ value }) => value ? (
              <a href={value} target="_blank" rel="noopener noreferrer">
                <Text color="blue.500" textDecoration="underline">{value}</Text>
              </a>
            ) : '-'
          }
        ]
      },
      {
        Header: 'Location',
        columns: [
          {
            Header: 'Country',
            accessor: 'company.address.country',
          },
          {
            Header: 'Address',
            accessor: row => {
              const addr = row.company.address
              return addr ? `${addr.street} ${addr.number}${addr.box ? `/${addr.box}` : ''}, ${addr.postalCode} ${addr.locality}, ${addr.province}` : '-'
            }
          },
          {
            Header: 'Coordinates',
            accessor: row => {
              const coords = row.company.address?.coordinates
              return coords ? `${coords.latitude}, ${coords.longitude}` : '-'
            }
          }
        ]
      },
      {
        Header: 'Business',
        columns: [
          {
            Header: 'Activities',
            accessor: 'company.activities',
            Cell: ({ value }) => value ? (
              <List>
                {value.map((activity, idx) => (
                  <ListItem key={idx} fontSize="sm">{activity}</ListItem>
                ))}
              </List>
            ) : '-'
          },
          {
            Header: 'Languages',
            accessor: 'company.languagesUsedInCommunication',
            Cell: ({ value }) => value ? value.join(', ') : '-'
          }
        ]
      },
      {
        Header: 'Social',
        columns: [
          {
            Header: 'Social Links',
            accessor: row => row.company.socials,
            Cell: ({ value }) => value ? (
              <List>
                {value.map((social, idx) => (
                  <ListItem key={idx}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <Text color="blue.500" textDecoration="underline">
                        {social.type}
                      </Text>
                    </a>
                  </ListItem>
                ))}
              </List>
            ) : '-'
          }
        ]
      },
      {
        Header: 'People',
        columns: [
          {
            Header: 'Team',
            accessor: row => row.company.people?.people,
            Cell: ({ value }) => value ? (
              <Accordion allowMultiple>
                <AccordionItem border="none">
                  <AccordionButton p={1}>
                    <Badge colorScheme="blue">{value.length} people</Badge>
                  </AccordionButton>
                  <AccordionPanel>
                    <List spacing={2}>
                      {value.map((person, idx) => (
                        <ListItem key={idx} fontSize="sm">
                          <Text fontWeight="bold">
                            {person.person.firstName} {person.person.lastName}
                          </Text>
                          {person.employeeInfo && (
                            <>
                              <Text fontSize="xs" color="gray.600">
                                {person.employeeInfo.function}
                              </Text>
                              {person.employeeInfo.linkedinUrl && (
                                <a href={person.employeeInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                  <Text color="blue.500" fontSize="xs">LinkedIn</Text>
                                </a>
                              )}
                            </>
                          )}
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ) : '-'
          }
        ]
      }
    ]
  }, [])

  const tableData = data || []
  console.log('📋 Table data:', tableData)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData })

  return (
    <Box overflowX="auto" overflowY="auto" maxHeight="calc(100vh - 200px)">
      <Table {...getTableProps()} size="sm">
        <Thead position="sticky" top={0} bg="white" zIndex={1}>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()} whiteSpace="nowrap">
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()} whiteSpace="nowrap">
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default TableComponent
