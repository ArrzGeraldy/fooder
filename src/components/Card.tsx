import useModal from "@/hooks/useModal";
import { toRupiah } from "@/lib/utils";
import { MenuI } from "@/types";

const Card = ({ menu }: { menu: MenuI }) => {
  const { setModal, setItem, setAmount } = useModal();
  const openModal = (item: MenuI) => {
    const modal = document.querySelector(".modal");
    setTimeout(() => {
      modal?.classList.toggle("modal-active");
    }, 0);
    document.body.style.overflow = "hidden";
    setItem(item);
    setAmount(item.price);
    setModal("modal-open");
  };
  return (
    <div
      onClick={() => openModal(menu)}
      className="text-xs md:text-sm border drop-shadow-md cursor-pointer border-gray-100  shadow-md px-4 py-6 flex flex-col gap-y-1 justify-end hover:border-accent_alt hover:shadow-xl rounded-md transition-all"
    >
      <div>
        <img src={`${import.meta.env.VITE_API_URL}/${menu.image_url}`} alt="" />

        <span className="text-xs text-gray-500 ">
          {menu.tags.map((tag) => `${tag.name} `)}
        </span>
        <h4 className="font-semibold hover:text-accent_alt transition-all">
          {menu.name}
        </h4>
      </div>
      <div className="flex md:justify-between md:items-center mt-2 md:flex-row flex-col gap-2">
        <p className="font-semibold">{toRupiah(menu.price)}</p>
        <button className="bg-accent_alt px-2 py-1 rounded-md text-white">
          + Add
        </button>
      </div>
    </div>
  );
};

export default Card;
