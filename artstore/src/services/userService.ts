// src/app/api/users/addUser.ts
"use server"

import { prisma } from "@/utils/db/prisma"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"

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
    },
  })

  redirect("/")
}
