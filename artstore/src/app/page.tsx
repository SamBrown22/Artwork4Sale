/* eslint-disable react/no-unescaped-entities */
// src/app/page.tsx
'use client';

import HeroSection from "@/components/HeroSection";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductCard from "@/components/ProductCard"; // Import the ProductCard component

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
}

interface SortOption {
  label: string;
  value: "createdAt" | "relevance" | "priceInCents"; 
  type: "asc" | "desc";
}

const sortOptions: SortOption[] = [
  { label: "Newest", value: "createdAt", type: "desc" }, // Newest first
  { label: "Price: Low to High", value: "priceInCents", type: "asc" }, // Low to high
  { label: "Price: High to Low", value: "priceInCents", type: "desc" } // High to low
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>(sortOptions[0]); // Initialize with the first sort option

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log(sortBy);
        const fetchedProducts = await getProducts(undefined, 16, 1, sortBy.value, sortBy.type); // Use sortBy properties
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [sortBy]); // Refetch products whenever sortBy changes

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="flex flex-col items-center gap-6 p-8 pb-20 sm:p-20">
        {/* Sort By Selector */}
        <div className="flex justify-end w-full mb-4"> {/* Flexbox to align right */}
          <label htmlFor="sort" className="mr-2 text-lg font-semibold">Sort By:</label>
          <select
            id="sort"
            value={sortBy.label} // Set the select value to the sort option value
            onChange={(e) => {
              const selectedOption = sortOptions.find(option => option.label === e.target.value); // Find the selected option
              if (selectedOption) {
                setSortBy(selectedOption); // Update sortBy with the selected option
              }
            }}
            className="select select-bordered px-4 border rounded" // DaisyUI select styles
          >
            {sortOptions.map((option) => (
              <option key={`${option.value}-${option.type}`} value={option.label}>
                {option.label} {/* Use the label for display */}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Artworks */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-lg">Loading products...</p>
          ) : error ? (
            <p className="text-red-500 text-lg">{error}</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="btn btn-primary" // DaisyUI button styles
            href="/shop"
          >
            Shop All Artworks
          </a>
        </div>
      </main>
    </div>
  );
}
