import { getProviders } from "next-auth/react";
import SignInComponent from "./components/SignInComponent";

async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Interior AI
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to continue
          </p>
        </div>
        <SignInComponent providers={providers} />
      </div>
    </div>
  );
}

export default SignIn; 