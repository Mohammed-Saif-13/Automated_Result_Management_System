export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

export const validateRollNumber = (rollNo) => {
  return rollNo && rollNo.trim().length > 0;
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

export const validateRequired = (value) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMarks = (marks, maxMarks) => {
  const marksNum = Number(marks);
  return !isNaN(marksNum) && marksNum >= 0 && marksNum <= maxMarks;
};
    