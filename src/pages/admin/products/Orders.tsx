import React, { useState, useEffect } from "react";
import { Request } from "../../../helpers/Request";

interface Order {
  id: string;
  status: "NEW" | "INPROGRESS" | "COMPLETED";
  name: string;
  UserId: string;
  createdAt: string;
  phone: string;
  locationName: string;
}

const columns = {
  NEW: "New",
  INPROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    Request("/orders", "GET").then(({ data }) => setOrders(data));
  }, []);

  const onDragStart = (event: React.DragEvent, orderId: string) => {
    event.dataTransfer.setData("orderId", orderId);
  };

  const onDrop = async (event: React.DragEvent, newStatus: Order["status"]) => {
    event.preventDefault();
    const orderId = event.dataTransfer.getData("orderId");

    const orderToUpdate = orders.find((order) => order.id === orderId);
    if (!orderToUpdate) return;

    const updatedOrder = { ...orderToUpdate, status: newStatus };

    try {
      await Request(`/orders/${orderId}`, "PUT", updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(columns).map(([key, title]) => (
        <div
          key={key}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, key as Order["status"])}
          className="w-[300px] bg-gray-100 p-4 rounded-lg min-h-[300px] "
        >
          <h2 className="text-lg font-bold mb-2 ">{title}</h2>
          {orders
            .filter((order) => order.status === key)
            .map((order) => (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, order.id)}
                className="bg-white p-3 mb-2 rounded-lg shadow-md cursor-pointer"
              >
                <p className="font-semibold">Order ID: {order.id}</p>
                <p>{order.name}</p>
                <p>UserId : {order.UserId}</p>
                <p>
                  Title : {order.products[0].title} {order.products[0].quantity}
                  x
                </p>
                <p>Yaratilgan payt : {order.createdAt}</p>
                <p>Name : {order.name}</p>
                <p>Phone : {order.phone}</p>
                <p>Location : {order.locationName}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
