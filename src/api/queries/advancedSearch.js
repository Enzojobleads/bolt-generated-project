import { client } from '../client'

export const fetchAdvancedSearch = async ({ offset, limit, includePeople }) => {
  console.log('🔍 Starting API request with params:', { offset, limit, includePeople })

  const requestBody = {
    "variables": {
      "savedSearchId": null,
      "aiSearchOptions": {},
      "filters": {
        "singularValueString": [
          {
            "filterType": "EQUALS",
            "field": "status",
            "value": "ACTIVE"
          }
        ],
        "multiSelect": [
          {
            "filterType": "INCLUDES_ANY",
            "field": "estimatedRevenue",
            "values": ["Bucket1_2M", "Bucket2_5M", "Bucket5_10M"]
          },
          {
            "filterType": "INCLUDES_ANY",
            "field": "activities",
            "values": [
              "INSTALLATION_OF_AIR_CONDITIONING",
              "INSTALLATION_OF_AIR_CONDITIONING",
              "CONSTRUCTION",
              "CONSTRUCTION_OF_INFRASTRUCTURE",
              "CONSTRUCTION_OF_OFFICE_BUILDINGS",
              "DEMOLITION_WORKS",
              "ELECTRICAL_INSTALLATION_WORKS",
              "FINISHING_OF_BUILDINGS",
              "FLOORING",
              "GLAZING",
              "INSTALLATION_OF_HEATING",
              "INSTALLATION_OF_INDUSTRIAL_MACHINES_AND_TOOLS",
              "INSTALLATION_OF_VENTILATION",
              "ISOLATION",
              "JOINERY",
              "NON_RESIDENTIAL_CONSTRUCTION",
              "PAINTING",
              "PLUMBING",
              "RESIDENTIAL_CONSTRUCTION",
              "RESTORATION",
              "ROOFING",
              "ELECTRICITY",
              "PRODUCTION_OF_ELECTRICITY",
              "DISTRIBUTION_OF_ELECTRICITY"
            ]
          },
          {
            "filterType": "INCLUDES_ANY",
            "field": "estimatedEmployees",
            "values": ["Bucket0_9", "Bucket10_19", "Bucket20_49"]
          },
          {
            "filterType": "INCLUDES_ANY",
            "field": "countryOfOrigin",
            "values": ["BE"]
          }
        ]
      },
      "sort": [],
      "includeNames": true,
      "includePeople": includePeople,
      "includeFinancials": false,
      "includeEstimatedFinancials": false,
      "includeShareholders": false,
      "includeAbsoluteParent": false,
      "includeJointCommittees": false,
      "includeActivities": true,
      "includeEmail": true,
      "includePhoneNumber": true,
      "includeNaceCodes": false,
      "language": "fr",
      "includeTechnologies": false,
      "includeDescriptions": true,
      "includeMainEstablishment": false,
      "includeAmountOfJobOpenings": false,
      "includeAmountOfLocations": false,
      "offset": offset,
      "limit": limit
    },
    "query": "fragment AdvancedSearchResults on AdvancedSearchResults {\n  results {\n    company {\n      ...SearchCompany\n      __typename\n    }\n    aiScore\n    peopleIds\n    savedPeople\n    savedSearchStatus\n    hasMoreContacts\n    matchedSince\n    jobOpeningIds\n    hasMoreJobOpenings\n    isNewSinceLastViewed\n    signals {\n      id\n      type\n      title\n      growth\n      growthInPercentage\n      placeNames\n      remaining\n      prevBalanceSheetDate\n      currBalanceSheetDate\n      __typename\n    }\n    socialPosts {\n      snippet\n      url\n      __typename\n    }\n    __typename\n  }\n  totalHits {\n    value\n    relation\n    __typename\n  }\n  __typename\n}\n\nfragment AdvancedSearchResultsRequirement on AdvancedSearchResultsRequirement {\n  results {\n    company {\n      ...SearchCompany\n      __typename\n    }\n    aiScore\n    peopleIds\n    savedPeople\n    savedSearchStatus\n    hasMoreContacts\n    matchedSince\n    isNewSinceLastViewed\n    signals {\n      id\n      type\n      title\n      growth\n      growthInPercentage\n      placeNames\n      remaining\n      prevBalanceSheetDate\n      currBalanceSheetDate\n      __typename\n    }\n    __typename\n  }\n  totalHits {\n    value\n    relation\n    __typename\n  }\n  requirement\n  __typename\n}\n\nfragment CompanyAddress on CompanyAddress {\n  country\n  locality\n  municipality\n  province\n  postalCode\n  street\n  number\n  box\n  requirement\n  coordinates {\n    latitude\n    longitude\n    __typename\n  }\n  __typename\n}\n\nfragment SearchCompany on Company {\n  id\n  websiteUrl\n  slug\n  name\n  legalForm\n  entityType\n  companyNumber\n  countryCode\n  status\n  legalStatus\n  logoUrl\n  startDate\n  stoppedDate\n  vatNumber\n  languagesUsedInCommunication\n  socials {\n    type\n    url\n    __typename\n  }\n  email @include(if: $includeEmail)\n  activities @include(if: $includeActivities)\n  phoneNumberWithMeta @include(if: $includePhoneNumber) {\n    phoneNumber\n    context\n    type\n    zone\n    country\n    isDncm\n    __typename\n  }\n  jointCommitteeCodes @include(if: $includeJointCommittees)\n  socials {\n    type\n    url\n    __typename\n  }\n  naceCodes @include(if: $includeNaceCodes) {\n    code\n    fullVersion\n    __typename\n  }\n  names @include(if: $includeNames) {\n    displayName\n    tradenames {\n      name\n      language\n      __typename\n    }\n    __typename\n  }\n  descriptions @include(if: $includeDescriptions) {\n    description\n    language\n    __typename\n  }\n  address(language: $language) {\n    ...CompanyAddress\n    __typename\n  }\n  amountOfLocations @include(if: $includeAmountOfLocations)\n  people @include(if: $includePeople) {\n    ...People\n    ...PeopleRequirement\n    __typename\n  }\n  financials(range: 1) @include(if: $includeFinancials) {\n    ...Financials\n    ...FinancialsRequirement\n    __typename\n  }\n  estimatedFinancials @include(if: $includeEstimatedFinancials) {\n    ...EstimatedFinancials\n    ...EstimatedFinancialsRequirement\n    __typename\n  }\n  shareholders @include(if: $includeShareholders) {\n    ... on Relations {\n      relations {\n        company {\n          ... on Company {\n            name\n            countryCode\n            companyNumber\n            slug\n            names {\n              displayName\n              tradenames {\n                name\n                language\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          ... on UnsupportedCompany {\n            name\n            countryCode\n            __typename\n          }\n          __typename\n        }\n        function {\n          percentage\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  absoluteParent @include(if: $includeAbsoluteParent) {\n    company {\n      ... on Company {\n        name\n        countryCode\n        companyNumber\n        slug\n        names {\n          displayName\n          tradenames {\n            name\n            language\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      ... on UnsupportedCompany {\n        name\n        countryCode\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  technologies @include(if: $includeTechnologies) {\n    ... on Technologies {\n      technologies {\n        id\n        name\n        categories {\n          id\n          name\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on CompanyTechnologiesRequirement {\n      requirement\n      technologies {\n        id\n        name\n        leadgenSearchValue\n        categories {\n          id\n          name\n          leadgenSearchValue\n          __typename\n        }\n        groups\n        image\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  mainEstablishment @include(if: $includeMainEstablishment) {\n    id\n    __typename\n  }\n  amountOfJobOpenings @include(if: $includeAmountOfJobOpenings)\n  __typename\n}\n\nfragment People on People {\n  people {\n    ...CompanyPerson\n    __typename\n  }\n  __typename\n}\n\nfragment PeopleRequirement on PeopleRequirement {\n  people {\n    ...CompanyPerson\n    __typename\n  }\n  requirement\n  __typename\n}\n\nfragment CompanyPerson on CompanyPerson {\n  person {\n    id\n    firstName\n    lastName\n    slug\n    __typename\n  }\n  functions {\n    type\n    percentage\n    since\n    moneyContributionAtFoundation {\n      amount\n      currency\n      __typename\n    }\n    company {\n      id\n      name\n      companyNumber\n      countryCode\n      slug\n      __typename\n    }\n    __typename\n  }\n  employeeInfo {\n    function\n    linkedinUrl\n    avatarUrl\n    seniority\n    department\n    __typename\n  }\n  emailStatus\n  __typename\n}\n\nfragment Financials on Financials {\n  years {\n    ...FinancialYearFull\n    __typename\n  }\n  __typename\n}\n\nfragment FinancialYearFull on FinancialYear {\n  year\n  data {\n    revenue {\n      ...FinancialValueCurrency\n      __typename\n    }\n    grossMarginInPercentage {\n      ...FinancialValuePercentage\n      __typename\n    }\n    ebitdaInPercentage {\n      ...FinancialValuePercentage\n      __typename\n    }\n    ebitInPercentage {\n      ...FinancialValuePercentage\n      __typename\n    }\n    netProfitInPercentage {\n      ...FinancialValuePercentage\n      __typename\n    }\n    grossMargin {\n      ...FinancialValueCurrency\n      __typename\n    }\n    ebitda {\n      ...FinancialValueCurrency\n      __typename\n    }\n    ebit {\n      ...FinancialValueCurrency\n      __typename\n    }\n    netProfit {\n      ...FinancialValueCurrency\n      __typename\n    }\n    distributedProfits {\n      ...FinancialValueCurrency\n      __typename\n    }\n    cash {\n      ...FinancialValueCurrency\n      __typename\n    }\n    cashFlow {\n      ...FinancialValueCurrency\n      __typename\n    }\n    totalAssets {\n      ...FinancialValueCurrency\n      __typename\n    }\n    equity {\n      ...FinancialValueCurrency\n      __typename\n    }\n    debt {\n      ...FinancialValueCurrency\n      __typename\n    }\n    debtRatio {\n      ...FinancialValuePercentage\n      __typename\n    }\n    shortTermDebt {\n      ...FinancialValueCurrency\n      __typename\n    }\n    shortTermDebtRatio {\n      ...FinancialValuePercentage\n      __typename\n    }\n    employees {\n      ...FinancialValuePure\n      __typename\n    }\n    blueCollarFtes {\n      ...FinancialValuePure\n      __typename\n    }\n    blueCollarHeadcount {\n      ...FinancialValuePure\n      __typename\n    }\n    whiteCollarFtes {\n      ...FinancialValuePure\n      __typename\n    }\n    whiteCollarHeadcount {\n      ...FinancialValuePure\n      __typename\n    }\n    totalEmployeeHeadcount {\n      ...FinancialValuePure\n      __typename\n    }\n    newHires {\n      ...FinancialValuePure\n      __typename\n    }\n    employeeSexRatio {\n      ...FinancialValueSexRatio\n      __typename\n    }\n    netWorkingCapital {\n      ...FinancialValueCurrency\n      __typename\n    }\n    netWorkingCapitalRequirement {\n      ...FinancialValueCurrency\n      __typename\n    }\n    currentRatio {\n      ...FinancialValuePercentage\n      __typename\n    }\n    quickRatio {\n      ...FinancialValuePercentage\n      __typename\n    }\n    capital {\n      ...FinancialValueCurrency\n      __typename\n    }\n    retainedEarnings {\n      ...FinancialValueCurrency\n      __typename\n    }\n    longTermDebt {\n      ...FinancialValueCurrency\n      __typename\n    }\n    longTermDebtFinancial {\n      ...FinancialValueCurrency\n      __typename\n    }\n    longTermDebtAccountsPayable {\n      ...FinancialValueCurrency\n      __typename\n    }\n    shortTermDebtFinancial {\n      ...FinancialValueCurrency\n      __typename\n    }\n    shortTermDebtAccountsPayable {\n      ...FinancialValueCurrency\n      __typename\n    }\n    healthIndicator {\n      ...FinancialValueHealth\n      __typename\n    }\n    temporaryWorkersAtClosingDate {\n      ...FinancialValuePure\n      __typename\n    }\n    temporaryWorkersFTE {\n      ...FinancialValuePure\n      __typename\n    }\n    temporaryWorkersTotalHours {\n      ...FinancialValuePure\n      __typename\n    }\n    temporaryWorkersTotalCost {\n      ...FinancialValueCurrency\n      __typename\n    }\n    investmentDeduction {\n      ...FinancialValueCurrency\n      __typename\n    }\n    tradeDebtorsMoreOneYear {\n      ...FinancialValuePure\n      __typename\n    }\n    tradeDebtorsWithinOneYear {\n      ...FinancialValuePure\n      __typename\n    }\n    jointCommitteeCodes {\n      code\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment FinancialsRequirement on FinancialsRequirement {\n  years {\n    ...FinancialYearFull\n    __typename\n  }\n  requirement\n  __typename\n}\n\nfragment EstimatedFinancials on EstimatedFinancials {\n  revenueBucket\n  employeeBucket\n  __typename\n}\n\nfragment EstimatedFinancialsRequirement on EstimatedFinancialsRequirement {\n  revenueBucket\n  employeeBucket\n  requirement\n  __typename\n}\n\nfragment FinancialValueCurrency on FinancialValueCurrency {\n  amount\n  currency\n  diff\n  indicator\n  __typename\n}\n\nfragment FinancialValuePure on FinancialValuePure {\n  amount\n  diff\n  indicator\n  __typename\n}\n\nfragment FinancialValuePercentage on FinancialValuePercentage {\n  amount\n  indicator\n  __typename\n}\n\nfragment FinancialValueSexRatio on FinancialValueSexRatio {\n  male\n  female\n  indicator\n  __typename\n}\n\nfragment FinancialValueHealth on FinancialValueHealth {\n  amount\n  risk\n  __typename\n}\n\nquery ($savedSearchId: PublicID, $aiSearchOptions: AiSearchOptions, $filters: Filters!, $sort: [SortParam!], $resultType: SearchResultType, $language: String, $includeNames: Boolean!, $includePeople: Boolean!, $includeFinancials: Boolean!, $includeEstimatedFinancials: Boolean!, $includeShareholders: Boolean!, $includeAbsoluteParent: Boolean!, $includeJointCommittees: Boolean!, $includeActivities: Boolean!, $includeNaceCodes: Boolean!, $includeEmail: Boolean!, $includePhoneNumber: Boolean!, $includeTechnologies: Boolean!, $includeDescriptions: Boolean!, $includeMainEstablishment: Boolean!, $includeAmountOfJobOpenings: Boolean!, $includeAmountOfLocations: Boolean!, $offset: Int!, $limit: Int!, $dynamicList: Boolean) {\n  advancedSearch(\n    savedSearchId: $savedSearchId\n    aiSearchOptions: $aiSearchOptions\n    filters: $filters\n    sort: $sort\n    resultType: $resultType\n    language: $language\n    offset: $offset\n    limit: $limit\n    dynamicList: $dynamicList\n  ) {\n    ...AdvancedSearchResults\n    ...AdvancedSearchResultsRequirement\n    __typename\n  }\n}"
  }

  try {
    console.log('📡 Making API request with body:', JSON.stringify(requestBody))
    const response = await client.post('/', requestBody)
    console.log('✅ API response:', response)
    return response.data
  } catch (error) {
    console.error('❌ API error:', error)
    console.error('❌ API error response:', error.response?.data)
    throw error
  }
}
