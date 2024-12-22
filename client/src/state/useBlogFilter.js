import { create } from 'zustand'

const useBlogFilter = create((set) => {
    return {
        categories: [],
        userId: '',
        search: '',
        setSearch: (search) => set({ search, })
    }
})

export default useBlogFilter