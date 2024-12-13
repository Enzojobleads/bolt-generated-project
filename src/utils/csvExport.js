export const exportToCsv = (data) => {
  if (!data?.length) return

  const headers = [
    // Basic Info
    'Company Name',
    'Legal Name',
    'Legal Form',
    'Entity Type',
    'Company Number',
    'VAT Number',
    // Status
    'Status',
    'Legal Status',
    'Start Date',
    'Stop Date',
    // Contact
    'Email',
    'Phone Numbers',
    'Website',
    // Location
    'Country',
    'Street',
    'Number',
    'Box',
    'Postal Code',
    'Locality',
    'Province',
    'Latitude',
    'Longitude',
    // Business
    'Activities',
    'Languages',
    // Social
    'Social Links',
    // People
    'People'
  ]

  const rows = data.map(result => {
    const company = result.company
    const address = company.address || {}
    
    // Format people data
    const peopleData = company.people?.people?.map(person => {
      const info = [
        `${person.person.firstName} ${person.person.lastName}`,
        person.employeeInfo?.function,
        person.employeeInfo?.linkedinUrl
      ].filter(Boolean).join(' - ')
      return info
    }).join(' | ') || ''

    // Format phone numbers
    const phones = company.phoneNumberWithMeta?.map(p => 
      `${p.phoneNumber} (${p.type})`
    ).join(' | ') || ''

    // Format social links
    const socials = company.socials?.map(s => 
      `${s.type}: ${s.url}`
    ).join(' | ') || ''

    return [
      // Basic Info
      company.name || '',
      company.names?.displayName || '',
      company.legalForm || '',
      company.entityType || '',
      company.companyNumber || '',
      company.vatNumber || '',
      // Status
      company.status || '',
      company.legalStatus || '',
      company.startDate || '',
      company.stoppedDate || '',
      // Contact
      company.email || '',
      phones,
      company.websiteUrl || '',
      // Location
      address.country || '',
      address.street || '',
      address.number || '',
      address.box || '',
      address.postalCode || '',
      address.locality || '',
      address.province || '',
      address.coordinates?.latitude || '',
      address.coordinates?.longitude || '',
      // Business
      company.activities?.join(' | ') || '',
      company.languagesUsedInCommunication?.join(' | ') || '',
      // Social
      socials,
      // People
      peopleData
    ]
  })

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => {
      // Escape special characters and wrap in quotes if needed
      const cellStr = String(cell || '')
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`
      }
      return cellStr
    }).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `bizzy_data_${new Date().toISOString()}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
