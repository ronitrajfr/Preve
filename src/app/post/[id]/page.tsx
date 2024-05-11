import prisma from "@/utils/db";
import { Navbar } from "@/components/tools/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { InputCom } from "@/components/tools/InputCom";
import sendToServer from "@/app/actions/sendToServer";
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
    notFound();
  }
  return data;
}

async function Page({ params }: { params: Params }) {
  // Now you can use `postId` in your component logic
  const res = await getContent(params.id);
  const pdfId = res?.id;
  // console.log(res?.content);
  if (params.id != res?.id) {
    notFound();
  }
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className=" rounded-xl w-[300px] h-[10rem] flex justify-center items-center">
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
      <form action={sendToServer} className="flex justify-center mb-6">
        <InputCom />
        <button
          type="submit"
          className="bg-orange-400 text-white p-2.5 rounded-lg ml-2"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Page;
