import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removePaste } from "../redux/pasteSlice";
import { NavLink } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useDispatch();

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (pasteId) => {
    dispatch(removePaste(pasteId));
  };

  useEffect(() => {
    console.log(pastes);
  }, [pastes]);

  return (
    <div className="txt-white">
      <input
        type="search"
        className="p-2 rounded-2xl min-w-[600px] mt-5 txt-black"
        name=""
        id=""
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredPastes.map((paste) => (
          <div key={paste.id} className="bg-gray-800 p-4 rounded-lg mt-4">
            <h2 className="text-xl font-bold">{paste.title}</h2>
            <p className="mt-2">{paste.content}</p>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <NavLink to={`/?pasteId=${paste?.id}`}>Edit</NavLink>
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3"
              onClick={() => handleDelete(paste?._id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-3"
              onClick={
                () => toast("feature coming soon...")
              }
            >
              Share
            </button>
            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-3"
            >
              <NavLink to={`/pastes/${paste?.id}`}>View</NavLink>
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-3"
              onClick={() => {
                navigator.clipboard.writeText(paste?.content);
                toast.success("Copied");
              }}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Paste;
