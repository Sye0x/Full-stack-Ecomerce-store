import express from "express";
import { prisma } from "../lib/prisma.js";

export const getItem = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await prisma.cart.findFirst({
      where: { userId: userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: {
        product: true,
      },
    });

    return res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addItem = async (req, res) => {
  const { userId, productId, price } = req.body;

  try {
    if (!userId || !productId || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
          unitPrice: price,
        },
      });
    }

    return res.status(200).json({
      message: "Item added to cart",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const removeItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    if (!userId || !productId) {
      return res.status(400).json({
        message: "User ID and Product ID are required.",
      });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found.",
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!existingItem) {
      return res.status(404).json({
        message: "Item not found in cart.",
      });
    }

    if (existingItem.quantity > 1) {
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
    } else {
      await prisma.cartItem.delete({
        where: {
          id: existingItem.id,
        },
      });
    }

    return res.status(200).json({
      message: "Item removed from cart.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
