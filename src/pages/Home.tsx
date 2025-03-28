import { toast } from "react-toastify";
import Header from "../components/Header";
import Product from "../components/Product";
import useLike from "../helpers/Like";
import { Request } from "../helpers/Request";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string;
  liked?: boolean;
  quantity: string;
};

export default function Home() {
  const [cart, setCart] = useState<Product[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [style, setStyle] = useState<"col" | "row">("col");
  const { Like, likedId } = useLike();
  console.log(setStyle);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await Request("/products", "GET");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
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
    <div className="min-h-screen dark:bg-[#001e36]">
      <Header />
      <div className="container mx-auto h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-6">
        {products.map((pro) => (
          <Product
            onLike={() => Like(pro.id)}
            addCart={() => addCart(pro)}
            viewStyle={style}
            product={{
              ...pro,
              images: [pro.images[0]],
              liked: likedId.includes(pro.id),
            }}
          />
        ))}
      </div>
    </div>
  );
}
