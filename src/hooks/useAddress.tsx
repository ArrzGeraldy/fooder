import { AddressI } from "@/types";
import { useState } from "react";

const useAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const create = async (token: string | undefined, value: AddressI) => {
    setIsLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/v1/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return false;
    }
  };

  const getAddresses = async (token: string | undefined) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/addresses`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await response.json();
    return json.data;
  };

  const deleteAddress = async (token: string | undefined, id: string) => {
    setIsLoading(true);
    setError(false);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/addresses/${id}`,
      {
        method: "delete",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setError(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setError(true);
  };
  return { isLoading, error, create, getAddresses, deleteAddress };
};

export default useAddress;
