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
      price: price,
      user: { connect: { id: userId }}
    },
  })

  redirect("/")
}

export async function getProducts(userId: string) {
  const products = await prisma.product.findMany({
    where: { userId: userId },
  })

  return products

}