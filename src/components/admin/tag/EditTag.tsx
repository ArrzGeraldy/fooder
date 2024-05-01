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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toastError, toastSuccess } from "@/lib/toaster";
import { CategoryI, TagI } from "@/types";

interface FromDataI {
  name: string;
  category: string;
}

interface EditTagPropsI {
  tag: TagI;
  setFormData: React.Dispatch<React.SetStateAction<FromDataI>>;
  categories: CategoryI[];
  formData: object;
  token: string | undefined;
  fetchTags: () => void;
}

const EditTag = ({
  tag,
  setFormData,
  categories,
  formData,
  token,
  fetchTags,
}: EditTagPropsI) => {
  const edit = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/tags/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const json = await res.json();

    if (!res.ok) {
      toastError(json.error.message);
    } else {
      toastSuccess("Success edit tag");
      fetchTags();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={() =>
          setFormData({
            name: tag.name,
            category: tag.category._id,
          })
        }
      >
        <Badge className="bg-sky-500">Edit</Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Category</AlertDialogTitle>
          <input
            type="text"
            defaultValue={tag.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="name..."
            className="border-gray-500 border px-2 py-1.5 rounded-md"
          />
          <Select
            defaultValue={tag.category._id}
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
          <AlertDialogAction
            className="bg-sky-500"
            onClick={() => edit(tag._id)}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditTag;
