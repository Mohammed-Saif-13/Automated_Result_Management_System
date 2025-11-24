export const APP_CONFIG = {
  APP_NAME: "Result Management System",
  APP_SHORT_NAME: "RMS",
  VERSION: "1.0.0",

  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  },

  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024,
    ALLOWED_TYPES: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ],
    ALLOWED_EXTENSIONS: [".xls", ".xlsx", ".csv"],
  },

  TOAST: {
    DURATION: 3000,
    POSITION: "top-right",
  },

  GRADE_RANGES: {
    A_PLUS: { min: 90, max: 100, label: "A+", color: "#22c55e" },
    A: { min: 80, max: 89, label: "A", color: "#16a34a" },
    B_PLUS: { min: 70, max: 79, label: "B+", color: "#3b82f6" },
    B: { min: 60, max: 69, label: "B", color: "#2563eb" },
    C: { min: 50, max: 59, label: "C", color: "#f59e0b" },
    D: { min: 40, max: 49, label: "D", color: "#f97316" },
    F: { min: 0, max: 39, label: "F", color: "#ef4444" },
  },

  PASS_PERCENTAGE: 40,
};
