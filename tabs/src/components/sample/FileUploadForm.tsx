import { FormButton, Flex, FlexItem } from '@fluentui/react-northstar';
import './FileUploadForm.css'
import React, { useRef, useState } from 'react';

interface FileUploadFormProps {
  message: string;
}

export function FileUploadForm({ message }: FileUploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    setLoading(true);
    // do something with the file, such as send it to a server
  };

  return (
    <div>
      <p>{message}</p>
      <Flex gap="gap.medium" vAlign="center">
          <FormButton disabled={loading} onClick={handleButtonClick}>Choose file</FormButton>
        {file && (
            <div className="file-name">{file.name}</div>
        )}
      </Flex>
      {file && (
        <Flex styles={{padding: "5px 0"}}>
            {loading ? (
                <FormButton loading disabled primary onClick={handleUpload} content={"Uploading..."} />
                ) : (
                <FormButton primary onClick={handleUpload}>Upload</FormButton>
            )}
        </Flex>
      )}
      <input
        ref={fileInputRef}
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </div>
  );
}
