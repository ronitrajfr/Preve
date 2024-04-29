"use client";

import { DefaultSidebar } from "@/components/sidebar/Sidebar";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { useUser } from "@clerk/clerk-react";

import axios from "axios";

export const Home = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <main className=" h-screen flex">
      <DefaultSidebar />
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          // Do something with the response
          console.log("Files: ", res);
          axios.post("https://presolve.vercel.app/api/chat", {
            userId: user?.publicMetadata.userId,
            imageUrl: res[0].url,
          });
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
