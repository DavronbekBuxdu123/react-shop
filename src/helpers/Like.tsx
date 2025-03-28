import { useState, useEffect } from "react";
import { Request } from "../helpers/Request";
import { toast } from "react-toastify";

export default function useLike() {
  const [likedId, setLikedId] = useState<string[]>([]);

  useEffect(() => {
    LikedProduct();
  }, []);

  const LikedProduct = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) return;

    try {
      const { data } = await Request(`/wishlist?userId=${userId}`, "GET");
      setLikedId(data.map((d) => d.productId));
    } catch (error) {
      console.error(error);
    }
  };

  const Like = async (id: string) => {
    const userId = localStorage.getItem("id");
    if (!userId) return;

    try {
      if (likedId.includes(id)) {
        const { data } = await Request(`/wishlist?productId=${id}`, "GET");
        if (data.length > 0) {
          await Request(`/wishlist/${data[0].id}`, "DELETE");
          setLikedId((prev) => prev.filter((item) => item !== id));
          toast.warning("Mahsulot sevimlilardan o'chirildi", {
            position: "bottom-right",
          });
        }
      } else {
        await Request("/wishlist", "POST", { productId: id, userId });
        setLikedId((prev) => [...prev, id]);
        toast.success("Mahsulot sevimlilarga qo'shildi", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { likedId, Like };
}
