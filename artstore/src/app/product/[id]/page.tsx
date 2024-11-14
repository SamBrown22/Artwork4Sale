"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getProduct } from "@/services/productService" // Assume you have a function to fetch a product
import { Product } from "@/types/Product"
import { use } from "react"
import { addProductToCart, isProductInCart } from "@/services/cartService"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

interface ProductPageProps {
  params: Promise<{ id: string }> // params is now a Promise
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params) // Use React.use() to unwrap the params
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession() // Use the useSession hook
  const [inCart, setInCart] = useState<boolean>(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (session) {
          const fetchedProduct = await getProduct(id) // Fetch product by ID
          setProduct(fetchedProduct)
          const inCart = await isProductInCart(id, session?.user.id)
          setInCart(inCart)
        }
      } catch (err) {
        setError("Failed to fetch product")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, session])

  function addToCart() {
    // Checks if the product and session exist
    if (product && session && product.artist) {
      
      // Checks if the user is not the artist
      if (session.user.name !== product.artist.username) {

        // Adds the product to the cart
        const res = addProductToCart(product.id, session.user.id)
        setInCart(true)
        console.log(res)
      } else {
        toast.error("You cannot add your own product to the cart", {
          className: "bg-primary",
          autoClose: 5000,
        })
      }
    } else {
      console.error("Product not found")
    }
  }

  if (loading) return <p className="text-center text-lg">Loading...</p>
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>

  if (!product) return <p className="text-center text-lg">Product not found</p>

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative h-96 w-full md:h-[500px]">
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
            <h1 className="text-3xl font-bold text-base-content">
              {product.name}
            </h1>
            <p className="mt-2 text-xl text-gray-500">
              £{(product.priceInCents / 100).toFixed(2)}
            </p>
            <div className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              className={`w-full rounded-lg py-2 font-semibold text-white transition duration-200 ${
                inCart
                  ? "cursor-not-allowed bg-primary-content opacity-50" // Disabled state
                  : "hover:bg-primary-dark bg-primary"
              }`}
              onClick={addToCart}
              disabled={inCart} // Ensure the button is actually disabled
            >
              {inCart ? "Already in Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Artist Info Section */}
      <div className="mt-8 flex items-center space-x-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image
            src={product?.artist?.image || "/placeholder.png"}
            alt={"Artists Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-2 border-white shadow-md"
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-base-content">
            {product?.artist?.username || "Unknown Artist"}
          </p>
          <p className="text-sm text-gray-500">Artist</p>
        </div>
      </div>
    </div>
  )
}
