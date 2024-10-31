/* eslint-disable @typescript-eslint/no-unused-vars */
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

// services/userService.js
export async function getUser({email, password}: {email: string, password: string}) {  

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  
    if (!user) {
        throw new Error("Invalid username or password");
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
        throw new Error("Invalid username or password");
    }
  
    console.log("Logged in as", user.username);
    return user // Return user object
  }
  