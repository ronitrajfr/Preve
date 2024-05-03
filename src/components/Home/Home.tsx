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
          console.log("Files: ", res);
          alert("uploaded completed");
          const newPost = axios
            .post("/api/chat", {
              imageUrl: res[0].url,
              userId: user?.publicMetadata.userId,
            })
            .then((response) => {
              console.log(response.data);
              alert("uploaded successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
          console.log(error);
        }}
      />
    </main>
  );
};
