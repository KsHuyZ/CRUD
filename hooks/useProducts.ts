import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "@/api";
import { useEffect, useState } from "react";

export type TProducts = {
  _id?: string;
  name: string;
  price: number;
  type: string;
};

export const useProducts = () => {
  const [products, setProducts] = useState<TProducts[]>([]);
  const handleGetAllProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
  };
  useEffect(() => {
    handleGetAllProducts();
  }, []);
  const deleteProductById = async (id: string) => {
    await deleteProduct(id);
    await handleGetAllProducts();
  };

  const addProduct = async (product: TProducts) => {
    await createProduct(product);
    await handleGetAllProducts();
  };
  const updateProductById = async (product: TProducts) => {
    await updateProduct(product);
    await handleGetAllProducts();
  };

  return { products, deleteProductById, addProduct, updateProductById };
};
