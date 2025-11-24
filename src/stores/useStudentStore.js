import { create } from "zustand";

export const useStudentStore = create((set, get) => ({
  students: [],
  currentStudent: null,
  loading: false,
  error: null,

  setStudents: (students) => set({ students }),

  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, student],
    })),

  updateStudent: (id, updatedData) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...updatedData } : student
      ),
    })),

  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),

  setCurrentStudent: (student) => set({ currentStudent: student }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  getStudentById: (id) => {
    return get().students.find((student) => student.id === id);
  },
}));
