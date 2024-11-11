// src/components/ProductCard.tsx

import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
  artist?: {
    username?: string; // Artist's username
    image?: string; // Artist's profile image
  };
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="group m-2 flex max-w-xs transform flex-col overflow-hidden rounded-lg border bg-base-300 p-4 shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <div className="relative mb-2 h-48 w-full">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          layout="fill"
          objectFit="contain"
          className="transform rounded-lg transition-transform duration-300 group-hover:scale-105" // Apply scaling on parent hover
        />
        <span className="absolute bottom-2 right-2 rounded-lg bg-gradient-to-r from-primary to-blue-600 px-3 py-1 text-lg font-semibold text-white shadow-md">
          £{product.priceInCents / 100}
        </span>
      </div>
      <h2 className="mt-2 text-xl font-bold">{product.name}</h2>
      <div className="flex-grow h-20">
        <p className="mt-1 line-clamp-3 text-gray-700">
          {product.description}
        </p>
      </div>

      {/* Artist Username Section */}
      <div className="mt-2 flex items-center text-sm text-gray-300">
        {/* Display artist image if available */}
        {product.artist?.image && (
          <div className="mr-2 flex-shrink-0">
            <Image
              src={product.artist.image || "/placeholder.png"}
              alt={`${product.artist.username}'s profile`}
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
        )}
        <span className="font-medium">{product?.artist?.username || 'Unknown'}</span>
      </div>
    </div>
  );
}
