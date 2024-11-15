// /app/myCart/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Product } from "@/types/Product"
import { getCartByUserId, deleteProductFromCart, buyCart } from "@/services/cartService" // Ensure buyCart service function exists
import CartProductCard from "@/components/CartProductCard"
import { toast } from "react-toastify"

export default function MyCartPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [cartProducts, setCartProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "authenticated") {
      async function fetchCart() {
        try {
          if (session) {
            const cart = await getCartByUserId(session.user.id)
            if (cart) {
              setCartProducts(cart.products)
            } else {
              setError("No cart found.")
            }
          }
        } catch (err) {
          setError("Failed to load cart.")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }

      fetchCart()
    } else if (status === "unauthenticated") {
      router.push("/login") // Redirect unauthenticated users
    }
  }, [session, status, router])

  async function deleteProduct(product: Product) {
    if (session) {
      deleteProductFromCart(product.id, session.user.id)
      setCartProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== product.id),
      )
    }
  }

  async function handleBuyCart() {
    if (session) {
      try {
        await buyCart(session.user.id)
        toast.success("Purchase successful!")
        setCartProducts([]); // Clear the cart after purchase
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message)
        } else {
          toast.error("An unknown error occurred.")
        }
      }
    }
  }

  function calculateTotal() {
    return cartProducts.reduce((total, product) => total + product.priceInCents/100, 0)
  }

  if (loading) return <p className="text-center text-lg">Loading...</p>
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-4 text-3xl font-bold">My Cart</h1>
      {cartProducts.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cartProducts.map((product) => (
            <CartProductCard
              key={product.id}
              product={product}
              onDelete={() => deleteProduct(product)}
            />
          ))}
          <div className="mt-4 text-lg font-semibold">Total: ${calculateTotal()}</div>
          <button
            onClick={handleBuyCart}
            className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Buy Cart
          </button>
        </div>
      )}
    </div>
  )
}
