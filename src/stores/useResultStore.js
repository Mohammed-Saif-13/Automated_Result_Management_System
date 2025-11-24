import { create } from "zustand";

export const useResultStore = create((set, get) => ({
  results: [],
  currentResult: null,
  analytics: null,
  loading: false,
  error: null,

  setResults: (results) => set({ results }),

  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),

  setCurrentResult: (result) => set({ currentResult: result }),

  setAnalytics: (analytics) => set({ analytics }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  getResultsByStudentId: (studentId) => {
    return get().results.filter((result) => result.studentId === studentId);
  },
}));
