/* eslint-disable react/no-unescaped-entities */
// src/app/page.tsx

import Image from "next/image";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="flex flex-col items-center gap-16 p-8 pb-20 sm:p-20">
        {/* Featured Artworks */}
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center">
            <Image
              src="/placeholder.png"
              alt="Featured Artwork 1"
              width={300}
              height={400}
              className="rounded-lg shadow-lg"
            />
            <p className="mt-4 text-lg font-semibold">
              "Sunset Bliss" by Artist Name
            </p>
            <p className="text-sm text-gray-600">$200.00</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/placeholder.png"
              alt="Featured Artwork 2"
              width={300}
              height={400}
              className="rounded-lg shadow-lg"
            />
            <p className="mt-4 text-lg font-semibold">
              "Ethereal Dreams" by Artist Name
            </p>
            <p className="text-sm text-gray-600">$300.00</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm text-white sm:h-12 sm:px-5 sm:text-base hover:bg-primary-dark transition-colors"
            href="/shop"
          >
            Shop All Artworks
          </a>
        </div>
      </main>
    </div>
  );
}
