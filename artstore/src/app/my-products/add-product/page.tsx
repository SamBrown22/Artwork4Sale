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
  const maxLength = 500 // Maxcharacter length used for the description
  const { data: session, status } = useSession() // Used to get session data and status
  const router = useRouter() // Used to redirect the user uasing router.push()
  const [pounds, setPounds] = useState<string>("") // Used to store the pounds value
  const [pennies, setPennies] = useState<string>("") // used to store the pennies value
  const [previewData, setPreviewData] = useState<PreviewData>({ // Used to store and initialise the preview data
    name: "Product Name",
    description: "",
    price: 0,
    imageUrl: "/placeholder.png",
  })
  const [imageFile, setImageFile] = useState<File | null>(null) // Used to store the image file

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
      [name]: value
    }))
  }

  const handlePoundFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target
    const poundsValue = value.replace(/[^0-9]/g, "") // Remove non-numeric characters
    setPounds(poundsValue) // Update pounds

    // Update preview data with total price (pounds * 100 + pennies)
    setPreviewData((prevData) => ({
      ...prevData,
      price: Number(poundsValue) * 100 + Number(pennies || 0),
    }))
  }

  const handlePennyFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target
    let penniesValue = value.replace(/[^0-9]/g, "") // Remove non-numeric characters

    if (parseInt(penniesValue) > 99) {
      penniesValue = "99" // Limit the value to 99
    }

    setPennies(penniesValue) // Update pennies

    // Update preview data with total price (pounds * 100 + pennies)
    setPreviewData((prevData) => ({
      ...prevData,
      price: Number(pounds || 0) * 100 + Number(penniesValue),
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

          <div className="mb-3">
            {/* Product Description Textarea */}
          <textarea
            required
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            maxLength={maxLength}
            onChange={handleFieldChange} // Handle input changes
            value={previewData.description}
          />
            {/* Character count */}
            <div className="text-sm text-gray-400 text-right">
              {previewData.description.length} / {maxLength} characters
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Pound Symbol */}
            <span className="text-lg font-medium">£</span>

            {/* Pound Input */}
            <input
              required
              name="price"
              placeholder="Pounds"
              type="text"
              className="input input-bordered mb-3 w-2/3"
              value={pounds}
              onChange={handlePoundFieldChange} // Handle input changes
            />

            {/* Decimal Separator */}
            <span className="text-lg font-medium">.</span>

            {/* Penny Input */}
            <input
              required
              name="price"
              placeholder="Pennies"
              type="text"
              className="input input-bordered mb-3 w-1/3"
              value={pennies}
              onChange={handlePennyFieldChange} // Handle input changes
            />
          </div>

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
              className="file-input-base-content file-input file-input-bordered mb-3 w-full cursor-pointer"
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
              artist: {
                username: session?.user?.name || "Unknown Artist", // Use the session user's name or a placeholder
                image: session?.user?.image || "/placeholder.png", // Use the session user's image or a placeholder
              },
            }}
            link={false} // Don't link to the product page
          />
        </div>
      </div>
    </div>
  )
}
