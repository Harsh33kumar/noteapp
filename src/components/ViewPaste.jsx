import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewPaste() {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p.id === id);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800">
        {/* Title */}
        <input
          className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 text-3xl font-bold text-cyan-400 outline-none mb-6"
          type="text"
          value={paste?.title || ""}
          disabled
        />

        {/* Content */}
        <textarea
          className="w-full p-5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 outline-none resize-none"
          rows="18"
          value={paste?.content || ""}
          disabled
        ></textarea>

        {/* Footer */}
        <div className="mt-6 text-right text-slate-500">
          Created At:{" "}
          {paste?.createdAt
            ? new Date(paste.createdAt).toLocaleString()
            : "N/A"}
        </div>
      </div>
    </div>
  );
}

export default ViewPaste;
