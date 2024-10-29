"use server"

import { prisma } from "@/utils/db/prisma"
import { redirect } from "next/navigation"

export async function addProduct(formData: FormData) {
  const name = formData.get("name")?.toString()
  const description = formData.get("description")?.toString()
  const imageUrl = formData.get("imageUrl")?.toString()
  const price = Number(formData.get("price") || 0)

  if (!name || !description || !imageUrl || !price) {
    throw Error("Please fill out all fields.")
  }

  await prisma.product.create({
    data: {
      name: name,
      description: description,
      imageUrl: imageUrl,
      price: price,
    },
  })

  redirect("/")
}
