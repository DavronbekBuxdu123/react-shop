import { FaShoppingCart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Request } from "../helpers/Request";
import { useEffect, useState } from "react";

type ProductProps = {
  id: string;
  quantity: number;
  title: string;
  description: string;
  price: string;
  images: string;
  liked: boolean;
  onLike: (id: string) => void;
  viewStyle: "col" | "row";
  addCart: () => void;
};

export default function Product({
  id,
  title,
  description,
  price,
  images,
  liked,
  onLike,
  viewStyle,
  addCart,
  quantity,
}: ProductProps) {
  const [cart, setCarts] = useState([]);
  useEffect(() => {
    GetProducts();
  }, []);
  const GetProducts = async () => {
    try {
      const { data } = await Request("/cart", "GET");
      setCarts(data);
      console.log(data, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  return viewStyle === "col" ? (
    <div className="relative m-2 sm:m-4 md:m-6 lg:m-10 cursor-pointer w-full max-w-[18rem] overflow-hidden rounded-lg bg-white dark:bg-[#001e36] shadow-md dark:shadow-[0px_0px_1px_1px_rgb(255,255,255)]">
      <Link to={`/${id}`}>
        {" "}
        <img
          className="h-40 sm:h-48 md:h-56 lg:h-60 rounded-t-lg w-full object-cover"
          src={images[0]}
          alt="product image"
        />
      </Link>
      <div className="p-3 rounded-b-lg dark:bg-[#001e36] dark:text-white overflow-hidden">
        <h5 className="text-lg sm:text-xl font-semibold tracking-tight flex justify-between">
          {title}
          <button onClick={() => onLike(id)}>
            {liked ? (
              <AiFillHeart className="size-5 sm:size-6 md:size-7 text-red-500" />
            ) : (
              <CiHeart className="size-5 sm:size-6 md:size-7" />
            )}
          </button>
        </h5>
        <div className="flex items-center justify-between">
          <h3 className="text-bold text-sm sm:text-base">${price}</h3>
        </div>
        <button className="bg-[#43a1fb] hover:bg-[#1e70bf] w-full flex justify-center space-x-2 rounded-md items-center mt-2 dark:bg-[#43a1fb] h-[30px] sm:h-[35px] md:h-[40px] text-white">
          <button onClick={addCart}>
            <FaShoppingCart className="size-4 sm:size-5 md:size-6" />
          </button>
          <p className="mt-[0.5rem] sm:mt-[0.75rem] md:mt-[1rem]">
            Add to Cart
          </p>
        </button>
      </div>
    </div>
  ) : (
    <div className="relative cursor-pointer m-2 sm:m-4 md:m-6 lg:m-10 w-full max-w-lg flex rounded-lg dark:shadow-[0px_0px_1px_1px_rgb(255,255,255)] shadow-md p-2 dark:bg-[#001e36]">
      <div className="w-1/2">
        <Link to={`/${id}`}>
          <img
            className="h-40 sm:h-48 md:h-56 lg:h-60 rounded-lg object-cover w-full"
            src={images[0]}
            alt="product image"
          />
        </Link>
      </div>
      <div className="px-2 w-1/2 dark:text-white dark:bg-[#001e36] rounded-md">
        <h5 className="text-lg sm:text-xl font-semibold mt-2">{title}</h5>
        <p className="line-clamp-3">{description}</p>
        <div className="flex items-center justify-between px-1">
          <h3 className="text-bold text-sm sm:text-base">${price}</h3>
          <button onClick={() => onLike(id)}>
            {liked ? (
              <AiFillHeart className="size-5 sm:size-6 md:size-7 text-red-500" />
            ) : (
              <CiHeart className="size-5 sm:size-6 md:size-7" />
            )}
          </button>
        </div>
        <button
          onClick={addCart}
          className="bg-[#43a1fb] hover:bg-[#1e70bf] w-full text-white p-2 rounded-lg flex items-center justify-center gap-x-3 mt-2"
        >
          <FaShoppingCart className="size-4 sm:size-5 md:size-6" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
