// src/app/my-products/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/services/productService";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/ProductCard"; // Import ProductCard
import { Product } from "@/types/Product";

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchProducts() {
      if (session?.user?.id) {
        const userProducts = await getProducts(session.user.id, 16, 1, "createdAt", "asc");
        setProducts(userProducts);
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} link={true}/> // Use ProductCard component
          ))
        ) : (
          <p>No products added yet.</p>
        )}
      </div>
    </div>
  );
}
