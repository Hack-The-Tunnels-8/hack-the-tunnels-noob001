import { Product } from "@prisma/client";
import { prisma } from "../infrastructure/db";

export const all = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany();
  return products;
};

export const find = async (id: string): Promise<Product | null> => {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(id) },
  });

  return product;
};

export const findMany = async (ids: string[]): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: { id: { in: ids.map((id) => parseInt(id)) } },
  });

  return products;
};

export const create = async (
  title: string,
  description: string,
  price: number,
  imageUrl: string = "https://i.imgur.com/EyoQOjC.jpg"
): Promise<Product> => {
  const newProduct = await prisma.product.create({
    data: {
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
    },
  });

  return newProduct;
};

export const update = async (
  id: number,
  title?: string,
  description?: string,
  price?: number
): Promise<Product> => {
  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      title: title,
      description: description,
      price: price,
    },
  });
  return updatedProduct;
};

//cause delete is a reserved key-word
export const Delete = async (id: number): Promise<Product> => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
  return product;
};
