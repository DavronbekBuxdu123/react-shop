import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Request } from "../helpers/Request";
type Products = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string;
  liked?: boolean;
};
export default function Cart() {
  useEffect(() => {
    GetProducts();
  }, []);
  const [cart, setCart] = useState<Products[]>([]);
  const GetProducts = async () => {
    try {
      const { data } = await Request("/cart", "GET");
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      await Request(`/cart/${id}`, "DELETE");
      GetProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dark:bg-[#001e36] min-h-screen">
      <Header />
      <div className="container mt-4 ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-xs text-white uppercase  dark:bg-[#43a1fb] bg-[#43a1fb]  ">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((pro) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img
                      src={pro.images[0]}
                      className="w-[120px] h-[120px]"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {pro.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-x-2">
                      <button className="text-xl rounded-full border w-[20px] h-[20px] flex items-center justify-center ">
                        <h4>+</h4>
                      </button>
                      <div>
                        <p>1</p>
                      </div>
                      <button className="text-xl rounded-full border w-[20px] h-[20px] flex items-center justify-center">
                        <h4>-</h4>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {pro.price}$
                  </td>
                  <td className="px-6 py-4">
                    <button></button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProduct(pro.id)}
                      className="p-2 bg-[#43a1fb] text-white rounded-md"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
