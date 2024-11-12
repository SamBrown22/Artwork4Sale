"use client"

import { useEffect, useState } from "react"
import { getProducts, getAmountOfProducts } from "@/services/productService"
import ProductCard from "@/components/ProductCard" // Import the ProductCard component
import { Product } from "@/types/Product"

interface SortOption {
  label: string
  value: "createdAt" | "relevance" | "priceInCents"
  type: "asc" | "desc"
}

const sortOptions: SortOption[] = [
  { label: "Newest", value: "createdAt", type: "desc" },
  { label: "Price: Low to High", value: "priceInCents", type: "asc" },
  { label: "Price: High to Low", value: "priceInCents", type: "desc" },
]

export default function Shop() {
  const productsPerPage = 16
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>(sortOptions[0])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1) // Add state for totalPages

  useEffect(() => {
    async function fetchTotalPages() {
      try {
        const totalProducts = await getAmountOfProducts()
        const pages = Math.ceil(totalProducts / productsPerPage) // Calculate total pages
        setTotalPages(pages)
      } catch (err) {
        setError("Failed to fetch total products")
        console.error(err)
      }
    }

    fetchTotalPages()
  }, []) // Fetch total pages on component mount

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true) // Reset loading state on new fetch
        const fetchedProducts = await getProducts(
          undefined,
          16,
          currentPage,
          sortBy.value,
          sortBy.type,
        )
        setProducts(fetchedProducts)
      } catch (err) {
        setError("Failed to fetch products")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [sortBy, currentPage]) // Refetch when sortBy or page changes

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex flex-col items-center gap-6 p-8 pb-20 sm:p-20">
        {/* Page Title */}
        <h1 className="mb-6 text-3xl font-bold">Shop Our Collection</h1>

        {/* Sort By Selector */}
        <div className="mb-4 flex w-full items-center justify-end gap-2">
          <label htmlFor="sort" className="text-lg font-semibold">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy.label}
            onChange={(e) => {
              const selectedOption = sortOptions.find(
                (option) => option.label === e.target.value,
              )
              if (selectedOption) {
                setSortBy(selectedOption)
              }
            }}
            className="select select-bordered h-10 appearance-none rounded border pe-10"
          >
            {sortOptions.map((option) => (
              <option
                key={`${option.value}-${option.type}`}
                value={option.label}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Artworks */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} link />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Page Selector */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded border bg-primary px-4 py-2 hover:bg-primary-content disabled:cursor-not-allowed disabled:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded border bg-primary px-4 py-2 hover:bg-primary-content disabled:cursor-not-allowed disabled:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  )
}
