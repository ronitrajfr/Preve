import prisma from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Link from "next/link";
import { Navbar } from "./tools/Navbar";

async function fetchData() {
  const user = await currentUser();
  const userId = user?.publicMetadata.userId;
  if (!userId) return;

  const getPdfs = await prisma.pdf.findMany({
    where: {
      createdById: userId as string,
    },
  });

  return getPdfs;
}

export async function Projects() {
  const res = await fetchData();
  return (
    <>
      <Navbar />
      <div className="mt-36 flex gap-5 flex-wrap justify-center">
        {res &&
          res.map((data) => {
            const truncatedContent =
              data.content && data.content.length > 13
                ? data.content.substring(0, 75) + "..."
                : data.content;

            return (
              <div
                key={data.id} // Make sure to provide a unique key when mapping over elements
                className="w-[300px] h-80 rounded-xl bg-white border border-gray-200 shadow"
              >
                <div className="bg-slate-50 rounded-xl w-[300px] h-[10rem] flex justify-center items-center">
                  <svg
                    className="w-20 h-20 text-orange-500"
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
                <div className="mx-4 mt-3">{truncatedContent}</div>
                <div className="flex items-center justify-center mt-3">
                  <a
                    target="_blank"
                    href={`/post/${data.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-600 "
                  >
                    Continue
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
