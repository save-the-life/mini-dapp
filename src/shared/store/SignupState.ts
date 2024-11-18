import { create } from 'zustand';

interface SignupState {
  userId: string;
  userName: string;
  token: string;
  setUserId: (userId: string) => void;
  setUserName: (userName: string) => void;
  setToken: (token: string) => void;
}

const useSignupStore = create<SignupState>((set) => ({
  userId: '',
  userName: '',
  token: '',
  setUserId: (userId) => set({ userId }),
  setUserName: (userName) => set({ userName }),
  setToken: (token) => set({token}),
}));

export default useSignupStore;
