import { TagI } from "@/types";
import { FormDataI } from "./CreateProduct";

interface TagInputPropsI {
  tags: TagI[] | undefined;
  setFormData: React.Dispatch<React.SetStateAction<FormDataI>>;
  formData: FormDataI;
}

const TagInput = ({ tags, setFormData, formData }: TagInputPropsI) => {
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, e.target.value],
      }));
    } else {
      const updatedTags = formData.tags.filter((tag) => tag !== e.target.value);
      setFormData((prev) => ({
        ...prev,
        tags: updatedTags,
      }));
    }
  };
  return (
    <div>
      <label className="mb-1 block">Tags</label>
      <div className="flex gap-2.5 items-center">
        {!tags ? (
          <div className="border border-gray-500 w-full px-2 py-2 bg-gray-200 rounded-md text-sm">
            Please select category first
          </div>
        ) : (
          tags.map((tag, i) => (
            <div key={i} className="flex items-center ">
              <label className="checkbox-container mt-2">
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  value={tag.name}
                  onChange={(e) => handleChecked(e)}
                />
                <span className="checkmark"></span>
                <span className="text-sm">{tag.name}</span>
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TagInput;
