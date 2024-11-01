"use client";
import { addProduct } from "@/services/productService";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import { DefaultSession } from "next-auth";
import { ImageInput } from "@/types/ImageInput";
import { useRouter } from "next/navigation";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>; // Loading state
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log("submitting ... ");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userId = session?.user?.id;

    console.log("User ID:", userId); // Log user ID

    if (userId) {
      try {
        // Get image file from form data
        const file = formData.get("image") as File;
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = Number(formData.get("price") || 0);

        if (file) {
          console.log("file found ... ");
          const reader = new FileReader();

          // Read the file as a data URL
          reader.onload = async (event) => {
            if (event.target && typeof event.target.result === "string") {
              console.log("file read ... ");
              const base64String = event.target.result;

              // Create an object with the file data
              const imageData: ImageInput = {
                name: file.name,
                type: file.type,
                buffer: base64String.split(",")[1],
              };

              await addProduct({ name, description, price, imageData, userId });
              router.push("/my-products");
            }
          };

          reader.readAsDataURL(file); // Ensure you call this to read the file
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      console.error("User ID is not available.");
    }
  };

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form onSubmit={handleSubmit} method="POST">
        {/* Product Name Input */}
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        {/* Product Description Textarea */}
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        {/* Price Input */}
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        {/* Upload Image File Input */}
        <div className="mb-3 w-full">
          <label className="mb-1 block text-sm font-medium" htmlFor="image">
            Upload Image
          </label>
          <div className="relative">
            <input
              required
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={(event) => {
                const fileName = event.target.files
                  ? event.target.files[0]?.name || "Choose a file"
                  : "Choose a file";
                const fileNameElement = document.getElementById("file-name");
                if (fileNameElement) {
                  fileNameElement.innerText = fileName;
                }
              }}
            />
            <button
              type="button"
              className="hover:bg-primary-focus input input-bordered mb-3 flex w-full items-center justify-between rounded-md bg-primary px-4 py-2 text-left text-white"
            >
              <span id="file-name">Choose a file</span>
              <span className="material-icons">upload</span>
            </button>
          </div>
        </div>
        {/* Submit Button */}
        <button className="btn btn-primary btn-block text-white" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
