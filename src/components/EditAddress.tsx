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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MainAddressesI } from "@/types";
import { PencilSimpleLine } from "@phosphor-icons/react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import useRegion from "@/hooks/useRegion";
import useAuth from "@/hooks/useAuth";
import { toastError, toastSuccess } from "@/lib/toaster";

interface formDataEditI {
  name: string;
  phone: string;
  province: string;
  city: string;
  detail: string;
}

const EditAddress = ({
  address,
  fetchAddresses,
}: {
  address: MainAddressesI;
  fetchAddresses: () => void;
}) => {
  const [formData, setFormData] = useState<formDataEditI>({
    name: address.name,
    phone: address.phone,
    province: address.province,
    city: address.city,
    detail: address.detail,
  });

  const { provincies, cities, setProvinceId } = useRegion();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { auth } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const provinceChange = (e: string) => {
    setFormData((prev) => ({ ...prev, province: e }));
    setFormData((prev) => ({ ...prev, city: "" }));
  };

  const handleCancel = () => {
    setFormData(address);
    setIsOpen(false);
  };

  const submit = async () => {
    setIsLoading(true);
    const { name, city, detail, phone, province } = formData;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/addresses/${address._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "Application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
        body: JSON.stringify({ name, city, detail, phone, province }),
      }
    );

    if (!res.ok) {
      const json = await res.json();
      toastError(json.error.message);

      setIsLoading(false);
      return;
    }

    toastSuccess("Success edit address");
    setIsOpen(false);
    setIsLoading(false);
    fetchAddresses();
  };

  useEffect(() => {
    const p = provincies.filter(
      (province) => province.name === formData.province
    );
    p.length > 0 && setProvinceId(p[0].id);
  }, [formData.province, provincies, setProvinceId]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger
        onClick={() => setIsOpen(true)}
        className="p-2 bg-sky-500 h-fit rounded-md text-white"
      >
        <PencilSimpleLine className="lg:text-xl text-sm" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit address</AlertDialogTitle>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Name</label>
              <Input
                value={formData.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Phone</label>
              <Input
                value={formData.phone}
                name="phone"
                type="number"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Province</label>
              <Select
                defaultValue={formData.province}
                onValueChange={(e) => provinceChange(e)}
                name="province"
              >
                <SelectTrigger className="w-full border border-gray-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {provincies.map((province) => (
                    <SelectItem value={province.name} key={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">City</label>
              <Select
                defaultValue={formData.city}
                onValueChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e }))
                }
                name="city"
              >
                <SelectTrigger className="w-full border border-gray-500">
                  <SelectValue placeholder="Selecet new city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem value={city.name} key={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Detail</label>
              <textarea
                className="border-gray-500 px-2 py-2 border w-full h-36 rounded-md"
                value={formData.detail}
                name="detail"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={submit} disabled={isLoading}>
            {isLoading ? "Loading..." : "Save"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditAddress;
