// // components/file-picker/MultiFileUploadField.tsx
// "use client";
// import React, { useState, useRef } from "react";
// import { api } from "@/lib/api";
// import { Icon } from "../../lib/icons"

// interface FileItem {
//   id: number;
//   url: string;
//   name: string;
// }

// interface MultiFileUploadFieldProps {
//   value: number[];
//   initialFiles?: FileItem[];   // preloaded when editing
//   onChange: (ids: number[]) => void;
// }

// export function MultiFileUploadField({
//   value,
//   initialFiles = [],
//   onChange,
// }: MultiFileUploadFieldProps) {
//   const [files, setFiles] = useState<FileItem[]>(initialFiles);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleUpload = async (fileList: FileList) => {
//     setUploading(true);
//     try {
//       const results = await Promise.all(
//         Array.from(fileList).map(async (file) => {
//           const formData = new FormData();
//           formData.append("file", file);
//           const { data } = await api.post("/api/files/", formData);
//           return { id: data.id, url: data.url, name: data.original_name };
//         })
//       );
//       const newFiles = [...files, ...results];
//       setFiles(newFiles);
//       onChange(newFiles.map((f) => f.id));
//     } catch (err: any) {
//       alert("Upload failed: " + (err.response?.data?.detail || err.message));
//     } finally {
//       setUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   const removeFile = (id: number) => {
//     const newFiles = files.filter((f) => f.id !== id);
//     setFiles(newFiles);
//     onChange(newFiles.map((f) => f.id));
//   };

//   return (
//     <div>
//       <div className="flex flex-wrap gap-2 mb-3">
//         {files.map((file) => (
//           <div key={file.id} className="relative group">
//             <img
//               src={file.url}
//               alt={file.name}
//               className="w-20 h-20 rounded-lg object-cover border border-gray-200"
//             />
//             <button
//               type="button"
//               onClick={() => removeFile(file.id)}
//               className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>

//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         accept="image/*,video/*"
//         className="hidden"
//         onChange={(e) => {
//           if (e.target.files?.length) handleUpload(e.target.files);
//         }}
//       />
//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         disabled={uploading}
//         className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors
//                    bg-white text-[#1F3D5A] border-[#C8A96B]/30 hover:bg-[#F7F2EA] disabled:opacity-50"
//       >
//         {uploading ? (
//           <>
//             {Icon.spinner} Uploading…
//           </>
//         ) : (
//           <>
//             {Icon.upload} Add Files
//           </>
//         )}
//       </button>
//     </div>
//   );
// }
