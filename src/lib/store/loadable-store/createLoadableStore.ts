import { create } from "zustand";
import { LoadableState } from "./interfaces";

const createLoadableStore = <T>() =>
  create<LoadableState<T>>((set) => ({
    data: null,
    paginationData: null,
    filterData: null,
    isLoading: false,
    totalElements: null,
    totalPages: null,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setTotalElements: (totalElements) => set({ totalElements }),
    setPaginationData: (paginationData) => set({ paginationData }),
    setFilterData: (filterData) => set({ filterData }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setData: (data) => set({ data, isLoading: false, error: null }),
    setError: (error) => set({ error, isLoading: false }),
    reset: () => set({ data: null, isLoading: false, error: null }),
  }));

export default createLoadableStore;
