// FileUpload.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onFileChange: (file: File) => void; // 修改为直接处理文件上传
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      onFileChange(file); // 直接调用上传逻辑
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="file">Upload File</Label>
      <Input
        id="file"
        type="file"
        onChange={handleFileChange}
        className="border-dashed focus:border-solid"
      />
    </div>
  );
};

export default FileUpload;