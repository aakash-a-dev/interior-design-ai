"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInComponent({ providers }: { providers: any }) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name} className="mt-6">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="flex w-full items-center justify-center gap-4 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200"
            >
              <div className="relative h-5 w-5">
                <Image
                  src="/google.svg"
                  alt="Google Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Continue with {provider.name}</span>
            </button>
          </div>
        ))}
    </>
  );
} 