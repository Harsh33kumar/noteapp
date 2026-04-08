import React, { use } from "react";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePaste, addPaste } from "../redux/pasteSlice.js";
import { useSelector } from "react-redux";

function ViewPaste() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p.id === id);
  console.log(paste);

  return (
    <div>
      <input
        className="p-2 rounded-2xl mt-2 txt-white"
        type="text"
        name=""
        id=""
        placeholder="Enter your note title here..."
        value={paste?.title || ""}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        className="p-2 rounded-2xl mt-2 txt-white"
        name=""
        id=""
        cols="50"
        rows="20"
        placeholder="Enter your note content here..."
        value={paste?.content || ""}
        disabled
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
}

export default ViewPaste;
