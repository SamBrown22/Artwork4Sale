// src/components/ProductCard.tsx

import Image from "next/image";
import { Product } from "@/types/Product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  link: boolean;
}

export default function ProductCard({ product, link }: ProductCardProps) {
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

      {/* Conditionally render the heading as a link */}
      {link ? (
        <Link href={`/product/${product.id}`}>
          <h2 className="mt-2 text-xl font-bold hover:underline">{product.name}</h2>
        </Link>
      ) : (
        <h2 className="mt-2 text-xl font-bold">{product.name}</h2>
      )}

      <div className="flex-grow h-20">
        <p className="mt-1 line-clamp-3 text-gray-600">
          {product.description}
        </p>
      </div>

      {/* Artist Username Section */}
      <div className="mt-2 flex items-center text-sm text-content">
        {/* Display artist image if available */}
        {product.artist?.image && (
          <div className="mr-2 flex-shrink-0 relative h-6 w-6">
            <Image
              src={product.artist.image || "/placeholder.png"}
              alt={`${product.artist.username}'s profile`}
              layout="fill"
              objectFit="cover" // Ensures the image is cropped to fit the circle
              className="rounded-full"
            />
          </div>
        )}
        <span className="font-medium">{product?.artist?.username || 'Unknown'}</span>
      </div>
    </div>
  );
}
