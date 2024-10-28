import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      {/* Hero Section */}
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Image
          src="/placeholder.png"
          alt="Art Gallery Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold text-center sm:text-left">Discover Unique Art Pieces</h1>
        <p className="text-center text-lg sm:text-left">
          Explore a curated collection of artwork from talented artists. Discover pieces that inspire and bring beauty into your space.
        </p>

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
            <p className="mt-4 text-lg font-semibold">"Sunset Bliss" by Artist Name</p>
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
            <p className="mt-4 text-lg font-semibold">"Ethereal Dreams" by Artist Name</p>
            <p className="text-sm text-gray-600">$300.00</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="bg-primary text-white flex h-10 items-center justify-center rounded-full px-4 text-sm transition-colors hover:bg-blue-700 sm:h-12 sm:px-5 sm:text-base"
            href="/shop"
          >
            Shop All Artworks
          </a>
        </div>
      </main>
    </div>
  );
}
