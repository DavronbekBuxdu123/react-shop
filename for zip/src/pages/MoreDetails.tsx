import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Request } from "../helpers/Request";

type Products = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  liked?: boolean;
};
export default function MoreDetails() {
  const params = useParams();
  const [product, setProduct] = useState<Products[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const getProducts = async (id: string) => {
    try {
      const { data } = await Request(`/products?id=${id}`, "GET");
      setProduct(data);
      console.log(data[0].images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getProducts(params.id);
    }
  }, [params]);

  return (
    <div className="dark:bg-[#001e36] dark:text-white min-h-screen text-gray-900">
      <div className="border h-[100vh] w-full flex ">
        <div className="w-1/4 min-h-screen  border px-20 space-y-5   ">
          {product.length > 0 &&
            product[0].images.map((img, index) => (
              <div
                onClick={() => setSelectedImage(img)}
                className={`${
                  selectedImage === img ? "scale-[1.1] border rounded-lg" : ""
                } mt-3 flex items-center justify-center p-2 `}
              >
                <img
                  className="w-[200px] h-[200px] rounded-xl cursor-pointer "
                  src={img}
                  alt=""
                />
              </div>
            ))}
        </div>
        <div className="w-1/2 h-screen border">
          <div className="p-5">
            {product.map((url) => (
              <div>
                {" "}
                <img
                  className="w-[500px] h-[600px] mx-auto rounded-xl"
                  src={selectedImage === null ? url.images[0] : selectedImage}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4 h-screen border p-4">
          {product.map((pro) => (
            <div>
              <h1>{pro.title}</h1>
              <p>{pro.description}</p>
              <h6>{pro.price}$</h6>
              <button className="p-2 bg-[#43a1fb] text-white rounded-md">
                Add to cart
              </button>
            </div>
          ))}
          <div className="p-4"></div>
        </div>
      </div>
    </div>
  );
}
