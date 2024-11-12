/* eslint-disable react/no-unescaped-entities */
// src/app/page.tsx
"use client"

import HeroSection from "@/components/HeroSection"
import { useEffect, useState } from "react"
import { getProducts } from "@/services/productService"
import ProductCard from "@/components/ProductCard" // Import the ProductCard component
import { Product } from "@/types/Product"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getProducts(
          undefined,
          3,
          1,
          "createdAt",
          "desc",
        ) // Use sortBy properties
        setProducts(fetchedProducts)
      } catch (err) {
        setError("Failed to fetch products")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, []) // Refetch products whenever sortBy changes

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="flex flex-col items-center gap-6 p-8 pb-20 sm:p-20">
        {/* Featured Artworks */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-lg">Loading products...</p>
          ) : error ? (
            <p className="text-lg text-red-500">{error}</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} link={true} />
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="btn btn-primary text-white" // DaisyUI button styles
            href="/shop"
          >
            Shop All Artworks
          </a>
        </div>
      </main>
    </div>
  )
}
