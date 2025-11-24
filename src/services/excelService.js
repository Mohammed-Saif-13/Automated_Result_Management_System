import * as XLSX from "xlsx";

export const excelService = {
  parseFile: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  },

  validateResultData: (data) => {
    const errors = [];
    const requiredFields = [
      "rollNumber",
      "studentName",
      "subject",
      "marks",
      "totalMarks",
    ];

    data.forEach((row, index) => {
      requiredFields.forEach((field) => {
        if (!row[field]) {
          errors.push({
            row: index + 1,
            field,
            message: `${field} is required`,
          });
        }
      });

      if (row.marks && row.totalMarks && row.marks > row.totalMarks) {
        errors.push({
          row: index + 1,
          field: "marks",
          message: "Marks cannot be greater than total marks",
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  exportToExcel: (data, filename = "export.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename);
  },
};
