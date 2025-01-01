import { create } from 'zustand'

const useAuth = create((set) => {
    return {
        UserData: {},
        token: '',
        setAuth: (data) => set({ UserData: data?.UserData || {}, token: data?.access_token || '' }),
        setUserData: (data) => set({ UserData: data })
    }
})

export default useAuth