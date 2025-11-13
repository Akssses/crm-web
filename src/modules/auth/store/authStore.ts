import { create } from "zustand";
import type { AuthState, AuthUser } from "../types";

interface AuthStore extends AuthState {
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setStep: (step: AuthState["step"]) => void;
  reset: () => void;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  step: "login",
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setStep: (step) => set({ step }),

  reset: () => set(initialState),
}));
