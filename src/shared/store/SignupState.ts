import { create } from 'zustand';

interface SignupState {
  email: string;
  userName: string;
  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
}

const useSignupStore = create<SignupState>((set) => ({
  email: '',
  userName: '',
  setEmail: (email) => set({ email }),
  setUserName: (userName) => set({ userName }),
}));

export default useSignupStore;
