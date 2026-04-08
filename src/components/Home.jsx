import React, { use } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePaste, addPaste } from "../redux/pasteSlice.js";
import { useSelector } from "react-redux";

function Home() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const pasteId = searchParam.get("pasteId");
  const [pastes, setPastes] = React.useState([]);
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    setTitle(pasteId ? allpastes.find((p) => p.id === pasteId)?.title : "");
    setContent(pasteId ? allpastes.find((p) => p.id === pasteId)?.content : "");
  }, [pasteId]);

  function createPasteFun() {
    const pasteData = {
      title,
      content,
      id: pasteId ? pasteId : Date.now().toString(35),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updatePaste(pasteData));
    } else {
      //create
      dispatch(addPaste(pasteData));
    }

    // after creation or update clear the data...
    setTitle("");
    setContent("");
    setSearchParam({});
  }
  return (
    <div>
      <input
        className="p-2 rounded-2xl mt-2 inp"
        type="text"
        name=""
        id=""
        placeholder="Enter your note title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        className="p-2 rounded-2xl mt-2"
        name=""
        id=""
        cols="50"
        rows="20"
        placeholder="Enter your note content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <input
        type="button"
        className="btn"
        value={pasteId ? "Update Note" : "Create Note"}
        onClick={createPasteFun}
      />
    </div>
  );
}

export default Home;
