"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import GoogleLogo from "./GoogleLogo";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        <Image
          alt="header text"
          src="/bed.svg"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        />
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
         Interior AI
        </h1>
      </Link>
      
      {!session && pathname !== "/auth/signin" && (
        <button
          onClick={() => signIn(undefined, { callbackUrl: pathname === "/" ? "/dream" : pathname })}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-[#17181C] transition-all duration-200 group"
        >
          <div className="w-5 h-5 opacity-80 group-hover:opacity-100">
            <GoogleLogo />
          </div>
          <span>Sign in</span>
        </button>
      )}
    </header>
  );
}

function Github({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
