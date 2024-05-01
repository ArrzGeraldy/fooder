import { Input } from "@/components/ui/input";
import { FormDataI } from "./CreateProduct";

interface InputProductPropsI {
  setFormData: React.Dispatch<React.SetStateAction<FormDataI>>;
  value: string;
  type: string;
  label: string;
  placeholder: string;
}

const InputProduct = ({
  value,
  setFormData,
  type,
  label,
  placeholder,
}: InputProductPropsI) => {
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="w-full">
      <label className="mb-1 block">{label}</label>
      <Input
        placeholder={placeholder}
        className="w-full"
        name={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputProduct;
