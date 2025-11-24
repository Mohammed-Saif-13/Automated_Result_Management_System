import { APP_CONFIG } from '@/constants/config';


export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined) return "0%";
  return `${Number(value).toFixed(decimals)}%`;
};

export const formatMarks = (marks, total) => {
  if (!marks || !total) return "0";
  return `${marks}/${total}`;
};

export const calculatePercentage = (obtained, total) => {
  if (!total || total === 0) return 0;
  return ((obtained / total) * 100).toFixed(2);
};

export const getGrade = (percentage) => {
  const grades = APP_CONFIG.GRADE_RANGES;

  for (const [key, grade] of Object.entries(grades)) {
    if (percentage >= grade.min && percentage <= grade.max) {
      return grade;
    }
  }

  return grades.F;
};

export const isPass = (percentage) => {
  return percentage >= APP_CONFIG.PASS_PERCENTAGE;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};
