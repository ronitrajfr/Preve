"use server"

import { revalidatePath } from "next/cache";
import { FormEvent } from "react";


export default async function sendToServer(formData: FormData) {
    // TODO: Implement your action here
    revalidatePath("/post/[id]")
}