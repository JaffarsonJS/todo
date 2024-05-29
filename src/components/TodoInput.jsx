import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const TodoInput = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and Description cannot be empty");
      return;
    }
    onAddTodo({
      title,
      description,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="bg-brandBlue flex flex-col items-center justify-center border-b border-gray-700 mb-6 p-16 ">
        <div className="flex flex-col lg:flex-row">
          <div className=" flex flex-col items-start mr-6 text-white p-6">
            <label className=" ">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="flex flex-col items-start mr-6 text-white p-6">
            <label className="">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
        </div>
      <div className="flex flex-col items-start">
      </div>
        <button
          type="button"
          onClick={handleAdd}
          className=" mt-6 cursor-pointer flex items-center gap-2"
        >
          Add
          <IoMdAdd className="bg-brandPaleBlue text-xl"/>
        </button>
      </div>
    </>
  );
};

export default TodoInput;
