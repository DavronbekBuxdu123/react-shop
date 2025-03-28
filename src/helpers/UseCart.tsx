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

export default function useCart() {
  const [cart, setCart] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      let newCart;
      if (existingProduct) {
        newCart = prevCart.map((p) =>
          p.id === product.id
            ? { ...p, quantity: String(Number(p.quantity) + 1) }
            : p
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: "1" }];
      }

      console.log("Old Cart:", prevCart);
      console.log("New Cart:", newCart);
      setCart([...newCart]);

      return newCart;
    });
  };

  return { cart, addCart };
}
