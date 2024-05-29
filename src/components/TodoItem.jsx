import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

const TodoItem = ({
  item,
  index,
  onDelete,
  onComplete,
  onEdit,
  isEditing,
  editedItem,
  onUpdateTitle,
  onUpdateDescription,
  onUpdateTodo
}) => {
  // Render the edit form if the item is being edited
  if (isEditing) {
    return (
      <div className='bg-brandBlue p-4 text-black flex flex-col mb-4' key={index}>
        <input
          placeholder='Updated Title'
          onChange={(e) => onUpdateTitle(e.target.value)} // Update title handler
          value={editedItem.title}
          className="border p-2 mb-2 rounded"
        />
        <textarea
          placeholder='Updated Description'
          rows={4}
          onChange={(e) => onUpdateDescription(e.target.value)} // Update description handler
          value={editedItem.description}
          className="border p-2 mb-2 rounded text-white"
        />
        <button
          type="button"
          onClick={onUpdateTodo} // Handler to update the todo item
          className="bg-brandPaleBlue text-brandBlue py-2 px-4 mt-4 self-center cursor-pointer hover:bg-green-600"
        >
          Update
        </button>
      </div>
    );
  }

  // Render the todo item
  return (
    <div className="bg-brandPaleBlue rounded-xl flex justify-between items-center p-6 mb-4 shadow-lg lg:flex-row flex-col" key={index}>
      <div className='text-center px-16 py-3 rounded-lg mb-5 lg:mb-0'>
        <h3 className="text-green-500 font-bold text-lg">{item.title}</h3>
        <p className="text-gray-400 mt-2">{item.description}</p>
      </div>
      <div className="flex items-center px-7 py-5 rounded-xl">
        {/* Delete icon to delete the todo item */}
        <AiOutlineDelete
          className="text-2xl cursor-pointer text-red-500 hover:text-red-600 animation-for-icons"
          onClick={() => onDelete(index)}
          title="Delete?"
        />
        {/* Complete icon to mark the todo item as completed */}
        <BsCheckLg
          className="text-xl cursor-pointer text-green-500 ml-4 hover:text-green-600 animation-for-icons"
          onClick={() => onComplete(index)}
          title="Complete?"
        />
        {/* Edit icon to edit the todo item */}
        <AiOutlineEdit
          className="text-xl cursor-pointer text-blue-500 ml-4 hover:text-blue-600 animation-for-icons"
          onClick={() => onEdit(index, item)}
          title="Edit?"
        />
      </div>
    </div>
  );
};

export default TodoItem;
