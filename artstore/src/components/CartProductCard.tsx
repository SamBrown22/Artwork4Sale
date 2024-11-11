// src/components/ProductCard.tsx

import Image from "next/image"
import { Product } from "@/types/Product"

interface ProductCardProps {
  product: Product
  onDelete: () => void // Function to handle deletion
}

export default function CartProductCard({
  product,
  onDelete,
}: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="max-w group mb-5 flex transform overflow-hidden rounded-lg border bg-base-300 p-4 shadow-lg transition-transform duration-200 hover:scale-105"
    >
      {/* Product Image Section */}
      <div className="relative mb-2 me-4 h-40 w-40 flex-shrink-0">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          layout="fill" // Let the image fill the container
          objectFit="cover" // Ensures the image covers the entire container without distorting
          className="transform rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 rounded-lg bg-gradient-to-r from-primary to-blue-600 px-3 py-1 text-lg font-semibold text-white shadow-md">
          £{(product.priceInCents / 100).toFixed(2)}
        </span>
      </div>

      {/* Product Details Section */}
      <div className="flex-grow">
        <h2 className="mt-2 text-xl font-bold">{product.name}</h2>

        <div className="h-20 flex-grow">
          <p className="mt-1 line-clamp-3 text-gray-600">
            {product.description}
          </p>
        </div>

        {/* Artist Username Section */}
        <div className="text-content mt-2 flex items-center text-sm">
          {/* Display artist image if available */}
          {product.artist?.image && (
            <div className="relative mr-2 h-6 w-6 flex-shrink-0">
              <Image
                src={product.artist.image || "/placeholder.png"}
                alt={`${product.artist.username}'s profile`}
                layout="fill"
                objectFit="cover" // Ensures the image is cropped to fit the circle
                className="rounded-full"
              />
            </div>
          )}
          <span className="font-medium">
            {product?.artist?.username || "Unknown"}
          </span>
        </div>

        {/* Trash Icon for deletion (Inline SVG) */}
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={onDelete} // Trigger the onDelete function when clicked
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-red-600 hover:text-red-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
