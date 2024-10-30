import { addProduct } from "@/services/productService"

export const metadata = {
  title: "Add Product | Artwork4Sale",
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
        />
        <button className="btn btn-primary btn-block text-white" type="submit">
          Add Product
        </button>
      </form>
    </div>
  )
}
