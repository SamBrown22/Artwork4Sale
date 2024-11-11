"use server"

import { prisma } from "@/utils/db/prisma"
import { redirect } from "next/navigation"
import S3Service from "@/services/s3Service"
import { ImageInput } from "@/types/ImageInput"

const s3Service = new S3Service()

export async function addProduct({name, description, price, imageData, userId}: 
{name: string, description: string, price: number, imageData: ImageInput, userId: string}) {

  if (!name || !description || !imageData || !price) {
    throw Error("Please fill out all fields.")
  }

  const imageUrl = await s3Service.uploadImage(imageData, "uploads");

  await prisma.product.create({
    data: {
      name: name,
      description: description,
      imageUrl: imageUrl,
      priceInCents: price,
      artist: { connect: { id: userId }}
    },
  })

  redirect("/")
}

type SortOrder = 'createdAt' | 'relevance' | 'priceInCents';  // Add any other fields you'd like to sort by

export async function getProducts(
  userId: string | undefined,  // Make userId optional
  batchSize: number,
  page: number,
  sortBy: SortOrder = 'createdAt', // Default to createdAt
  sortOrder: 'asc' | 'desc'  // Ascending or descending
) {
  const products = await prisma.product.findMany({
    where: userId ? { userId } : undefined,  // Apply userId filter only if userId is defined
    orderBy: { [sortBy]: sortOrder },  // Dynamically set orderBy field
    take: batchSize,
    skip: batchSize * (page - 1),
  });

  return products;
}
