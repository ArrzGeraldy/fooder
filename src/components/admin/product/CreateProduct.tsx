/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategory from "@/hooks/useCategory";
import { TagI } from "@/types";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import TagInput from "./TagInput";
import InputProduct from "./InputProduct";

import toast, { Toaster } from "react-hot-toast";
import { toastError, toastLoading, toastSuccess } from "@/lib/toaster";

export interface FormDataI {
  name: string;
  price: string;
  category: string;
  tags: string[];
  description: string;
  image: File | string;
}

const CreateProduct = () => {
  const { fetchCategory, categories } = useCategory();
  const [tags, setTags] = useState<TagI[]>();
  const { auth } = useAuth();
  const [formData, setFormData] = useState<FormDataI>({
    name: "",
    price: "",
    category: "",
    tags: [],
    description: "",
    image: "",
  });

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    toastLoading();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    formData.tags.forEach((tag) => data.append("tags[]", tag));
    data.append("description", formData.description);
    data.append("image", formData.image);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${auth?.accessToken}`,
      },
      body: data,
    });

    if (res.ok) {
      toastSuccess("Success create product");
    } else {
      const json = await res.json();
      toastError(json.error.message);
    }
    toast.dismiss("loader");

    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      tags: [],
    });
  };

  const handleGetTag = async (category: string) => {
    setFormData((prev) => ({ ...prev, tags: [] }));

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/tags?category=${category}`
    );

    const json = await response.json();

    setTags(json.data);
  };

  useEffect(() => {
    formData.category === "" && setTags(undefined);
  }, [formData.category]);

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="w-full">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
      <form className="grid grid-cols-1 gap-8 lg:grid-cols-2" onSubmit={submit}>
        <div className="flex flex-col gap-4">
          <InputProduct
            value={formData.name}
            label="Name"
            placeholder="name"
            setFormData={setFormData}
            type="text"
          />

          <InputProduct
            value={formData.price}
            label="Price"
            placeholder="price"
            setFormData={setFormData}
            type="number"
          />

          <div>
            <label className="mb-1 block">Category</label>
            <Select
              value={formData.category}
              onValueChange={(e) => {
                handleGetTag(e);
                setFormData((prev) => ({ ...prev, category: e }));
              }}
            >
              <SelectTrigger className="w-full border border-gray-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category, i) => (
                    <SelectItem key={i} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="border border-gray-500 rounded-md h-44 px-2 py-2"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TagInput formData={formData} setFormData={setFormData} tags={tags} />

          <div className="flex flex-col gap-1">
            <label>Image</label>
            <input
              type="file"
              className="cursor-pointer"
              onChange={({ target: { files } }) => {
                if (files && files[0]) {
                  console.log(files[0]);
                  if (files[0].size > 1000000) {
                    setFormData((prev) => ({ ...prev, image: "" }));
                  } else {
                    setFormData((prev) => ({ ...prev, image: files[0] }));
                  }
                }
              }}
            />
          </div>
        </div>

        <Button className="w-fit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateProduct;
