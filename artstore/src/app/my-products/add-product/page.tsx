"use client"
import { addProduct } from "@/services/productService"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { DefaultSession } from "next-auth"
import { ImageInput } from "@/types/ImageInput"
import { useRouter } from "next/navigation"
import ProductCard from "@/components/ProductCard" // Import your ProductCard component

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

interface PreviewData {
  name: string
  description: string
  price: number
  imageUrl: string // Ensure this is always a string
}

export default function AddProductPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [previewData, setPreviewData] = useState<PreviewData>({
    name: "Product Name",
    description: "Product Description",
    price: 0,
    imageUrl: "/placeholder.png", // Placeholder image initially
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  if (status === "loading") {
    return <div>Loading...</div>
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the default form submission

    const userId = session?.user?.id

    if (userId) {
      try {
        if (imageFile) {
          const reader = new FileReader()

          reader.onload = async (event) => {
            if (event.target && typeof event.target.result === "string") {
              const base64String = event.target.result

              const imageData: ImageInput = {
                name: imageFile.name,
                type: imageFile.type,
                buffer: base64String.split(",")[1],
              }

              const { name, description, price } = previewData

              await addProduct({ name, description, price, imageData, userId })
              router.push("/my-products")
            }
          }

          reader.readAsDataURL(imageFile)
        }
      } catch (error) {
        console.error("Error adding product:", error)
      }
    } else {
      console.error("User ID is not available.")
    }
  }

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setPreviewData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? Number(value) : value, // Convert price to a number
    }))
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setImageFile(file) // Store the selected file
      const reader = new FileReader()

      reader.onloadend = () => {
        setPreviewData((prevData) => ({
          ...prevData,
          imageUrl: reader.result as string, // Update the preview image
        }))
      }
      reader.readAsDataURL(file) // Read the file as a Data URL
    } else {
      // Reset the image if no file is selected
      setImageFile(null)
      setPreviewData((prevData) => ({
        ...prevData,
        imageUrl: "/placeholder.png", // Use placeholder if no image is uploaded
      }))
    }
  }

  return (
    <div className="flex flex-col p-4 md:flex-row md:space-x-4">
      <div className="md:w-1/2">
        <h1 className="mb-3 text-lg font-bold">Add Product</h1>
        <form onSubmit={handleSubmit} method="POST">
          {/* Product Name Input */}
          <input
            required
            name="name"
            placeholder="Name"
            className="input input-bordered mb-3 w-full"
            onChange={handleFieldChange} // Handle input changes
          />
          {/* Product Description Textarea */}
          <textarea
            required
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered mb-3 w-full"
            onChange={handleFieldChange} // Handle input changes
          />
          {/* Price Input */}
          <input
            required
            name="price"
            placeholder="Price"
            type="number"
            className="input input-bordered mb-3 w-full"
            onChange={handleFieldChange} // Handle input changes
          />
          {/* Upload Image File Input */}
          <div className="mb-3 w-full">
            <label className="mb-1 block text-sm font-medium" htmlFor="image">
              Upload Image
            </label>
            <input
              required
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered mb-3 w-full cursor-pointer"
              onChange={handleImageChange} // Handle image changes
            />
          </div>
          {/* Submit Button */}
          <button
            className="btn btn-primary btn-block text-white"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
      {/* Product Preview */}
      <div className="flex justify-center md:w-1/2">
        <div className="w-full max-w-xs">
          <h2 className="mb-2 text-center text-lg font-bold">Preview</h2>
          <ProductCard
            product={{
              id: "preview",
              name: previewData.name,
              description: previewData.description,
              imageUrl: previewData.imageUrl, // Use the preview image
              priceInCents: previewData.price, // Format price to 2 decimal places for display
            }}
          />
        </div>
      </div>
    </div>
  )
}
