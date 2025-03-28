import { useState, useEffect } from "react";
import { Request } from "../../helpers/Request";

interface Category {
  label: string;
  value: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: Category;
  images: string[];
  quantity: string;
}

interface Order {
  id: string;
  UserId: string;
  status: "NEW" | "INPROGRESS" | "COMPLETED";
  products: Product[];
  createdAt: string;
  name: string;
  phone: string;
  locationName: string;
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    getUserOrders();
  }, []);

  const getUserOrders = async () => {
    try {
      const { data } = await Request("/orders", "GET");
      const userOrders = data.filter((order: Order) => order.UserId === userId);
      setOrders(userOrders);
    } catch (error) {
      console.error(error);
    }
  };

  const status = ["NEW", "INPROGRESS", "COMPLETED"];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Buyurtmalar</h2>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
        {status.map((status) => (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md ">
            <h3 className="text-lg font-bold mb-2">{status}</h3>
            {orders.filter((order) => order.status === status).length === 0 ? (
              <p></p>
            ) : (
              orders
                .filter((order) => order.status === status)
                .map((order) => (
                  <div className="mb-4 p-2 border-b">
                    <p className="font-semibold">Order ID: {order.id}</p>
                    <p>
                      {order.name} - {order.phone}
                    </p>
                    <p>Location: {order.locationName}</p>
                    {order.products.map((product) => (
                      <p>
                        {product.title}
                        <span className="font-bold ml-1">
                          -{product.quantity}x
                        </span>
                      </p>
                    ))}
                    <p className="font-bold">
                      Yaratilgan: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
