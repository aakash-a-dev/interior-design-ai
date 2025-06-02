"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import GoogleLogo from "../components/GoogleLogo";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        {/* Hero Section */}
        <a
          className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-5 transition duration-300 ease-in-out hover:text-gray-300 hover:border-gray-600"
        >
         Design your room{" "}
          <span className="text-blue-600">with AI</span>
        </a>
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Generating dream spaces{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>{" "}
          for everyone.
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400 text-gray-500 leading-7">
          Take a picture of your room and see how your room looks in different
          themes. 100% free – remodel your room today.
        </h2>
        {session ? (
          <Link
            className="bg-blue-600 rounded-xl text-white font-medium px-8 py-3 sm:mt-10 mt-8 hover:bg-blue-500 transition flex items-center gap-2 text-lg"
            href="/dream"
          >
            <Image
              src="/bed.svg"
              alt="Room Icon"
              width={24}
              height={24}
              className="filter brightness-200"
            />
            Generate your dream space
          </Link>
        ) : (
          <button
            onClick={() => signIn(undefined, { callbackUrl: "/dream" })}
            className="bg-white rounded-xl text-gray-800 font-medium px-8 py-3 sm:mt-10 mt-8 hover:bg-gray-50 border-2 border-gray-800 transition flex items-center gap-3 text-lg group"
          >
            <div className="w-6 h-6 group-hover:scale-110 transition">
              <GoogleLogo />
            </div>
            Sign in with Google to Start
          </button>
        )}

        {/* Features Section */}
        <div className="mt-20 md:mt-32">
          <h2 className="text-4xl font-bold text-gray-300 mb-12">Why Choose Interior AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-700 rounded-xl hover:border-gray-600 transition">
              <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Instant Transformation</h3>
              <p className="text-gray-400">Transform your space in seconds with our advanced AI technology</p>
            </div>
            <div className="p-6 border border-gray-700 rounded-xl hover:border-gray-600 transition">
              <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Multiple Styles</h3>
              <p className="text-gray-400">Choose from various design styles to match your preferences</p>
            </div>
            <div className="p-6 border border-gray-700 rounded-xl hover:border-gray-600 transition">
              <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Real-Time Preview</h3>
              <p className="text-gray-400">See how your room will look before making any changes</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 md:mt-32">
          <h2 className="text-4xl font-bold text-gray-300 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-xl mb-4 mx-auto">1</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Upload Your Room</h3>
              <p className="text-gray-400">Take a photo of your room or upload an existing one</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-xl mb-4 mx-auto">2</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Choose Style</h3>
              <p className="text-gray-400">Select from our curated collection of interior design styles</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-xl mb-4 mx-auto">3</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Get Results</h3>
              <p className="text-gray-400">Receive your AI-generated room design in seconds</p>
            </div>
          </div>
        </div>

        {/* Examples Section */}
        <div className="mt-20 md:mt-32">
          <h2 className="text-4xl font-bold text-gray-300 mb-12">See It In Action</h2>
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Original Room</h3>
                <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/original-pic.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                  priority={true}
                  loading="eager"
                  onError={(e: any) => {
                    console.error("Error loading original example image:", e);
                    e.currentTarget.src = "/generated-pic.png";
                  }}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">Generated Room</h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/generated-pic-2.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                  priority={true}
                  loading="eager"
                  onError={(e: any) => {
                    console.error("Error loading generated example image:", e);
                    e.currentTarget.src = "/generatedpic.png";
                  }}
                />
              </div>
            </div>
            <div className="text-gray-400 text-sm mt-2">
              ↑ Example of a room transformed into a minimalist style
            </div>
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Original Room</h3>
                <Image
                  alt="Original photo of a room"
                  src="/room-2/istockphoto-822550582-612x612.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                  loading="eager"
                  onError={(e: any) => {
                    console.error("Error loading room 2 original image:", e);
                    e.currentTarget.src = "/original-pic.jpg";
                  }}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">Generated Room</h3>
                <Image
                  alt="Generated photo of a room"
                  width={400}
                  height={400}
                  src="/room-2/istockphoto-822550582-612x612-new.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                  loading="eager"
                  onError={(e: any) => {
                    console.error("Error loading room 2 generated image:", e);
                    e.currentTarget.src = "/generated-pic-2.jpg";
                  }}
                />
              </div>
            </div>
            <div className="text-gray-400 text-sm mt-2">
              ↑ Example of a room transformed into a luxury style
            </div>
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Original Room</h3>
                <Image
                  alt="Original photo of a room"
                  src="/room-3/stock-photo-empty-space.jpeg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">Generated Room</h3>
                <Image
                  alt="Generated photo of a room"
                  width={400}
                  height={400}
                  src="/room-3/stock-photo-empty-space-new.jpeg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
            <div className="text-gray-400 text-sm mt-2">
              ↑ Example of a room transformed into a contemporary style
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-700 rounded-xl">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">10k+</h3>
              <p className="text-gray-400">Rooms Transformed</p>
            </div>
            <div className="p-6 border border-gray-700 rounded-xl">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">20+</h3>
              <p className="text-gray-400">Design Styles</p>
            </div>
            <div className="p-6 border border-gray-700 rounded-xl">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">5k+</h3>
              <p className="text-gray-400">Happy Users</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 md:mt-32 w-full max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-300 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="p-6 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">How does it work?</h3>
              <p className="text-gray-400">Our AI technology analyzes your room photo and generates a new design based on your chosen style. It maintains the room's structure while transforming the decor, colors, and furniture.</p>
            </div>
            <div className="p-6 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Is it free to use?</h3>
              <p className="text-gray-400">Yes! Interior AI is completely free to use. Just sign in with your Google account and start transforming your spaces.</p>
            </div>
            <div className="p-6 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">What types of rooms can I transform?</h3>
              <p className="text-gray-400">You can transform any indoor space including living rooms, bedrooms, kitchens, bathrooms, offices, and more.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 md:mt-32 mb-16">
          <h2 className="text-3xl font-bold text-gray-300 mb-8">Ready to transform your space?</h2>
          {!session && (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/dream" })}
              className="bg-blue-600 rounded-xl text-white font-medium px-8 py-3 hover:bg-blue-500 transition flex items-center gap-3 mx-auto"
            >
              <div className="w-6 h-6">
                <GoogleLogo />
              </div>
              Get Started Now
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
