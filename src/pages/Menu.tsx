import Header from "../components/Header";
import Product from "../components/Product";
import { useContext, useEffect, useState } from "react";
import { Request } from "../helpers/Request";
import { CiGrid2H, CiGrid2V } from "react-icons/ci";
import useLike from "../helpers/Like";
import { toast } from "react-toastify";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { ThemeContext } from "../context/ThemeContent";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string;
  quantity: string;
  category: { label: string; value: string };
};

type Categories = {
  title: string;
  id: string;
};

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const myTheme = useContext(ThemeContext);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectCategoriya, setSelectedCategory] = useState<string>("");
  const [style, setStyle] = useState<"col" | "row">("col");
  const [cart, setCart] = useState<Product[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );
  const { Like, likedId } = useLike();

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await Request("/products", "GET");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await Request("/categories", "GET");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  const CategoriyaTanlash = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? "" : categoryId));
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

  const menuFilter = selectCategoriya
    ? products.filter((product) => {
        return product.category?.value === selectCategoriya;
      })
    : products;

  return (
    <div>
      <Header />
      <div className="p-2 flex dark:bg-[#001e36] b min-h-screen relative">
        <button
          className="lg:hidden fixed top-4 mt-[95px] left-4 z-40 bg-[#43a1fb] text-white p-2 rounded-md"
          onClick={() => setOpenSidebar(true)}
        >
          <IoMdMenu size={24} />
        </button>

        {openSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setOpenSidebar(false)}
          ></div>
        )}

        <div
          className={`fixed lg:static top-0 left-0 h-full lg:w-1/4 ${
            myTheme?.theme === "dark" ? "dark:bg-[#001e36] " : "bg-white"
          }  sm:border-none  shadow-md p-4 z-50 transform ${
            openSidebar ? "translate-x-0   " : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <button
            className="lg:hidden absolute top-4 right-4 text-dark dark:text-white"
            onClick={() => setOpenSidebar(false)}
          >
            <IoMdClose className="dark:text-white" size={24} />
          </button>

          <div className="  flex flex-col items-center">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`rounded-md flex items-center justify-center cursor-pointer px-3 py-2 w-full mt-4 text-white
                  ${
                    cat.id === selectCategoriya
                      ? "bg-[#44df78] text-white"
                      : "bg-[#43a1fb] hover:bg-[#1e70bf] dark:hover:bg-[#1e70bf]"
                  }`}
                onClick={() => {
                  CategoriyaTanlash(cat.id);
                  setOpenSidebar(false);
                }}
              >
                {cat.title}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-3/4 sm:border-none lg:border-l p-2">
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
            {menuFilter.map((pro) => (
              <Product
                key={pro.id}
                onLike={() => Like(pro.id)}
                viewStyle={style}
                product={{
                  ...pro,
                  images: [pro.images[0]],
                  liked: likedId.includes(pro.id),
                }}
                addCart={() => addCart(pro)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
