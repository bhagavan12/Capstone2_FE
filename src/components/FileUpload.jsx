import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

export const FileUpload = ({ onFileSelect, acceptedTypes }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const getAcceptString = () => {
      //   pdf: 'application/pdf',
    const typeMap = {
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      txt: 'text/plain',
    };
    return acceptedTypes.map((type) => typeMap[type]).join(',');
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={getAcceptString()}
          className="hidden"
        />
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Click or drag file to upload
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Supported formats: {acceptedTypes.join(', ').toUpperCase()}
        </p>
      </div>
    </div>
  );
};
