// src/components/ProductCard.tsx

import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="max-w-xs flex flex-col p-4 border rounded-lg shadow-lg m-2 transition-transform duration-200 transform hover:scale-105 overflow-hidden"
    >
      <div className="relative h-48 w-full mb-4">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg transition-transform duration-300 transform hover:scale-110"
        />
        <span className="absolute bottom-2 right-2 bg-gradient-to-r from-primary to-blue-600 text-white text-lg font-semibold py-1 px-3 rounded-lg shadow-md">
          £{product.priceInCents/100}
        </span>
      </div>
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <div className="flex-grow">
        <p className="text-gray-700 mt-1 line-clamp-4 h-20 overflow-hidden"> {/* Adjust height as needed */}
          {product.description}
        </p>
      </div>
    </div>
  );
}
