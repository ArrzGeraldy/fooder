import Pagination from "@/components/Pagination";
import DeleteButton from "@/components/admin/DeleteButton";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";
import { MenuI } from "@/types";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminProduct = () => {
  const [products, setProducts] = useState<MenuI[]>();
  const { auth } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();

  const calculateNumber = (
    totalPage: number | undefined,
    page: number,
    i: number
  ) => {
    if (totalPage) {
      return i + 1 + (totalPage - (page - 1)) * 8;
    }
  };

  const fetchMenu = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/products?limit=8&page=${page}`
    );

    const json = await response.json();
    setTotalPage(json.pagination.total_page);
    setProducts(json.data);
  };

  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <>
      <section className="w-full">
        <Toaster />
        <h1 className="font-semibold text-2xl mb-4">Product</h1>
        <Link
          to={"/admin/product/create"}
          className="bg-black p-2 rounded-md text-white text-sm"
        >
          + Create Product
        </Link>

        <div className="bg-white border w-[90%]  border-gray-300 drop-shadow-md rounded-lg px-4 py-2 mt-4">
          <div className="flex justify-between font-semibold py-2 border-b border-gray-400 mb-4">
            <div className="flex gap-4">
              <span>No</span>
              <span className="col-span-2">Name</span>
            </div>
            <span>Action</span>
          </div>
          {products &&
            products.map((product, i) => (
              <div key={i} className="flex justify-between mt-2">
                <div className="flex gap-6 justify-center">
                  <span className="font-semibold">
                    {page > 1 ? calculateNumber(totalPage, page, i) : i + 1}
                  </span>
                  <span className="col-span-2">{product.name}</span>
                </div>
                <div className="flex gap-2 items-start text-white">
                  <Badge className="bg-sky-500">Edit</Badge>
                  <DeleteButton
                    endPoint="products"
                    fetchData={fetchMenu}
                    id={product._id}
                    token={auth?.accessToken}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="mt-12">
          <Pagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      </section>
    </>
  );
};

export default AdminProduct;
