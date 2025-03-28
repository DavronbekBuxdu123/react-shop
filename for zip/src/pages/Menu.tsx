import Header from "../components/Header";
import Product from "../components/Products";
import { useEffect, useState } from "react";
import { Request } from "../helpers/Request";
import { CiGrid2H, CiGrid2V } from "react-icons/ci";

type Products = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string;
  category: { label: string; value: string };
  quantity: string;
};
type Categories = {
  title: string;
  id: string;
};

export default function Menu() {
  useEffect(() => {
    GetProducts();
    GetCatgories();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
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

  const GetCatgories = async () => {
    try {
      const { data } = await Request("/categories", "GET");
      setCategories(data);
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

  const handleCategory = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? "" : categoryId));
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.value === selectedCategory)
    : products;

  const [style, setStyle] = useState<"col" | "row">("col");
  const addCart = async (pro: Products) => {
    try {
      await Request("/cart", "POST", pro);
      console.log(pro);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-2 flex dark:bg-[#001e36] min-h-screen">
        <div className="w-1/4 max-h-[650px] flex mt-[50px] px-4 flex-col items-center">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-md flex items-center justify-center cursor-pointer px-3 py-2 w-full mt-[30px] text-white
                ${
                  cat.id === selectedCategory
                    ? "bg-[#44df78] text-white"
                    : "bg-[#43a1fb] hover:bg-[#1e70bf] dark:hover:bg-[#1e70bf]"
                }`}
              onClick={() => handleCategory(cat.id)}
            >
              {cat.title}
            </div>
          ))}
        </div>
        <div className="w-3/4 border-l p-2">
          <div className="flex justify-end space-x-2">
            {style === "col" ? (
              <CiGrid2V
                onClick={() => setStyle("row")}
                className="size-10 bg-[#43a1fb] text-white rounded-md p-1 hover:bg-[#1e70bf]"
              />
            ) : (
              <CiGrid2H
                onClick={() => setStyle("col")}
                className="size-10 bg-[#43a1fb] text-white rounded-md p-1 hover:bg-[#1e70bf]"
              />
            )}
          </div>
          <div
            className={`grid gap-4 ${
              style === "col"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {filteredProducts.map((pro) => (
              <Product
                quantity={pro.quantity}
                id={pro.id}
                title={pro.title}
                description={pro.description}
                price={pro.price}
                images={pro.images}
                liked={likedProductIds.includes(pro.id)}
                onLike={LikeProduct}
                viewStyle={style}
                addCart={() => addCart(pro)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
