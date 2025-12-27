"use client";

import { useCallback, useRef, useState } from "react";
import { useField } from "formik";
import { X } from "lucide-react";
import Arrow from "@/assets/images/fileUploader/Vector.png";

interface FileUploaderProps {
  name: string;
  title: string;
  multiple?: boolean; // لتحديد إذا يقبل أكثر من صورة
  onPreview?: (files: File[]) => void; // ترجع مصفوفة من الملفات
}

export default function FileUploader({
  name,
  title,
  multiple = false,
  onPreview,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [, meta, helpers] = useField<File[]>(name);
  const [files, setFiles] = useState<File[]>([]);

  const updateFiles = (newFiles: File[]) => {
    const updated = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updated);
    helpers.setValue(updated);
    onPreview?.(updated);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length) updateFiles(droppedFiles);
    },
    [files, multiple]
  );

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length) updateFiles(selectedFiles);
  };

  const clearFile = (index?: number) => {
    if (typeof index === "number") {
      const updated = files.filter((_, i) => i !== index);
      setFiles(updated);
      helpers.setValue(updated);
      onPreview?.(updated);
    } else {
      setFiles([]);
      helpers.setValue([]);
      onPreview?.([]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div
        className={`w-full flex flex-col gap-2 h-[185px] bg-gray-50 p-4 rounded-xl shadow border
        ${meta.error && meta.touched ? "border-red-500" : "border-gray-200"}`}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-sm">{title}</h1>
          {(files.length > 0 && title !== 'Image Uploader') && (
            <button type="button" onClick={() => clearFile()}>
              <X size={15} />
            </button>
          )}
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-[99px] border-2 border-dashed border-yellow-400 rounded-xl
            flex flex-col gap-2 justify-center items-center bg-white cursor-pointer"
        >
          <img src={Arrow} className="w-6 h-4" alt="" />

          <p className="text-xs text-gray-500 text-center">
            {files.length > 0 ? (
              files.slice(0 , 1).map((file, idx) => (
                <span key={idx} className="block font-semibold text-gray-900">
                  {file.name }{files.length > 1 ? " and more..." : ' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile(idx);
                    }}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))
            ) : (
              <>
                Drag your file{multiple ? "(s)" : ""} or{" "}
                <span className="text-yellow-500 underline">browse</span>
                <br />
                Max 10 MB files are allowed
              </>
            )}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleSelect}
            className="hidden"
            multiple={multiple}
            accept=".jpg,.png,.svg"
          />
        </div>

        <p className="text-[9px] text-gray-400">
          Only support .jpg, .png, .svg — Max 10 MB
        </p>
      </div>

      {meta.error && meta.touched && (
        <p className="text-xs text-red-500 mt-2">{meta.error}</p>
      )}
    </>
  );
}
