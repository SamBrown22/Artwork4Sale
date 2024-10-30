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
export async function loginUser(formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
  
    // Perform validation
    if (!email || !password) {
      return { error: "Please fill out all fields." }; // Return error message
    }
  
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  
    if (!user) {
        const error = {
            type:'userError',
            message: "User not found."
        }
      return {error}; // Return error message
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
        const error = {
            type:'passwordError',
            message: "Invalid Password."
        }
      return {error}; // Return error message
    }
  
    console.log("Logged in as", user.username);
    redirect("/"); // Perform redirect on successful login
  }
  