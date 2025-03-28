import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Request } from "../helpers/Request";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  liked?: boolean;
  quantity?: string;
};

export default function MoreDetails() {
  const params = useParams();
  const [product, setProduct] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getProducts = async (id: string) => {
    try {
      const { data } = await Request(`/products?id=${id}`, "GET");
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getProducts(params.id);
    }
  }, [params]);

  const [cart, setCart] = useState<Product[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );

  const addCart = (pro: Product) => {
    const ProductCart = cart.find((item) => item.id === pro.id);

    let ProQuantity;
    if (ProductCart) {
      ProQuantity = cart.map((item) =>
        item.id === pro.id
          ? { ...item, quantity: String(Number(item.quantity) + 1) }
          : item
      );
    } else {
      ProQuantity = [...cart, { ...pro, quantity: "1" }];
    }

    setCart(ProQuantity);
    localStorage.setItem("cart", JSON.stringify(ProQuantity));
    toast.success("Mahsulot savatga qo'shildi", { position: "bottom-right" });
  };

  return (
    <div className="dark:bg-[#001e36] dark:text-white min-h-screen text-gray-900">
      <Header />
      <div className="border w-full flex flex-col md:flex-row ">
        <div className="w-full md:w-1/4  border px-5 md:px-20 space-y-5 flex md:block overflow-x-auto md:overflow-visible">
          {product.length > 0 &&
            product[0].images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`${
                  selectedImage === img ||
                  (selectedImage === null && index === 0)
                    ? "scale-[1.1] border rounded-lg"
                    : ""
                } mt-3 flex items-center justify-center p-4 cursor-pointer`}
              >
                <img
                  className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-xl"
                  src={img}
                  alt=""
                />
              </div>
            ))}
        </div>
        <div className="w-full md:w-1/2 h-auto md:h-screen border flex justify-center items-center p-5">
          <div className="py-10 md:py-20">
            {product.map((url) => (
              <div key={url.id} className="p-5 md:p-10">
                <img
                  className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] mx-auto rounded-xl"
                  src={selectedImage === null ? url.images[0] : selectedImage}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 h-auto md:h-screen border p-4">
          {product.map((pro) => (
            <div key={pro.id}>
              <h1 className="text-lg md:text-xl font-semibold">{pro.title}</h1>
              <p className="text-sm md:text-base">{pro.description}</p>
              <h6 className="text-lg font-bold">{pro.price}$</h6>
              <button
                className="p-2 bg-[#43a1fb] flex items-center gap-x-2 text-white rounded-md mt-3"
                onClick={() => addCart(pro)}
              >
                <FaShoppingCart size={20} /> Savatga qo'shish
              </button>
            </div>
          ))}
          <div className="p-4"></div>
        </div>
      </div>
    </div>
  );
}
