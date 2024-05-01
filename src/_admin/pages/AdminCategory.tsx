/* eslint-disable react-hooks/exhaustive-deps */
import DeleteButton from "@/components/admin/DeleteButton";
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
import { Badge } from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";
import useCategory from "@/hooks/useCategory";
import { toastError, toastSuccess } from "@/lib/toaster";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

const AdminCategory = () => {
  const refCategory = useRef<HTMLInputElement | null>(null);
  const { auth } = useAuth();
  const [categoryName, setCategoryName] = useState<string>("");
  const { categories, fetchCategory } = useCategory();

  const handleEdit = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
        body: JSON.stringify({ name: categoryName }),
      }
    );

    if (res.ok) {
      toastSuccess("Success edit category");
      fetchCategory();
    }
  };

  const handleSave = async () => {
    if (refCategory.current) {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/categories`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${auth?.accessToken}`,
          },
          body: JSON.stringify({ name: refCategory.current.value }),
        }
      );

      if (res.ok) {
        toastSuccess("Success create category");

        fetchCategory();
      } else {
        const json = await res.json();
        toastError(json.error.message);
      }
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="w-full">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-4">Category</h1>
      <AlertDialog>
        <AlertDialogTrigger className="bg-black text-white p-2 rounded-md text-sm">
          + Add new category
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Category</AlertDialogTitle>
            <input
              type="text"
              ref={refCategory}
              placeholder="name..."
              className="border-gray-500 border px-2 py-1.5 rounded-md"
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
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
        {categories &&
          categories.map((category, i) => (
            <div key={i} className="flex justify-between mt-2">
              <div className="flex gap-6 justify-center">
                <span className="font-semibold">{i + 1}</span>
                <span className="col-span-2">{category.name}</span>
              </div>
              <div className="flex gap-2 items-start text-white">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Badge className="bg-sky-500">Edit</Badge>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Category</AlertDialogTitle>
                      <input
                        type="text"
                        defaultValue={category.name}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="name..."
                        className="border-gray-500 border px-2 py-1.5 rounded-md"
                      />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-sky-500"
                        onClick={() => handleEdit(category._id)}
                      >
                        Save
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <DeleteButton
                  endPoint="categories"
                  fetchData={fetchCategory}
                  id={category._id}
                  token={auth?.accessToken}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminCategory;
