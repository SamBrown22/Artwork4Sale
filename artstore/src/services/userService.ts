/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/api/users/addUser.ts
"use server"

import { prisma } from "@/utils/db/prisma"
import S3Service from "@/services/s3Service"
import { ImageInput } from "@/types/ImageInput"
import bcrypt from "bcrypt"

const s3Service = new S3Service()
const defaultProfileImage = "https://artwork4sale.s3.eu-west-2.amazonaws.com/user_profiles/placeholder.png"

export async function addUser(formData: FormData) {
  const username = formData.get("username")?.toString()
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()

  // Perform validation
  if (!username || !email || !password) {
    throw new Error("Please fill out all fields.")
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      image: defaultProfileImage
    },
  })
}

export async function getUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) {
    throw new Error("Invalid username or password")
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error("Invalid username or password")
  }

  console.log("Logged in as", user.username)
  return user // Return user object
}

export async function addImageToProfile(email: string, file: ImageInput) {
  // Validate the input
  if (!email || !file) {
    throw new Error("Email and file are required");
  }

  // Fetch the user's current profile
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: { image: true }, // Select only the image field
  });

  // If a current image exists, delete it from S3
  if (user?.image && user.image !== defaultProfileImage) {
    try {
      await s3Service.deleteImage(user.image); // Call deleteImage with the current image URL
    } catch (error) {
      console.error("Error deleting old image:", error);
      throw new Error("Error deleting old image");
    }
  }

  // Upload the new image
  const imageUrl = await s3Service.uploadImage(file); // Pass the file object directly

  // Update the user's profile in the database with the new image URL
  const updatedUser = await prisma.user.update({
    where: { email: email },
    data: { image: imageUrl }, // Adjust this field name based on your user model
  });

  return updatedUser;
}

export async function getImageFromProfile(email: string): Promise<string> {
  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user || !user.image) {
    throw new Error("User not found or no image available");
  }

  // Retrieve the image from S3 using the URL stored in the user's profile
  const imageBuffer = await s3Service.retrieveImage(user.image); // Pass the image URL
  return imageBuffer; // Return the image Base64 string
}


