import prisma from "@/utils/db";
import { Navbar } from "@/components/tools/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { InputCom } from "@/components/tools/InputCom";
import { useEffect, useRef } from 'react';

interface Params {
  id: string;
}

async function getContent(id: string) {
  const user = await currentUser();
  const userId = user?.publicMetadata.userId;
  if (!userId) return;

  const data = await prisma.pdf.findUnique({
    where: {
      id,
      createdById: userId,
    },
  });
  if (!data) {
    redirect("/not_found");
  }
  return data;
}

async function submitMessage(message: string) {
  // send the message to the backend
  console.log("Message submitted:", message);
}

async function Page({ params }: { params: Params }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      if (!inputRef.current) return;
      const inputValue = inputRef.current.value;
      submitMessage(inputValue);
    };

    const form = document.getElementById('inputForm');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmit);
      }
    };
  }, []);

  const handleInputSubmit = async () => {
    if (!inputRef.current) return;
    const inputValue = inputRef.current.value;
    submitMessage(inputValue);
  };

  const res = await getContent(params.id);
  if (params.id != res?.id) {
    redirect("/not_found");
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="rounded-xl w-[300px] h-[10rem] flex justify-center items-center">
          <svg
            className="w-56 h-56 text-orange-300 z--4"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16 8H8V6h8zm0 2H8v2h8zm4-6v12l-6 6H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2m-2 10V4H6v16h6v-4a2 2 0 0 1 2-2z"
            />
          </svg>
        </div>
        {/* Your content here */}
      </div>
      <div className="flex justify-center mb-6">
        <form id="inputForm">
          <InputCom ref={inputRef} />
          <button type="submit" onClick={handleInputSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
