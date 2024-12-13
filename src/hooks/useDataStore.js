import { create } from 'zustand'
import { fetchAdvancedSearch } from '../api/queries/advancedSearch'

export const useDataStore = create((set, get) => ({
  data: [],
  filteredData: [],
  offset: 0,
  limit: 50,
  includePeople: false,
  includeNL: true,
  loading: false,
  error: null,
  totalLeads: 0,
  retrievedLeads: 0,
  autoExtract: false,

  resetStore: () => set({
    data: [],
    filteredData: [],
    offset: 0,
    totalLeads: 0,
    retrievedLeads: 0,
    error: null,
    autoExtract: false
  }),

  setOffset: (offset) => set({ offset }),
  setLimit: (limit) => set({ limit }),
  setIncludePeople: (includePeople) => set({ includePeople }),
  setIncludeNL: (includeNL) => {
    const { data } = get()
    const filteredData = includeNL 
      ? data 
      : data.filter(lead => !lead.company.languagesUsedInCommunication?.includes('NL'))
    set({ 
      includeNL,
      filteredData,
      retrievedLeads: filteredData.length
    })
  },
  setTotalLeads: (totalLeads) => set({ totalLeads }),
  setRetrievedLeads: (retrievedLeads) => set({ retrievedLeads }),
  setAutoExtract: (autoExtract) => set({ autoExtract }),

  fetchData: async () => {
    const { offset, limit, includePeople, includeNL, data } = get()
    set({ loading: true, error: null })

    try {
      const response = await fetchAdvancedSearch({ offset, limit, includePeople })
      const newLeads = response.data.advancedSearch.results
      const allData = [...data, ...newLeads]
      const filteredData = includeNL 
        ? allData 
        : allData.filter(lead => !lead.company.languagesUsedInCommunication?.includes('NL'))
      
      set({
        data: allData,
        filteredData,
        retrievedLeads: filteredData.length
      })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },

  startAutoExtraction: async (totalLeads) => {
    set({ autoExtract: true, totalLeads, retrievedLeads: 0, data: [], filteredData: [] })
    const { limit } = get()

    while (get().retrievedLeads < totalLeads && get().autoExtract) {
      await get().fetchData()
      await new Promise(resolve => setTimeout(resolve, Math.random() * (6200 - 1000) + 1000))
      set({ offset: get().offset + limit })
    }

    set({ autoExtract: false })
  },

  stopAutoExtraction: () => set({ autoExtract: false })
}))
