import express from "express";
import multer from "multer";
import { prisma } from "../lib/prisma.js";

export const getProducts = async (req, res) => {
  const { categoryId, searchTerm, role } = req.query;
  console.log(searchTerm, role, categoryId);
  try {
    let products = [];

    products = await prisma.product.findMany({
      where: {
        ...(role === "CUSTOMER" && {
          status: { in: ["ACTIVE", "OUT_OF_STOCK"] },
        }),
        ...(searchTerm && { name: { contains: searchTerm } }),
        ...(categoryId && { categoryId: categoryId }),
      },
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

    let status = "ACTIVE";
    if (stockQuantity == 0) {
      status = "OUT_OF_STOCK";
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
        status,
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

export const editProduct = async (req, res) => {
  try {
    const { id, name, description, stockQuantity, price, categoryId, status } =
      req.body;

    if (
      !id ||
      !name ||
      !description ||
      !stockQuantity ||
      !price ||
      !categoryId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    let setStatus = Number(stockQuantity) === 0 ? "OUT_OF_STOCK" : status;
    setStatus = status === "INACTIVE" ? status : setStatus;
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : existingProduct.imageUrl;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        stockQuantity: Number(stockQuantity),
        categoryId,
        imageUrl,
        status: setStatus,
      },
    });

    return res.status(200).json({
      message: "Product updated successfully.",
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
  try {
    if (!id) {
      return res.status(400).json({
        message: "Id is required.",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(200).json({
        message: "Product does not exists.",
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
