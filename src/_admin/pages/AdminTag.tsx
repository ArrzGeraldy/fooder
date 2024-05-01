/* eslint-disable react-hooks/exhaustive-deps */
import { TagI } from "@/types";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "react-hot-toast";
import useCategory from "@/hooks/useCategory";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";
import DeleteButton from "@/components/admin/DeleteButton";
import EditTag from "@/components/admin/tag/EditTag";
import { toastError, toastSuccess } from "@/lib/toaster";

const AdminTag = () => {
  const [tags, setTags] = useState<TagI[]>([]);
  const { fetchCategory, categories } = useCategory();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const fetchTags = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tags`);

    const json = await response.json();

    setTags(json.data);
  };

  const submit = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${auth?.accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    const json = await res.json();

    if (!res.ok) {
      toastError(json.error.message);
    } else {
      toastSuccess("Success create tag");
      fetchTags();
    }

    setFormData({
      name: "",
      category: "",
    });
  };

  useEffect(() => {
    fetchTags();
    fetchCategory();
  }, []);

  return (
    <div className="w-full">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-4">Tags</h1>
      <AlertDialog>
        <AlertDialogTrigger className="bg-black text-white p-2 rounded-md text-sm">
          + Add new tag
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Tag</AlertDialogTitle>
            <input
              type="text"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="name..."
              className="border-gray-500 border px-2 py-1.5 rounded-md"
            />
            <Select
              onValueChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e }))
              }
            >
              <SelectTrigger className="w-full border border-gray-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category, i) => (
                    <SelectItem key={i} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setFormData({ name: "", category: "" })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={submit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="bg-white border w-[90%]  border-gray-300 drop-shadow-md rounded-lg px-4 py-2 mt-4">
        <div className="flex justify-between font-semibold py-2 border-b border-gray-400 mb-4">
          <div className="flex gap-4">
            <span>No</span>
            <span className="col-span-2">Name</span>
          </div>
          <span>Action</span>
        </div>
        {tags &&
          tags.map((tag, i) => (
            <div key={i} className="flex justify-between mt-2">
              <div className="flex gap-6 justify-center">
                <span className="font-semibold">{i + 1}</span>
                <span className="col-span-2">{tag.name}</span>
              </div>
              <div className="flex gap-2 items-start text-white">
                <EditTag
                  categories={categories}
                  fetchTags={fetchTags}
                  formData={formData}
                  setFormData={setFormData}
                  tag={tag}
                  token={auth?.accessToken}
                />
                <DeleteButton
                  endPoint="tags"
                  fetchData={fetchTags}
                  id={tag._id}
                  token={auth?.accessToken}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminTag;
