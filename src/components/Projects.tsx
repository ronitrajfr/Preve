import axios from "axios";
import prisma from "@/utils/db";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

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
  console.log(res);
  return (
    <div>
      {res &&
        res.map((data) => {
          return <div>{data.createdById}</div>;
        })}
    </div>
  );
}
