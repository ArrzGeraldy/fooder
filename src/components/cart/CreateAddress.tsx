import {
  AlertDialog,
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import useAddress from "@/hooks/useAddress";
import { AuthI, MainAddressesI } from "@/types";
import useRegion from "@/hooks/useRegion";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(4).max(20),
  province: z.string().min(4).max(100),
  city: z.string().min(4).max(100),
  detail: z.string().min(4),
});

const toastSuccess = () => toast.success("Success create address.");

const CreateAddress = ({
  auth,
  setAddresses,
}: {
  auth: AuthI | undefined;
  setAddresses: React.Dispatch<React.SetStateAction<MainAddressesI[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, create, getAddresses } = useAddress();
  const { provincies, setProvinceId, cities } = useRegion();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      province: "",
      city: "",
      detail: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const province = JSON.parse(values.province);
    values.province = province.name;

    const store = await create(auth?.accessToken, values);
    if (store) toastSuccess();
    setIsOpen((prev) => !prev);
    form.reset();

    const result = await getAddresses(auth?.accessToken);
    setAddresses(result);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-black rounded-md p-2 text-white hover:bg-[#333] text-sm transition-all"
      >
        <span>+ Add new address</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Create address
          </AlertDialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="border border-gray-500"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="62888***"
                        {...field}
                        className="border border-gray-500"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Province</FormLabel>
                    <FormControl>
                      <Select
                        onOpenChange={() => {
                          try {
                            const json = JSON.parse(field.value);
                            setProvinceId(json.id);
                          } catch (error) {
                            setProvinceId("");
                          }
                        }}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-gray-500 border">
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          {provincies.map((province) => (
                            <SelectItem
                              key={province.id}
                              value={`${JSON.stringify(province)}`}
                            >
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">City</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-gray-500 border">
                          <SelectValue placeholder="Select Province first" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem value={city.name} key={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Detail</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="border-gray-400 px-2 py-2 border w-full h-36 rounded-md"
                      ></textarea>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                Submit
              </Button>
            </form>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="text-center w-full border border-gray-400"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </Form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateAddress;
