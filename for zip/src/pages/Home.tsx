import Header from "../components/Header";
import Product from "../components/Products";
import { Request } from "../helpers/Request";
import { useEffect, useState } from "react";

type Products = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string;
  liked?: boolean;
  quantity: string;
};

export default function Home() {
  useEffect(() => {
    GetProducts();
  }, []);

  const [products, setProducts] = useState<Products[]>([]);
  const [cart, setCart] = useState<Products[]>([]);
  const [likedProductIds, setLikedProductIds] = useState<string[]>(
    JSON.parse(localStorage.getItem("likedProductIds") || "[]")
  );

  const GetProducts = async () => {
    try {
      const { data } = await Request("/products", "GET");
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const LikeProduct = (id: string) => {
    const like = likedProductIds.includes(id)
      ? likedProductIds.filter((productId) => productId !== id)
      : [...likedProductIds, id];

    setLikedProductIds(like);
    localStorage.setItem("likedProductIds", JSON.stringify(like));
  };

  const addCart = async (pro: Products) => {
    try {
      const maxsulot = cart.find((cartP) => cartP.id === pro.id);
      if (!maxsulot) {
        await Request("/cart", "POST", { ...pro, quantity: 1 });
      } else {
        await Request(`/cart/${pro.id}`, "PUT", {
          ...maxsulot,
          quantity: parseInt(maxsulot.quantity) + 1,
        });
        console.log(maxsulot.quantity);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#001e36]">
      <Header />
      <div className="container mx-auto h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {products.map((pro) => (
          <Product
            id={pro.id}
            title={pro.title}
            description={pro.description}
            price={pro.price}
            images={pro.images}
            liked={likedProductIds.includes(pro.id)}
            onLike={LikeProduct}
            viewStyle="col"
            quantity={pro.quantity}
            addCart={() => addCart(pro)}
          />
        ))}
      </div>
    </div>
  );
}
