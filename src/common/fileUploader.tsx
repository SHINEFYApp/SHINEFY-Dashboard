"use client";

import { useCallback, useRef, useState } from "react";
import Arrow from "@/assets/images/fileUploader/Vector.png";
import { useField } from "formik";
import { X } from "lucide-react";

export default function FileUploader({ name , title }: { name: string , title: string }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [field , meta, helpers] = useField(name);
  const [fileName, setFileName] = useState<string>("");

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files?.length) {
      helpers.setValue(files[0]);
      setFileName(files[0].name);
    }
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      helpers.setValue(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className={`w-full flex flex-col gap-[10.94px] h-[185.46px] bg-gray-50 p-[16.46px] rounded-xl shadow border ${meta.error && meta.touched ? 'border-red-500' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold text-[12.31px] text-gray-900">{title}</h1>
          <button type="button" onClick={() => {
            setFileName('')
          }}>
            <X size={15} />
          </button>
        </div>

        <div
          onClick={openFileDialog}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-[99px] border-2 border-dashed border-yellow-400 rounded-xl 
                    flex flex-col gap-2 justify-center items-center bg-white text-gray-500 cursor-pointer"
        >
          <img className="w-[24.61px] h-[16.41px]" src={Arrow} alt="" />

          <p className="text-[9.57px]">
            {fileName
              ? <span className="font-semibold text-gray-900">{fileName}</span>
              : <>Drag your file(s) or <span className="text-yellow-500 underline">browse</span> <br />
                Max 10 MB files are allowed
              </>}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleSelect}
            className="hidden"
          />
        </div>


        <p className="text-[9px] text-gray-400 mt-1">
          Only support .jpg, .png, .svg and .zip — Max 10 MB files are allowed
        </p>
      </div>
      {meta.error && meta.touched && (
        <p className="text-xs text-red-500 mt-3">{meta.error}</p>
      )}
    </>
  );
}
