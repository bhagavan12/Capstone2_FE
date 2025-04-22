import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { pdfjs } from "react-pdf";
// import * as pdfjsLib from 'pdfjs-dist'
// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const readFile = async (file) => {
  try {
    const fileType = getFileType(file);
    if (!fileType) {
      return { success: false, message: 'Unsupported file type' };
    }

    const content = await extractContent(file, fileType);
    return {
      success: true,
      data: content,
      message: 'File read successfully',
    };
  } catch (error) {
    console.error('File reading error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error reading file' 
    };
  }
};

const getFileType = (file) => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'docx':
      return 'docx';
    case 'txt':
      return 'txt';
    default:
      return null;
  }
};

const extractContent = async (file, type) => {
  switch (type) {
    case 'pdf':
      return extractPdfContent(file);
    case 'docx':
      return extractDocxContent(file);
    case 'txt':
      return extractTxtContent(file);
    default:
      throw new Error('Unsupported file type');
  }
};

const extractPdfContent = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let content = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => item.str)
        .join(' ');
      content += pageText + '\n';
    }

    return content.trim();
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract PDF content. Please ensure the file is not corrupted.');
  }
};

const extractDocxContent = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract DOCX content. Please ensure the file is not corrupted.');
  }
};

const extractTxtContent = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result || '').trim());
    reader.onerror = () => reject(new Error('Failed to read text file. Please ensure the file is not corrupted.'));
    reader.readAsText(file);
  });
};
