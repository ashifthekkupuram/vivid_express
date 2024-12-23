import { create } from 'zustand'

const useBlogFilter = create((set) => {
    return {
        categories: [],
        userId: '',
        search: '',
        setSearch: (search) => set({ search, }),
        addRemoveCategory: (categoryId) => set((state) => ({ categories: state.categories.includes(categoryId) ? state.categories.filter((cat) => cat !== categoryId) : [...state.categories, categoryId] })) 
    }
})

export default useBlogFilter