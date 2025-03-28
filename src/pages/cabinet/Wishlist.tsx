import { useEffect, useState } from "react";
import { Request } from "../../helpers/Request";
import Product from "../../components/Product";
import useLike from "../../helpers/Like";
import { toast } from "react-toastify";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string;
  liked?: boolean;
  quantity: string;
};

export default function Wishlist() {
  const [products, setProducts] = useState<Product[]>([]);

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );
  const { Like, likedId } = useLike();
  useEffect(() => {
    getWishlist();
  }, []);
  console.log(wishlist);

  const getWishlist = async () => {
    try {
      const { data } = await Request("/wishlist", "GET");
      const productIds = data.map(
        (item: { productId: string }) => item.productId
      );
      setWishlist(productIds);
      fetchProducts(productIds);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async (productIds: string[]) => {
    try {
      const { data } = await Request("/products", "GET");
      const LikeMaxsulot = data
        .filter((product: Product) => productIds.includes(product.id))
        .map((product: Product) => ({ ...product, liked: true }));
      setProducts(LikeMaxsulot);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4 gap-4">
      {products.map((pro) => (
        <Product
          product={{
            ...pro,
            images: [pro.images[0]],
            liked: likedId.includes(pro.id),
          }}
          viewStyle="col"
          onLike={() => Like(pro.id)}
          addCart={() => addCart(pro)}
        />
      ))}
    </div>
  );
}
