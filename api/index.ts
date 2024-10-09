import { TProducts } from "@/hooks/useProducts";
import axios from "axios";

const BASE_URL = "https://bankapiexpress.onrender.com/product";

export const getAllProducts = async () => {
  const result = await axios.get(BASE_URL);
  return result.data.products;
};

export const createProduct = async (product: TProducts) => {
  const result = await axios.post(BASE_URL, product);
  return result.data;
};

export const updateProduct = async (product: TProducts) => {
  console.log(product);
  const result = await axios.put(BASE_URL, product);
  return result.data;
};

export const deleteProduct = async (id: string) => {
  const result = await axios.delete(`${BASE_URL}/${id}`);
  return result.data;
};
