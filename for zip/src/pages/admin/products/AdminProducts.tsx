import { useEffect, useState } from "react";
import Rodal from "rodal";
import CreatableSelect from "react-select/creatable";
import { Request } from "../../../helpers/Request";

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type OptionType = {
  label: string;
  value: string;
};
type Category = {
  id: string;
  title: string;
};
type AdminProducts = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: {
    label: string;
    value: string;
  };
  images: string[];
};

export default function AdminProducts() {
  useEffect(() => {
    GetCategories();
    GetProducts();
  }, []);
  const [editingId, setEditingId] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [category, setCategory] = useState<OptionType | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [adminproducts, setAdminProducts] = useState<AdminProducts[]>([]);

  const handleChangeCategory = async (data: OptionType) => {
    setCategory(data);
  };

  const GetCategories = async () => {
    try {
      const { data } = await Request("/categories", "GET");
      const changedcategories = data.map(
        (pro: { title: string; id: string }) => ({
          label: pro.title,
          value: pro.id,
        })
      );
      setCategories(changedcategories);
    } catch (error) {
      console.log(error);
    }
  };

  const createoption = (label: string) => ({
    label,
    value: `dav_${Date.now()}`,
  });

  const handlecreate = async (inputValue: string) => {
    const newOption = createoption(inputValue);
    try {
      const { data } = await Request("/categories", "POST", {
        id: newOption.value,
        title: newOption.label,
      });
      setCategory({ label: data.title, value: data.id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddImage = () => {
    setImageUrls((prev) => [...prev, imageUrl]);
    setImageUrl("");
  };

  const handleSave = async () => {
    if (editingId === "") {
      try {
        await Request("/products", "POST", {
          title,
          description,
          price,
          category,
          images: imageUrls,
        });
        GetProducts();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Request(`/products/${editingId}`, "PUT", {
          title,
          description,
          price,
          category,
          images: imageUrls,
        });
        GetProducts();
      } catch (error) {
        console.log(error);
      }
    }

    console.log(imageUrl, imageUrls);
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory(undefined);
    setImageUrls([]);
    setImageUrl("");
    setOpen(false);
  };
  const GetProducts = async () => {
    try {
      const { data } = await Request("/products", "GET");
      setAdminProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (proId: string) => {
    try {
      await Request(`/products/${proId}`, "DELETE");
      GetProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (pro: AdminProducts) => {
    setTitle(pro.title);
    setDescription(pro.description);
    setPrice(pro.price);
    setCategory(pro.category);
    setImageUrl(pro.images[0]);
    console.log(pro.images);
    setEditingId(pro.id);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end p-4 ">
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="text-white bg-[#43a1fb] font-medium rounded-lg text-sm px-3 py-2 dark:bg-[#43a1fb] dark:hover:bg-[#1e70bf] hover:bg-[#1e70bf]"
        >
          Add Product
        </button>
      </div>
      <div className="p-4 flex justify-evenly flex-wrap gap-6">
        {adminproducts.map((pro) => (
          <div className="relative  cursor-pointer  w-full max-w-[18rem] overflow-hidden rounded-lg bg-white shadow-md dark:shadow-[0px_0px_1px_1px_rgb(255,255,255)]">
            <img
              className="h-60 w-[300px] rounded-t-lg  object-cover"
              src={pro.images[0]}
              alt="product image"
            />
            <div className="p-3 rounded-b-lg dark:bg-[#001e36] dark:text-white overflow-hidden">
              <h5 className="text-xl font-semibold tracking-tight flex gap-x-12   ">
                {pro.title}
              </h5>

              <div className=" flex items-center">{pro.description}</div>
              <div className="flex items-center justify-between ">
                <div>
                  <h3 className="text-bold mt-2">${pro.price}</h3>
                </div>
                <div className=" bg-[#43a1fb] hover:bg-[#1e70bf]  w-[100px]  flex justify-between px-2 rounded-md items-center mt-2 dark:bg-[#43a1fb] h-[40px] text-white">
                  <FaRegEdit
                    onClick={() => handleUpdate(pro)}
                    className="size-8"
                  />
                  <MdDelete
                    onClick={() => handleDelete(pro.id)}
                    className="size-8"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Rodal
          customStyles={{ height: "max-content" }}
          visible={open}
          onClose={() => setOpen(false)}
        >
          <div className="py-4 space-y-4">
            <input
              type="text"
              placeholder="title..."
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CreatableSelect
              placeholder="Select Category"
              isClearable
              isSearchable
              onChange={(newValue) =>
                handleChangeCategory(newValue as OptionType)
              }
              onCreateOption={handlecreate}
              options={categories}
              value={category}
            />
            <textarea
              className="form-control"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="number"
              placeholder="price..."
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="flex gap-x-2">
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <button
                onClick={handleAddImage}
                className="bg-[#43a1fb] w-[40px] p-2 rounded-lg text-white"
              >
                +
              </button>
            </div>
            <div className="mt-4">
              <ul>
                {imageUrls.map((url) => (
                  <img className="w-[200px] h-[100px]" src={url} alt="Rasm" />
                ))}
              </ul>
            </div>
            <button
              onClick={handleSave}
              className="text-white w-full bg-[#43a1fb] font-medium rounded-lg text-sm px-3 py-2 dark:bg-[#43a1fb] dark:hover:bg-[#1e70bf] hover:bg-[#1e70bf]"
            >
              Save
            </button>
          </div>
        </Rodal>
      </div>
    </div>
  );
}
