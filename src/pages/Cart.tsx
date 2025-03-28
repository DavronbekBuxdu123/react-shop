import Header from "../components/Header";
import { useState } from "react";
import { Request } from "../helpers/Request";
import { toast } from "react-toastify";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string;
  quantity: string;
};

export default function Cart() {
  const [cart, setCart] = useState<Product[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [locationName, setLocationName] = useState("");

  const QuantityUpdate = (id: string, son: number) => {
    let ProQuantity = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: String(Math.max(1, Number(item.quantity) + son)),
          }
        : item
    );

    setCart(ProQuantity);
    localStorage.setItem("cart", JSON.stringify(ProQuantity));
  };

  const deleteProduct = (id: string) => {
    const ProQuantity = cart.filter((item) => item.id !== id);
    setCart(ProQuantity);
    localStorage.setItem("cart", JSON.stringify(ProQuantity));
    toast.warning("Mahsulot savatdan o'chirildi", { position: "bottom-right" });
  };

  const umumiyNarx = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const placeOrder = async () => {
    const UserId = localStorage.getItem("id");
    try {
      const order = {
        UserId,
        status: "NEW",
        products: cart,
        createdAt: new Date(),
        name,
        phone,
        locationName,
      };

      await Request("/orders", "POST", order);
      toast.success("Buyurtma  yaratildi!");
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error(error);
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="dark:bg-[#001e36] min-h-screen p-4 sm:p-6">
      <Header />
      <div className="container mt-4 mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-sm text-left rtl:text-right min-w-[600px]">
            <thead className="text-xs text-white uppercase dark:bg-[#43a1fb] bg-[#43a1fb]">
              <tr>
                <th className="px-4 sm:px-6 py-3">Rasm</th>
                <th className="px-4 sm:px-6 py-3">Nomi</th>
                <th className="px-4 sm:px-6 py-3">Soni</th>
                <th className="px-4 sm:px-6 py-3">Narxi</th>
                <th className="px-4 sm:px-6 py-3">Umumiy</th>
                <th className="px-4 sm:px-6 py-3">Boshqarish</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((pro) => (
                <tr key={pro.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-4">
                    <img
                      src={pro.images[0]}
                      className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] object-cover"
                      alt={pro.title}
                    />
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-semibold text-xs sm:text-sm">
                    {pro.title}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-x-2">
                      <button
                        onClick={() => QuantityUpdate(pro.id, 1)}
                        className="text-xl w-8 h-8 flex items-center justify-center"
                      >
                        <CiCirclePlus size={20} />
                      </button>
                      <p className="text-sm">{pro.quantity}</p>
                      <button
                        onClick={() => QuantityUpdate(pro.id, -1)}
                        className="text-xl w-8 h-8 flex items-center justify-center"
                      >
                        <CiCircleMinus size={20} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-semibold text-xs sm:text-sm">
                    {pro.price}$
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-semibold text-xs sm:text-sm">
                    {Number(pro.price) * Number(pro.quantity)}$
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <button
                      onClick={() => deleteProduct(pro.id)}
                      className="p-2 bg-[#43a1fb] text-white rounded-md text-xs sm:text-sm"
                    >
                      O'chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cart.length > 0 ? (
          <div className="flex flex-col gap-4 p-4 sm:p-6 border-t mt-4">
            <h2 className="text-lg sm:text-xl font-bold dark:text-white">
              Umumiy narx: {umumiyNarx}$
            </h2>
            <input
              type="text"
              placeholder="Ismingiz"
              className="p-2 border rounded w-full sm:w-[400px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Telefon raqam"
              className="p-2 border rounded w-full sm:w-[400px]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Manzil"
              className="p-2 border rounded w-full sm:w-[400px]"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
            {localStorage.getItem("id") ? (
              <button
                onClick={placeOrder}
                className="p-3 w-full sm:w-[400px] bg-green-600 text-white rounded-md"
              >
                Buyurtma qilish
              </button>
            ) : (
              <p className="text-center dark:text-white text-sm sm:text-base">
                Siz ro'yhatdan o'tmagansiz
              </p>
            )}
          </div>
        ) : (
          <div className="p-2 text-center dark:text-white">
            Xaridlar mavjud emas
          </div>
        )}
      </div>
    </div>
  );
}
