// FileUpload.tsx
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileChange: (file: File) => void; // 上传文件的回调
  onFileRemove: () => void; // 删除文件的回调
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, onFileRemove }) => {
  const [file, setFile] = useState<File | null>(null); // 当前选中的文件

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFile(file);
      onFileChange(file); // 调用上传逻辑
    }
  };

  const handleFileRemove = () => {
    setFile(null); // 清空当前文件
    onFileRemove(); // 调用删除文件的回调
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
      {file && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">{file.name}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFileRemove}
            className="rounded-full"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;