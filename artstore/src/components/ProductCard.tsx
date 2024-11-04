// src/components/ProductCard.tsx

import Image from "next/image"

type Product = {
  id: string
  name: string
  description: string
  imageUrl: string
  priceInCents: number
}

interface ProductCardProps {
  product: Product
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
      <div className="flex-grow">
        <p className="mt-1 line-clamp-4 h-20 overflow-hidden text-gray-700">
          {" "}
          {/* Adjust height as needed */}
          {product.description}
        </p>
      </div>
    </div>
  )
}
