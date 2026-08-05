"use client";

import { useState, useRef } from "react";
import { usePatientRecords, useAddPatientRecord, useFileUpload } from "@/lib/api/hooks";
import { FileText, Download, Upload, Plus, FileSpreadsheet, Activity, Pill, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function PatientRecords() {
  const { data: records, isLoading } = usePatientRecords();
  const addRecordMutation = useAddPatientRecord({
    onSuccess: () => {
      toast.success("Document added to patient profile!");
      setShowUploadModal(false);
    },
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [docCategory, setDocCategory] = useState<"Lab Result" | "Prescription" | "Imaging" | "Doctor Note">("Lab Result");
  const [docNotes, setDocNotes] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useFileUpload({
    onSuccess: (data) => {
      setFileUrl(data.url);
      setUploadProgress(null);
      toast.success("File uploaded successfully!");
    },
    onError: (err) => {
      setUploadProgress(null);
      toast.error(err.message || "Failed to upload file");
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!docTitle) {
      setDocTitle(file.name.replace(/\.[^/.]+$/, ""));
    }

    setUploadProgress(0);
    uploadMutation.mutate({
      file,
      onProgress: (p) => setUploadProgress(p),
    });
  };

  const handleAddRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) {
      toast.error("Please enter a document title.");
      return;
    }
    const finalUrl = fileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    addRecordMutation.mutate({
      title: docTitle,
      category: docCategory,
      notes: docNotes,
      fileUrl: finalUrl,
      fileSize: "1.2 MB",
      doctorName: "Dr. Elena Vance",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Lab Result":
        return <Activity className="w-5 h-5 text-emerald-500" />;
      case "Prescription":
        return <Pill className="w-5 h-5 text-amber-500" />;
      case "Imaging":
        return <FileSpreadsheet className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border">
        <div>
          <h3 className="text-base font-bold text-foreground">Medical Records & Documents</h3>
          <p className="text-xs text-muted-foreground">Access your blood tests, prescriptions, and scan reports</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Documents Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12 bg-card rounded-2xl border border-border">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      ) : !records || records.length === 0 ? (
        <div className="p-12 text-center bg-card rounded-2xl border border-border">
          <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground">No medical documents uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-muted border border-border">
                      {getCategoryIcon(rec.category)}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block">
                        {rec.category}
                      </span>
                      <h4 className="text-sm font-bold text-foreground line-clamp-1">{rec.title}</h4>
                    </div>
                  </div>
                </div>

                {rec.notes && (
                  <p className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-xl border border-border/40">
                    {rec.notes}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>Issued: {rec.date}</span>
                  {rec.fileSize && <span>{rec.fileSize}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border mt-4">
                <a
                  href={rec.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold transition-all"
                >
                  <Eye className="w-3.5 h-3.5" /> View
                </a>
                <a
                  href={rec.fileUrl}
                  download
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-all"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card rounded-3xl border border-border p-6 shadow-md space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Upload Medical Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRecordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Annual Blood Test Report"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">
                  Document Category
                </label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
                >
                  <option value="Lab Result">Lab Result</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Imaging">Imaging / X-Ray / Scan</option>
                  <option value="Doctor Note">Doctor Note</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">
                  Attachment File
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 border-dashed border-border hover:border-emerald-500/50 bg-muted/20 text-center cursor-pointer transition-all"
                >
                  <Upload className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-foreground">Click to select PDF or image file</p>
                  {uploadProgress !== null && (
                    <p className="text-xs text-emerald-500 mt-2 font-medium">Uploading: {uploadProgress}%</p>
                  )}
                  {fileUrl && (
                    <p className="text-xs text-emerald-500 mt-2 font-semibold">File Attached ✓</p>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">
                  Notes / Observations
                </label>
                <textarea
                  rows={2}
                  value={docNotes}
                  onChange={(e) => setDocNotes(e.target.value)}
                  placeholder="Additional notes about this document..."
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addRecordMutation.isPending}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md cursor-pointer disabled:opacity-50"
                >
                  {addRecordMutation.isPending ? "Saving..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
