import { useEffect, useState } from "react";
import { Request } from "../../helpers/Request";
import Product from "../../components/Products";

type Products = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string;
  quantity: string;
};

export default function Wishlist() {
  const [products, setProducts] = useState<Products[]>([]);
  const [likedProductIds, setLikedProductIds] = useState<string[]>(
    JSON.parse(localStorage.getItem("likedProductIds") || "[]")
  );

  useEffect(() => {
    GetProducts();
  }, []);

  const GetProducts = async () => {
    try {
      const { data } = await Request("/products", "GET");
      const liked = JSON.parse(localStorage.getItem("likedProductIds") || "[]");
      const LikedData = data.filter((pro: Products) => liked.includes(pro.id));
      setProducts(LikedData);
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
      await Request("/cart", "POST", pro);
      console.log(pro);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4 gap-4">
      {products.map((pro) => (
        <Product
          quantity={pro.quantity}
          id={pro.id}
          title={pro.title}
          description={pro.description}
          price={pro.price}
          images={pro.images}
          liked={likedProductIds.includes(pro.id)}
          onLike={LikeProduct}
          viewStyle="col"
          addCart={() => addCart(pro)}
        />
      ))}
    </div>
  );
}
