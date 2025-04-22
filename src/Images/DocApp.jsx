// // import React, { useState } from 'react';
// // import { compressData, decompressData, encryptData, decryptData, getSizeInBytes } from '../utils/cryptoUtils'; // Import your utils

// // import '@react-pdf-viewer/core/lib/styles/index.css';
// // import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// // import * as pdfjsLib from 'pdfjs-dist';
// import { pdfjs } from 'react-pdf';
// // import * as mammoth from 'mammoth';
// // // pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js`;
// // pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// // const FileProcessor = () => {
// //     const [file, setFile] = useState(null);
// //     const [fileContent, setFileContent] = useState('');
// //     const [compressionResult, setCompressionResult] = useState(null);
// //     const [encryptionResult, setEncryptionResult] = useState(null);
// //     const [decryptionResult, setDecryptionResult] = useState(null);
// //     const [fileSizes, setFileSizes] = useState(null);

// //     const handleFileChange = async (event) => {
// //         const uploadedFile = event.target.files[0];
// //         if (!uploadedFile) return;

// //         setFile(uploadedFile);
// //         const fileType = uploadedFile.type;

// //         let content = '';
// //         if (fileType === 'application/pdf') {
// //             content = await readPdf(uploadedFile);
// //         } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
// //             content = await readDocx(uploadedFile);
// //         } else if (fileType === 'text/plain') {
// //             content = await readTextFile(uploadedFile);
// //         } else {
// //             alert('Unsupported file type');
// //             return;
// //         }

// //         setFileContent(content);
// //         processFile(content);
// //     };

// //     const readTextFile = (file) => {
// //         return new Promise((resolve, reject) => {
// //             const reader = new FileReader();
// //             reader.onload = () => resolve(reader.result);
// //             reader.onerror = reject;
// //             reader.readAsText(file);
// //         });
// //     };

// //     //   const readPdf = (file) => {
// //     //     return new Promise((resolve, reject) => {
// //     //       const reader = new FileReader();
// //     //       reader.onload = async () => {
// //     //         try {
// //     //           const pdf = await pdfjsLib.getDocument(reader.result).promise;
// //     //           const numPages = pdf.numPages;
// //     //           let text = '';
// //     //           for (let pageNum = 1; pageNum <= numPages; pageNum++) {
// //     //             const page = await pdf.getPage(pageNum);
// //     //             const content = await page.getTextContent();
// //     //             text += content.items.map(item => item.str).join(' ');
// //     //           }
// //     //           resolve(text);
// //     //         } catch (error) {
// //     //           reject('Error reading PDF');
// //     //         }
// //     //       };
// //     //       reader.onerror = reject;
// //     //       reader.readAsArrayBuffer(file);
// //     //     });
// //     //   };
// //     const readPdf = (file) => {
// //         return new Promise((resolve, reject) => {
// //             const reader = new FileReader();
// //             reader.onload = async () => {
// //                 try {
// //                     const pdf = await pdfjsLib.getDocument(reader.result).promise;
// //                     const numPages = pdf.numPages;
// //                     let text = '';
// //                     for (let pageNum = 1; pageNum <= numPages; pageNum++) {
// //                         const page = await pdf.getPage(pageNum);
// //                         const content = await page.getTextContent();
// //                         text += content.items.map(item => item.str).join(' ');
// //                     }
// //                     resolve(text);
// //                 } catch (error) {
// //                     reject('Error reading PDF: ' + error.message);
// //                 }
// //             };
// //             reader.onerror = (error) => reject('Error reading file: ' + error);
// //             reader.readAsArrayBuffer(file);
// //         });
// //     };
// //     const readDocx = (file) => {
// //         return new Promise((resolve, reject) => {
// //             const reader = new FileReader();
// //             reader.onload = () => {
// //                 mammoth.extractRawText({ arrayBuffer: reader.result })
// //                     .then(result => resolve(result.value))
// //                     .catch(reject);
// //             };
// //             reader.onerror = reject;
// //             reader.readAsArrayBuffer(file);
// //         });
// //     };

// //     const processFile = (content) => {
// //         // Display file size before compression
// //         const originalSize = getSizeInBytes(content);

// //         // Compress and encrypt the content
// //         const compressedData = compressData(content);
// //         const encryptedData = encryptData(content, 'your-secret-key');  // Replace with actual key

// //         // Decrypt the encrypted data to verify
// //         const decryptedData = decryptData(encryptedData.data, 'your-secret-key');  // Replace with actual key

// //         setFileSizes({
// //             original: originalSize,
// //             compressed: compressedData.data ? getSizeInBytes(compressedData.data) : 0,
// //             encrypted: encryptedData.data ? getSizeInBytes(encryptedData.data) : 0,
// //             decrypted: decryptedData.data ? getSizeInBytes(decryptedData.data) : 0,
// //         });

// //         setCompressionResult(compressedData);
// //         setEncryptionResult(encryptedData);
// //         setDecryptionResult(decryptedData);
// //     };

// //     return (
// //         <div>
// //             <input type="file" onChange={handleFileChange} />
// //             <div>
// //                 <h3>File Content Preview:</h3>
// //                 <pre>{fileContent}</pre>
// //             </div>
// //             <div>
// //                 <h3>File Size Comparison:</h3>
// //                 <p>Original Size: {fileSizes?.original} bytes</p>
// //                 <p>Compressed Size: {fileSizes?.compressed} bytes</p>
// //                 <p>Encrypted Size: {fileSizes?.encrypted} bytes</p>
// //                 <p>Decrypted Size: {fileSizes?.decrypted} bytes</p>
// //             </div>
// //             <div>
// //                 <h3>Results:</h3>
// //                 <p>{compressionResult?.message}</p>
// //                 <p>{encryptionResult?.message}</p>
// //                 <p>{decryptionResult?.message}</p>
// //             </div>
// //         </div>
// //     );
// // };

// // export default FileProcessor;


// import React, { useState } from 'react';
// import { pdfjs } from 'react-pdf';
// import * as mammoth from 'mammoth';
// import { compressData, decompressData, encryptData, decryptData, getSizeInBytes } from '../utils/cryptoUtils'; // Import your utils

// // import '@react-pdf-viewer/core/lib/styles/index.css';
// // import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// // Set worker source for pdf.js
// // pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
// const FileProcessor = () => {
//     const [file, setFile] = useState(null);
//     const [fileContent, setFileContent] = useState('');
//     const [compressionResult, setCompressionResult] = useState(null);
//     const [encryptionResult, setEncryptionResult] = useState(null);
//     const [decryptionResult, setDecryptionResult] = useState(null);
//     const [fileSizes, setFileSizes] = useState(null);

//     const handleFileChange = async (event) => {
//         const uploadedFile = event.target.files[0];
//         if (!uploadedFile) return;

//         setFile(uploadedFile);
//         const fileType = uploadedFile.type;

//         let content = '';
//         if (fileType === 'application/pdf') {
//             content = await readPdf(uploadedFile);
//         } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//             content = await readDocx(uploadedFile);
//         } else if (fileType === 'text/plain') {
//             content = await readTextFile(uploadedFile);
//         } else {
//             alert('Unsupported file type');
//             return;
//         }

//         setFileContent(content);
//         processFile(content);
//     };

//     const readTextFile = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = reject;
//             reader.readAsText(file);
//         });
//     };

//     const readPdf = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = async () => {
//                 try {
//                     // Use pdfjs from react-pdf
//                     const pdf = await pdfjs.getDocument(reader.result).promise;
//                     const numPages = pdf.numPages;
//                     let text = '';
//                     for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//                         const page = await pdf.getPage(pageNum);
//                         const content = await page.getTextContent();
//                         text += content.items.map(item => item.str).join(' ');
//                     }
//                     resolve(text);
//                 } catch (error) {
//                     reject('Error reading PDF: ' + error.message);
//                 }
//             };
//             reader.onerror = (error) => reject('Error reading file: ' + error);
//             reader.readAsArrayBuffer(file);
//         });
//     };

//     const readDocx = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 mammoth.extractRawText({ arrayBuffer: reader.result })
//                     .then(result => resolve(result.value))
//                     .catch(reject);
//             };
//             reader.onerror = reject;
//             reader.readAsArrayBuffer(file);
//         });
//     };

//     const processFile = (content) => {
//         // Display file size before compression
//         const originalSize = getSizeInBytes(content);

//         // Compress and encrypt the content
//         const compressedData = compressData(content);
//         const encryptedData = encryptData(content, 'your-secret-key');  // Replace with actual key

//         // Decrypt the encrypted data to verify
//         const decryptedData = decryptData(encryptedData.data, 'your-secret-key');  // Replace with actual key

//         setFileSizes({
//             original: originalSize,
//             compressed: compressedData.data ? getSizeInBytes(compressedData.data) : 0,
//             encrypted: encryptedData.data ? getSizeInBytes(encryptedData.data) : 0,
//             decrypted: decryptedData.data ? getSizeInBytes(decryptedData.data) : 0,
//         });

//         setCompressionResult(compressedData);
//         setEncryptionResult(encryptedData);
//         setDecryptionResult(decryptedData);
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <div>
//                 <h3>File Content Preview:</h3>
//                 <pre>{fileContent}</pre>
//             </div>
//             <div>
//                 <h3>File Size Comparison:</h3>
//                 <p>Original Size: {fileSizes?.original} bytes</p>
//                 <p>Compressed Size: {fileSizes?.compressed} bytes</p>
//                 <p>Encrypted Size: {fileSizes?.encrypted} bytes</p>
//                 <p>Decrypted Size: {fileSizes?.decrypted} bytes</p>
//             </div>
//             <div>
//                 <h3>Results:</h3>
//                 <p>{compressionResult?.message}</p>
//                 <p>{encryptionResult?.message}</p>
//                 <p>{decryptionResult?.message}</p>
//             </div>
//         </div>
//     );
// };

// export default FileProcessor;
