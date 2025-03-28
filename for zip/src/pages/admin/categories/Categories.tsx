import { useEffect, useState } from "react";
import Rodal from "rodal";
import { Request } from "../../../helpers/Request";
import { FaEdit } from "react-icons/fa";
type Categories = {
  title: string;
  id: string;
};
export default function Categories() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<Categories[]>([]);
  const [editingId, setEditingId] = useState("");
  useEffect(() => {
    GetCategories();
  }, []);

  const PostCategories = async () => {
    const obj = {
      title,
    };
    if (editingId === "") {
      try {
        await Request("/categories", "POST", obj);
        GetCategories();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Request(`/categories/${editingId}`, "PUT", obj);
      } catch (error) {
        console.log(error);
      }
    }

    setOpen(false);
  };
  const GetCategories = async () => {
    try {
      const { data } = await Request("/categories", "GET");
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (cat: Categories) => {
    setTitle(cat.title);
    setOpen(true);
    setEditingId(cat.id);
  };

  return (
    <div>
      <div className="flex justify-end p-4 ">
        {" "}
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="text-white bg-[#43a1fb]  font-medium rounded-lg text-sm px-3 py-2   dark:bg-[#43a1fb] dark:hover:bg-[#1e70bf] hover:bg-[#1e70bf]"
        >
          Add Category
        </button>
      </div>
      <div className="p-4 flex gap-y-4 justify-evenly flex-wrap">
        {categories.map((cat) => (
          <div className="p-2 w-[250px]  h-[100px] bg-[#43a1fb] text-white rounded-xl cursor-pointer flex flex-col items-center justify-center">
            <h5 className="flex items-center gap-x-4 text-center">
              {cat.title}{" "}
              <FaEdit
                onClick={() => handleUpdate(cat)}
                className="size-8 mt-1 cursor-pointer"
              />
            </h5>
          </div>
        ))}
      </div>
      <Rodal
        customStyles={{ height: "max-content" }}
        visible={open}
        onClose={() => setOpen(false)}
      >
        <div className="py-4 ">
          <input
            type="text"
            placeholder="CategoryTitle..."
            className="form-control mt-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={PostCategories}
            className="w-full p-2 bg-[#43a1fb] hover:bg-[#1e70bf] rounded-lg mt-4 text-white"
          >
            {" "}
            Save
          </button>
        </div>
      </Rodal>
    </div>
  );
}
