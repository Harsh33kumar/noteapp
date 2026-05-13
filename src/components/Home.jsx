import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePaste, addPaste } from "../redux/pasteSlice.js";

function Home() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const [searchParam, setSearchParam] = useSearchParams();

  const dispatch = useDispatch();

  const pasteId = searchParam.get("pasteId");

  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p.id === pasteId);

      setTitle(paste?.title || "");
      setContent(paste?.content || "");
    }
  }, [pasteId, allpastes]);

  function createPasteFun() {
    const pasteData = {
      title,
      content,
      id: pasteId ? pasteId : Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePaste(pasteData));
    } else {
      dispatch(addPaste(pasteData));
    }

    setTitle("");
    setContent("");
    setSearchParam({});
  }

  return (
    <div className="home-container">
      <div className="note-card">
        <h1>{pasteId ? "Update Your Note" : "Create a New Note"}</h1>

        <input
          className="note-input"
          type="text"
          placeholder="Enter your note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="note-textarea"
          cols="50"
          rows="12"
          placeholder="Write your note content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button className="note-btn" onClick={createPasteFun}>
          {pasteId ? "Update Note" : "Create Note"}
        </button>
      </div>
    </div>
  );
}

export default Home;
