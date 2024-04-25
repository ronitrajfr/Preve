"use client";

import { DefaultSidebar } from "@/components/sidebar/Sidebar";
import { UploadButton } from "@/utils/uploadthing";

export const Home = () => {
  return (
    <main className=" h-screen flex">
      <DefaultSidebar />
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
};
