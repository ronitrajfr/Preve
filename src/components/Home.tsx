"use client";
import axios from "axios";

import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          axios
            .post("/api/pdf", {
              name: "yo",
              url: res[0].url,
            })
            .then((response) => {
              console.log(response);
              alert("uploaded");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
