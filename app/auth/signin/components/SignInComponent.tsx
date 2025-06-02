"use client";

import { signIn } from "next-auth/react";
import GoogleLogo from "../../../../components/GoogleLogo";

export default function SignInComponent({ providers }: { providers: any }) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name} className="mt-6">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/dream" })}
              className="flex w-full items-center justify-center gap-4 rounded-xl border-2 border-gray-800 bg-white px-6 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 group"
            >
              <div className="w-6 h-6 group-hover:scale-110 transition">
                <GoogleLogo />
              </div>
              <span>Continue with {provider.name}</span>
            </button>
          </div>
        ))}
    </>
  );
} 