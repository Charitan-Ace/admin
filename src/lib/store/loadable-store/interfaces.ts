interface LoadableState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setData: (data: T) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export type { LoadableState };
