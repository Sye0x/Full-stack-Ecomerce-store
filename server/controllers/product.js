import express from "express";
import multer from "multer";
import { prisma } from "../lib/prisma.js";

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, stockQuantity, price, categoryId } = req.body;

    if (
      !name ||
      !description ||
      !stockQuantity ||
      !price ||
      !categoryId ||
      !req.file
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingProduct = await prisma.product.findFirst({
      where: { name },
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product already exists.",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stockQuantity: Number(stockQuantity),
        categoryId,
        imageUrl,
      },
    });

    return res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    if (!id) {
      return res.status(400).json({
        message: "Id is required.",
      });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Product Deleted Sucessfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
