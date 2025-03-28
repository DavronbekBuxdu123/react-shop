import { FaShoppingCart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

type ProductProps = {
  product: {
    id: string;
    title: string;
    description: string;
    price: string;
    images: string[];
    liked?: boolean;
  };
  viewStyle: "col" | "row";
  onLike: (id: string) => void;
  addCart: () => void;
};

export default function Product({
  product,
  viewStyle,
  onLike,
  addCart,
}: ProductProps) {
  return viewStyle === "col" ? (
    <div className="relative m-2  sm:m-4 md:m-6 lg:m-10 cursor-pointer w-full max-w-[20rem]  overflow-hidden rounded-lg bg-white dark:bg-[#001e36] shadow-md dark:shadow-[0px_0px_1px_1px_rgb(255,255,255)]">
      <Link to={`/${product.id}`}>
        <img
          className="h-48 sm:h-56 md:h-64 lg:h-72 rounded-t-lg w-full object-cover"
          src={product.images[0]}
          alt="product image"
        />
      </Link>
      <div className="p-4 rounded-b-lg dark:bg-[#001e36] dark:text-white overflow-hidden">
        <h5 className="text-lg sm:text-xl font-semibold tracking-tight flex justify-between">
          {product.title}
          <button onClick={() => onLike(product.id)}>
            {product.liked ? (
              <AiFillHeart className="size-6 sm:size-7 md:size-8 text-red-500" />
            ) : (
              <CiHeart className="size-6 sm:size-7 md:size-8" />
            )}
          </button>
        </h5>
        <div className="flex items-center justify-between mt-2">
          <h3 className="text-bold text-sm sm:text-base">${product.price}</h3>
        </div>
        <button
          onClick={addCart}
          className="bg-[#43a1fb] hover:bg-[#1e70bf] w-full flex justify-center space-x-2 rounded-md items-center mt-4 dark:bg-[#43a1fb] h-[40px] sm:h-[45px] md:h-[50px] text-white"
        >
          <FaShoppingCart className="size-5 sm:size-6 md:size-7" />
          <p className="mt-[0.5rem] sm:mt-[0.75rem] md:mt-[1rem]">
            Savatga qo'shish
          </p>
        </button>
      </div>
    </div>
  ) : (
    <div className="relative cursor-pointer m-2 sm:m-4 md:m-6 lg:m-10 w-full max-w-lg flex rounded-lg dark:shadow-[0px_0px_1px_1px_rgb(255,255,255)] shadow-md p-2 dark:bg-[#001e36]">
      <div className="w-1/2">
        <Link to={`/${product.id}`}>
          <img
            className="h-40 sm:h-48 md:h-56 lg:h-60 rounded-lg object-cover w-full"
            src={product.images[0]}
            alt={product.title}
          />
        </Link>
      </div>
      <div className="px-2 w-1/2 dark:text-white dark:bg-[#001e36] rounded-md">
        <h5 className="text-lg sm:text-xl font-semibold mt-2">
          {product.title}
        </h5>
        <p className="line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-between px-1">
          <h3 className="text-bold text-sm sm:text-base">${product.price}</h3>
          <button onClick={() => onLike(product.id)}>
            {product.liked ? (
              <AiFillHeart className="size-5 sm:size-6 md:size-7 text-red-500" />
            ) : (
              <CiHeart className="size-5 sm:size-6 md:size-7" />
            )}
          </button>
        </div>
        <button
          onClick={addCart}
          className="bg-[#43a1fb] hover:bg-[#1e70bf] w-full sm:h-[50px] text-white  p-2 rounded-lg flex items-center justify-center  gap-x-3 mt-2"
        >
          <FaShoppingCart size={24} className="sm:size-8 md:size-8 lg:size-8" />
          Savatga qo'shish
        </button>
      </div>
    </div>
  );
}
