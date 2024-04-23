"use client";

import { Sidebar } from "@/components/sidebar/Sidebar";
import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
  return (
    <main className="bg-slate-900 h-screen flex">
      <Sidebar />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
