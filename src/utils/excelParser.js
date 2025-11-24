import * as XLSX from "xlsx";

export const parseExcelFile = (file) => {
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
};

export const exportToExcel = (
  data,
  filename = "export.xlsx",
  sheetName = "Sheet1"
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const colWidths = [];
  const headers = Object.keys(data[0] || {});

  headers.forEach((header, index) => {
    const maxLength = Math.max(
      header.length,
      ...data.map((row) => String(row[header] || "").length)
    );
    colWidths[index] = { wch: Math.min(maxLength + 2, 50) };
  });

  worksheet["!cols"] = colWidths;

  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "1";
    if (!worksheet[address]) continue;
    worksheet[address].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "FF3B82F6" } },
      alignment: { horizontal: "center" },
    };
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  XLSX.writeFile(workbook, filename);

  return filename;
};

export const exportMultipleSheets = (sheetsData, filename = "export.xlsx") => {
  const workbook = XLSX.utils.book_new();

  sheetsData.forEach(({ data, sheetName }) => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const colWidths = [];
    const headers = Object.keys(data[0] || {});

    headers.forEach((header, index) => {
      const maxLength = Math.max(
        header.length,
        ...data.map((row) => String(row[header] || "").length)
      );
      colWidths[index] = { wch: Math.min(maxLength + 2, 50) };
    });

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  XLSX.writeFile(workbook, filename);

  return filename;
};

export const validateExcelStructure = (data, requiredColumns) => {
  if (!data || data.length === 0) {
    return { isValid: false, error: "File is empty" };
  }

  const firstRow = data[0];
  const missingColumns = requiredColumns.filter((col) => !(col in firstRow));

  if (missingColumns.length > 0) {
    return {
      isValid: false,
      error: `Missing columns: ${missingColumns.join(", ")}`,
    };
  }

  return { isValid: true };
};

export const downloadTemplate = (templateType = "students") => {
  const templates = {
    students: [
      {
        rollNumber: "STD001",
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        class: "10",
        section: "A",
      },
      {
        rollNumber: "STD002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
        class: "10",
        section: "B",
      },
    ],
    results: [
      {
        rollNumber: "STD001",
        studentName: "John Doe",
        subject: "Mathematics",
        marks: 85,
        totalMarks: 100,
        examName: "Mid Term 2024",
        examDate: "2024-01-15",
      },
      {
        rollNumber: "STD001",
        studentName: "John Doe",
        subject: "Science",
        marks: 78,
        totalMarks: 100,
        examName: "Mid Term 2024",
        examDate: "2024-01-15",
      },
    ],
  };

  const data = templates[templateType] || templates.students;
  const filename = `${templateType}_template.xlsx`;

  exportToExcel(data, filename, templateType.toUpperCase());

  return filename;
};
