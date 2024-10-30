import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative -mx-4 w-screen -my-4 my-1">
      {/* Banner Image */}
      <Image
        src="/images/Banner.jpg"
        alt="Art Gallery Banner"
        width={1920}
        height={800}  // Adjusted for a taller image display
        priority
        className="w-full h-[24rem] object-cover object-[center_65%] sm:h-[26rem] md:h-[28rem] lg:h-[28rem]"
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-300/60 to-base-300/20"></div>

      {/* Text Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-inverse-base px-4 max-w-4xl m-auto">
        <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          Discover Unique Art Pieces
        </h1>
        <p className="mt-4 text-lg sm:text-xl">
          Explore a curated collection of artwork from talented artists.
          Discover pieces that inspire and bring beauty into your space.
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
