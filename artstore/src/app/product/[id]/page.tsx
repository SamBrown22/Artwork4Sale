'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import { getProduct } from "@/services/productService"; // Assume you have a function to fetch a product
import { Product } from "@/types/Product";

// You need to use React.use() to unwrap params in Next.js 15's app directory
import { use } from "react";

interface ProductPageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params); // Use React.use() to unwrap the params

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct = await getProduct(id); // Fetch product by ID
        setProduct(fetchedProduct);
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  if (!product) return <p className="text-center text-lg">Product not found</p>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-96 md:h-[500px]">
          <Image
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-base-content">{product.name}</h1>
            <p className="mt-2 text-xl text-gray-500">
              £{(product.priceInCents / 100).toFixed(2)}
            </p>
            <div className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-dark transition duration-200"
              onClick={() => console.log("Added to cart")} // Add your add-to-cart logic here
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Artist Info Section */}
      <div className="mt-8 flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={product?.artist?.image || "/placeholder.png"}
            alt={'Artists Image'}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-2 border-white shadow-md"
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-base-content">{product?.artist?.username || 'Unknown Artist'}</p>
          <p className="text-sm text-gray-500">Artist</p>
        </div>
      </div>
    </div>
  );
}
