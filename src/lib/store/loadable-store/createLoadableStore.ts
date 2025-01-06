import { create } from "zustand";
import { LoadableState } from "./interfaces";

const createLoadableStore = <T>() =>
  create<LoadableState<T>>((set) => ({
    data: null,
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setData: (data) => set({ data, isLoading: false, error: null }),
    setError: (error) => set({ error, isLoading: false }),
    reset: () => set({ data: null, isLoading: false, error: null }),
  }));

export default createLoadableStore;
