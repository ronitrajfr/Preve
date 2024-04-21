"use client";
import Image from "next/image";

import { useState } from "react";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";

export default function Home() {
  const [image, setImage] = useState<string>("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImage(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {image.length ? (
        <div>
          <img src={image} alt="imae" width={200} height={200} />
        </div>
      ) : null}
    </main>
  );
}
