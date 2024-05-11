import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export const Navbar = () => {
  // const { user } = useUser();
  // axios.post("http://localhost:3000/api/chat", {
  //   id
  // })
  return (
    <div className="flex justify-center">
      <div className="absolute z-[9999] mt-2 flex w-[calc(100vw-2rem)] flex-row items-center justify-between border border-neutral-200/75 bg-white/80 p-1 shadow-sm backdrop-blur-md md:mt-5 md:w-[48rem]">
        <div>
          <Link id="logo" href="/">
            <Image src={"/preve.png"} alt="logo" width={60} height={60} />
          </Link>
        </div>
        <div className="flex flex-row">
          <div className="mr-2 flex">
            <a target="_blank" href="https://github.com/rrajofficial7/preve">
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 __className_4ece75 h-8 rounded-none border border-transparent bg-transparent p-3 text-xs text-neutral-700 shadow-none duration-100 hover:bg-neutral-200 md:h-8 md:px-3 md:py-4 md:text-sm">
                GitHub
              </button>
            </a>
          </div>
          <div className="mr-2 flex">
            <a
              target="_blank"
              href="https://github.com/rrajofficial7/preve/discussions/"
            >
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 __className_4ece75 h-8 rounded-none border border-transparent bg-transparent p-3 text-xs text-neutral-700 shadow-none duration-100 hover:bg-neutral-200 md:h-8 md:px-3 md:py-4 md:text-sm">
                Feedback
              </button>
            </a>
          </div>
          <div className="mr-0 flex md:mr-2">
            <a href={`mailto:ronitrajofficial7@gmail.com`}>
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 __className_4ece75 h-8 rounded-none border border-transparent bg-transparent p-3 text-xs text-neutral-700 shadow-none duration-100 hover:bg-neutral-200 md:h-8 md:px-3 md:py-4 md:text-sm">
                Contact
              </button>
            </a>
          </div>
          <div className="mr-0 hidden md:mr-2 md:flex">
            <Link href="/">
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 __className_4ece75 h-8 rounded-none border border-[#FF5F1F] bg-transparent p-3 text-xs text-[#FF5F1F] shadow-none duration-100 hover:bg-[#FF5F1F]/5 md:h-8 md:p-4 md:text-sm">
                Home
              </button>
            </Link>
          </div>
          <div className="hidden md:flex">
            <Link href="/projects">
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 __className_4ece75 h-8 rounded-none border border-[#FF5F1F] bg-[#FF5F1F] p-3 text-xs text-neutral-50 shadow-none duration-100 hover:bg-[#FF5F1F]/90 md:h-8 md:p-4 md:text-sm">
                Projects
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
