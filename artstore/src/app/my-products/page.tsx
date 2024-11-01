"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/services/productService";
import { useSession } from "next-auth/react";

export default function MyProductsPage() {
  const [products, setProducts] = useState<Array<{
    id: string;
    description: string;
    imageUrl: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }>>([]);

  const { data: session, status } = useSession();
  console.log("Session Status:", status);
  console.log("Session Data:", session);

  useEffect(() => {
    async function fetchProducts() {
      if (session?.user?.id) {
        console.log("User ID found in session:", session.user.id);
        const userProducts = await getProducts(session.user.id);
        setProducts(userProducts);
      } else {
        console.log("No user ID in session, cannot fetch products.");
      }
    }

    fetchProducts();
  }, [session]);

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">My Products</h1>
      <Link href="/my-products/add-product">
        <button className="btn btn-primary mb-4 text-white">Add New Product</button>
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                width={500}
                height={500}
                className="mb-2 h-48 w-full object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-lg font-semibold">${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products added yet.</p>
        )}
      </div>
    </div>
  );
}
