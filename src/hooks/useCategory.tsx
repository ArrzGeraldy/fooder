import { CategoryI } from "@/types";
import { useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState<CategoryI[]>([]);

  const fetchCategory = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );

    const json = await response.json();

    setCategories(json.data);
  };
  return { fetchCategory, categories, setCategories };
};

export default useCategory;
