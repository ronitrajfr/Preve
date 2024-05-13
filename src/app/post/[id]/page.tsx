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
  // async function serverFuntion(e: any) {
  //   "use server";
  //   const user = await currentUser();
  //   const userId = user?.publicMetadata.userId;
  //   if (!userId) return;
  //   const content = e.get("inputThing");
  //   console.log(content);
  //   const newMessage = await prisma.message.create({
  //     data: {
  //       content,
  //       createdById: userId as string,
  //       chatId: params.id,
  //     },
  //   });
  //   console.log(newMessage);
  // }
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />

      <InputCom content={res?.content} />
    </div>
  );
}

export default Page;
