"use server"

import { prisma } from "@/utils/db/prisma"
import { redirect } from "next/navigation"
import S3Service from "@/services/s3Service"
import { ImageInput } from "@/types/ImageInput"

const s3Service = new S3Service()
type SortOrder = 'createdAt' | 'relevance' | 'priceInCents';  // Add any other fields you'd like to sort by


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

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { artist: {
      select: {
        username: true,
        image: true
      }} }
  });

  return product;
}

export async function getProducts(
  artistId: string | undefined,  // Make artistId optional
  batchSize: number,
  page: number,
  sortBy: SortOrder = 'createdAt', // Default to createdAt
  sortOrder: 'asc' | 'desc'  // Ascending or descending
) {
  const products = await prisma.product.findMany({
    where: artistId ? { artistId } : undefined,  // Apply artistId filter only if artistId is defined
    orderBy: { [sortBy]: sortOrder },  // Dynamically set orderBy field
    take: batchSize,
    skip: batchSize * (page - 1),
    include: { artist: {
      select: {
        username: true,
        image: true
      }} }
  });

  return products;
}

export async function getAmountOfProducts(): Promise<number> {
  console.log(prisma.product.count())
  return prisma.product.count();
}

