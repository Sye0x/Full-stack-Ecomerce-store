import express from "express";
import { prisma } from "../lib/prisma.js";

export const getCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists.",
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return res.status(201).json({
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
