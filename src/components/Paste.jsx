import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
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
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="search"
          placeholder="Search your notes..."
          className="w-full max-w-2xl p-4 rounded-2xl bg-slate-800 outline-none border border-slate-700 focus:border-cyan-400 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => (
            <div
              key={paste.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              {/* Title */}
              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                {paste.title}
              </h2>

              {/* Content */}
              <p className="text-slate-300 mb-5 line-clamp-4 overflow-hidden">
                {paste.content}
              </p>

              {/* Date */}
              <p className="text-sm text-slate-500 mb-5">
                {new Date(paste.createdAt).toLocaleString()}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <NavLink
                  to={`/?pasteId=${paste.id}`}
                  className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition"
                >
                  Edit
                </NavLink>

                <button
                  onClick={() => handleDelete(paste.id)}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
                >
                  Delete
                </button>

                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition"
                  onClick={async () => {
                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: paste.title,
                          text: paste.content,
                          url: window.location.href,
                        });

                        toast.success("Shared Successfully");
                      } else {
                        await navigator.clipboard.writeText(
                          `${paste.title}\n\n${paste.content}`,
                        );

                        toast.success("Copied to Clipboard");
                      }
                    } catch (error) {
                      console.log(error);
                      toast.error("Sharing Failed");
                    }
                  }}
                >
                  Share
                </button>

                <NavLink
                  to={`/pastes/${paste.id}`}
                  className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition"
                >
                  View
                </NavLink>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to Clipboard");
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 transition"
                >
                  Copy
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-slate-400 text-xl">
            No Notes Found
          </div>
        )}
      </div>
    </div>
  );
}

export default Paste;
