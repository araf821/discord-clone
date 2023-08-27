"use client";

import { FC } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";

interface FileUploadProps {
  endPoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload: FC<FileUploadProps> = ({ endPoint, onChange, value }) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          alt="uploaded image"
          className="rounded-full object-cover"
          fill
        />
        <button
          onClick={() => onChange("")}
          type="button"
          className="absolute -right-1 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
        >
          <X className="h-4 w-4"  />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
