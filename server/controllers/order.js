import express from "express";
import { prisma } from "../lib/prisma.js";

export const setStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    if (status === "DELIVERED") {
      await prisma.order.update({
        where: { id },
        data: { paymentStatus: "PAID" },
      });
    } else if (status === "CANCELLED") {
      await prisma.order.update({
        where: { id },
        data: { paymentStatus: "FAILED" },
      });
    } else {
      await prisma.order.update({
        where: { id },
        data: { paymentStatus: "PENDING" },
      });
    }

    res.status(200).json({
      message: "Updated status",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getUserOrder = async (req, res) => {
  const { userId } = req.query;

  console.log(req.query);
  try {
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found",
        orders: [],
      });
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const createOrder = async (req, res) => {
  const {
    userId,
    subtotal,
    discount,
    shippingFee,
    totalAmount,
    shippingAddress,
  } = req.body.data;

  console.log(
    userId,
    subtotal,
    discount,
    shippingFee,
    shippingAddress,
    totalAmount,
    shippingAddress,
  );

  try {
    if (
      !userId ||
      subtotal === undefined ||
      discount === undefined ||
      shippingFee === undefined ||
      totalAmount === undefined ||
      !shippingAddress
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const newOrder = await prisma.order.create({
      data: {
        userId,
        subtotal,
        discount,
        shippingFee,
        totalAmount,
        shippingAddress,
      },
    });

    for (const item of cart.items) {
      await prisma.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price,
        },
      });
    }

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: newOrder.id },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return res.status(201).json({
      orderItems,
      message: "Order created successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message || "Server Error",
    });
  }
};
