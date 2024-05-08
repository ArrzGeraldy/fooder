import { CityI, ProvinceI } from "@/types";
import { useEffect, useState } from "react";

const useRegion = () => {
  const [provincies, setProvincies] = useState<ProvinceI[]>([]);
  const [cities, setCities] = useState<CityI[]>([]);
  const [provinceId, setProvinceId] = useState<string>();
  const url = "https://www.emsifa.com/api-wilayah-indonesia/api";

  useEffect(() => {
    const getProvinces = async () => {
      const response = await fetch(`${url}/provinces.json`);
      const json = await response.json();
      setProvincies(json);
    };
    getProvinces();
  }, []);
  useEffect(() => {
    const getCities = async () => {
      const response = await fetch(`${url}/regencies/${provinceId}.json`);
      const json = await response.json();
      setCities(json);
    };
    provinceId && getCities();
  }, [provinceId]);

  return { provincies, setProvinceId, cities };
};

export default useRegion;
