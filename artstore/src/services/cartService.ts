"use server"

import { prisma } from "@/utils/db/prisma"

export async function addProductToCart(productId: string, userId: string) {
  // Check if the cart exists for the given user
  let cart = await prisma.cart.findUnique({
    where: { userId: userId },
    include: { products: true },
  })

  if (!cart) {
    // If the cart does not exist, create a new one for the user
    cart = await prisma.cart.create({
      data: {
        userId: userId,
        products: {
          connect: { id: productId }, // Connect the product to the new cart
        },
      },
      include: { products: true },
    })
    console.log("New cart created with the product.")
  } else {
    // If the cart exists, check if the product is already in the cart
    const isProductInCart = cart.products.some(
      (product) => product.id === productId,
    )

    if (!isProductInCart) {
      // Add the product to the cart
      await prisma.cart.update({
        where: { userId: userId },
        data: {
          products: {
            connect: { id: productId }, // Connect the product to the existing cart
          },
        },
      })
      console.log("Product added to the existing cart.")
    } else {
      console.log("Product is already in the cart.")
    }
  }

  return cart
}

export async function getCartByUserId(userId: string) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      products: {
        include: {
          artist: {
            select: {
              username: true,
              image: true,
            },
          },
        },
      },
    },
  })
}

export async function deleteProductFromCart(productId: string, userId: string) {
  return prisma.cart.update({
    where: { userId },
    data: {
      products: {
        disconnect: { id: productId }, // Disconnect the product from the cart
      },
    },
  })
}

export async function isProductInCart(productId: string, userId: string) {
  try {
    const productInCart = await prisma.cart.findFirst({
      where: {
        userId,
        products: {
          some: {
            id: productId,
          },
        },
      },
    })

    // Returns true if a cart with the product exists
    return !!productInCart
  } catch (error) {
    console.error("Error checking product in cart:", error)
    throw new Error("Failed to check product in cart")
  }
}

export async function buyCart(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { products: true },
    })
    if (cart) {
      //Checks if all products are not sold
      for (const product of cart.products) {
        if (product.sold) {
          throw new Error("Product: " + product.name + ", is already sold")
        }
      }

      // Update the sold status of the products
      for (const product of cart.products) {
        await prisma.product.update({
          where: { id: product.id },
          data: { 
            sold: true, 
            soldAt: new Date()
          },
        })
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error(String(error))
    }
  }
}
