import jsPDF from "jspdf";
import { APP_CONFIG } from "@/constants/config";
import { formatDate } from "./helpers";
import { getGrade, calculatePercentage } from "./formatters";

export const generateResultPDF = (resultData) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  let yPosition = 20;

  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, 0, pageWidth, 35, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text(APP_CONFIG.APP_NAME, pageWidth / 2, 15, { align: "center" });

  pdf.setFontSize(14);
  pdf.setFont("helvetica", "normal");
  pdf.text("Student Result Report", pageWidth / 2, 25, { align: "center" });

  pdf.setTextColor(0, 0, 0);
  yPosition = 45;

  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(
    `Generated on: ${formatDate(new Date())}`,
    pageWidth - 15,
    yPosition,
    { align: "right" }
  );

  yPosition += 15;

  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.line(15, yPosition, pageWidth - 15, yPosition);

  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "bold");
  pdf.text("Student Information", 15, yPosition);

  yPosition += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const studentInfo = [
    { label: "Name:", value: resultData.studentName },
    { label: "Roll Number:", value: resultData.rollNumber },
    {
      label: "Class:",
      value: `${resultData.class}-${resultData.section || ""}`,
    },
    { label: "Exam:", value: resultData.examName },
    { label: "Date:", value: formatDate(resultData.date) },
  ];

  studentInfo.forEach((info) => {
    pdf.setFont("helvetica", "bold");
    pdf.text(info.label, 20, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(info.value, 60, yPosition);
    yPosition += 7;
  });

  yPosition += 5;

  pdf.setDrawColor(200, 200, 200);
  pdf.line(15, yPosition, pageWidth - 15, yPosition);

  yPosition += 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Subject-wise Marks", 15, yPosition);

  yPosition += 8;

  const tableStartY = yPosition;
  const colWidths = [60, 35, 30, 30, 30];
  const headers = ["Subject", "Obtained", "Total", "Percentage", "Grade"];

  pdf.setFillColor(59, 130, 246);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 8, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);

  let xPosition = 20;
  headers.forEach((header, index) => {
    pdf.text(header, xPosition, yPosition);
    xPosition += colWidths[index];
  });

  yPosition += 8;

  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "normal");

  if (resultData.subjects && resultData.subjects.length > 0) {
    resultData.subjects.forEach((subject, index) => {
      const percentage = calculatePercentage(
        subject.obtainedMarks,
        subject.totalMarks
      );
      const grade = getGrade(percentage);

      if (index % 2 === 0) {
        pdf.setFillColor(245, 247, 250);
        pdf.rect(15, yPosition - 5, pageWidth - 30, 8, "F");
      }

      xPosition = 20;
      const rowData = [
        subject.name,
        subject.obtainedMarks.toString(),
        subject.totalMarks.toString(),
        `${percentage}%`,
        grade.label,
      ];

      rowData.forEach((data, idx) => {
        pdf.text(data, xPosition, yPosition);
        xPosition += colWidths[idx];
      });

      yPosition += 8;
    });
  } else {
    const totalPercentage = calculatePercentage(
      resultData.obtainedMarks,
      resultData.totalMarks
    );
    const grade = getGrade(totalPercentage);

    xPosition = 20;
    const rowData = [
      resultData.examName || "Overall",
      resultData.obtainedMarks.toString(),
      resultData.totalMarks.toString(),
      `${totalPercentage}%`,
      grade.label,
    ];

    rowData.forEach((data, idx) => {
      pdf.text(data, xPosition, yPosition);
      xPosition += colWidths[idx];
    });

    yPosition += 8;
  }

  yPosition += 5;

  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(1);
  pdf.line(15, yPosition, pageWidth - 15, yPosition);

  yPosition += 10;

  const totalObtained = resultData.totalObtained || resultData.obtainedMarks;
  const totalMarks = resultData.totalMarks;
  const totalPercentage = calculatePercentage(totalObtained, totalMarks);
  const overallGrade = getGrade(totalPercentage);

  pdf.setFillColor(240, 253, 244);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 25, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Summary", 20, yPosition);

  yPosition += 8;

  pdf.setFontSize(11);
  const summaryData = [
    { label: "Total Marks:", value: `${totalObtained}/${totalMarks}` },
    { label: "Overall Percentage:", value: `${totalPercentage}%` },
    { label: "Overall Grade:", value: overallGrade.label },
  ];

  summaryData.forEach((item) => {
    pdf.setFont("helvetica", "bold");
    pdf.text(item.label, 20, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(item.value, 80, yPosition);
    yPosition += 7;
  });

  yPosition += 5;

  const resultText =
    totalPercentage >= APP_CONFIG.PASS_PERCENTAGE ? "PASSED" : "FAILED";
  const resultColor =
    totalPercentage >= APP_CONFIG.PASS_PERCENTAGE
      ? [34, 197, 94]
      : [239, 68, 68];

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(resultColor[0], resultColor[1], resultColor[2]);
  pdf.text(`Result: ${resultText}`, pageWidth / 2, yPosition, {
    align: "center",
  });

  const footerY = pageHeight - 20;
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.line(15, footerY, pageWidth - 15, footerY);

  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    "This is a computer-generated document. No signature required.",
    pageWidth / 2,
    footerY + 5,
    { align: "center" }
  );
  pdf.text(
    `© ${new Date().getFullYear()} ${
      APP_CONFIG.APP_NAME
    }. All rights reserved.`,
    pageWidth / 2,
    footerY + 10,
    { align: "center" }
  );

  const fileName = `Result_${
    resultData.rollNumber
  }_${resultData.examName.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
  pdf.save(fileName);

  return fileName;
};

export const generateStudentListPDF = (students) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();

  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, 0, pageWidth, 30, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text("Student List", pageWidth / 2, 15, { align: "center" });

  pdf.setFontSize(11);
  pdf.text(`Generated on: ${formatDate(new Date())}`, pageWidth / 2, 23, {
    align: "center",
  });

  let yPosition = 45;

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.text(`Total Students: ${students.length}`, 15, yPosition);

  yPosition += 10;

  const colWidths = [35, 55, 30, 25, 40];
  const headers = ["Roll No", "Name", "Class", "Section", "Phone"];

  pdf.setFillColor(59, 130, 246);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 8, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");

  let xPosition = 20;
  headers.forEach((header, index) => {
    pdf.text(header, xPosition, yPosition);
    xPosition += colWidths[index];
  });

  yPosition += 8;

  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "normal");

  students.forEach((student, index) => {
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 20;
    }

    if (index % 2 === 0) {
      pdf.setFillColor(245, 247, 250);
      pdf.rect(15, yPosition - 5, pageWidth - 30, 8, "F");
    }

    xPosition = 20;
    const rowData = [
      student.rollNumber,
      student.name.substring(0, 25),
      student.class,
      student.section,
      student.phone,
    ];

    rowData.forEach((data, idx) => {
      pdf.text(data, xPosition, yPosition);
      xPosition += colWidths[idx];
    });

    yPosition += 8;
  });

  const fileName = `Student_List_${Date.now()}.pdf`;
  pdf.save(fileName);

  return fileName;
};

export const generateBulkResultsPDF = (results) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();

  results.forEach((result, resultIndex) => {
    if (resultIndex > 0) {
      pdf.addPage();
    }

    generateResultPDFPage(pdf, result, pageWidth);
  });

  const fileName = `Bulk_Results_${Date.now()}.pdf`;
  pdf.save(fileName);

  return fileName;
};

const generateResultPDFPage = (pdf, resultData, pageWidth) => {
  let yPosition = 20;

  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, 0, pageWidth, 35, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text(APP_CONFIG.APP_NAME, pageWidth / 2, 15, { align: "center" });

  pdf.setFontSize(14);
  pdf.text("Result Report", pageWidth / 2, 25, { align: "center" });

  pdf.setTextColor(0, 0, 0);
  yPosition = 50;

  pdf.setFontSize(11);
  pdf.text(`Name: ${resultData.studentName}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Roll No: ${resultData.rollNumber}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Exam: ${resultData.examName}`, 20, yPosition);

  yPosition += 15;

  const totalPercentage = calculatePercentage(
    resultData.obtainedMarks,
    resultData.totalMarks
  );
  const grade = getGrade(totalPercentage);

  pdf.setFontSize(14);
  pdf.text(
    `Marks: ${resultData.obtainedMarks}/${resultData.totalMarks}`,
    20,
    yPosition
  );
  yPosition += 10;
  pdf.text(`Percentage: ${totalPercentage}%`, 20, yPosition);
  yPosition += 10;
  pdf.text(`Grade: ${grade.label}`, 20, yPosition);
};
