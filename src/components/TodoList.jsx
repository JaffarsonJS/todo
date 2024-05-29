import React from 'react';
import TodoItem from './TodoItem';
import { AiOutlineDelete } from 'react-icons/ai';

const TodoList = ({
  todos,
  completedTodos,
  onDelete,
  onComplete,
  onEdit,
  currentEdit,
  currentEditedItem,
  handleUpdateTitle,
  handleUpdateDescription,
  handleUpdateTodo,
  isCompleteScreen
}) => {
  return (
    <div className="flex flex-col">
      {/* Render the list of todos if not on the completed screen */}
      {isCompleteScreen === false &&
        todos.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            index={index}
            onDelete={onDelete}
            onComplete={onComplete}
            onEdit={onEdit}
            isEditing={currentEdit === index} // Pass down whether this item is being edited
            editedItem={currentEditedItem} // Pass down the current edited item details
            onUpdateTitle={handleUpdateTitle} // Handler to update the title
            onUpdateDescription={handleUpdateDescription} // Handler to update the description
            onUpdateTodo={handleUpdateTodo} // Handler to update the todo
          />
        ))}

      {/* Render the list of completed todos if on the completed screen */}
      {isCompleteScreen === true &&
        completedTodos.map((item, index) => (
          <div className="flex justify-between items-center p-4 mb-4 shadow-lg bg-brandPaleBlue" key={index}>
            <div className='px-6 py-3 rounded-lg'>
              <h3 className="text-green-500 font-bold text-lg">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.description}</p>
              <p className="text-gray-400 mt-2"><small>Completed on: {item.completedOn}</small></p>
            </div>
            <div>
              {/* Delete icon to remove the completed todo item */}
              <AiOutlineDelete
                className="bg-brandPaleBlue text-2xl cursor-pointer text-red-500 hover:text-red-600 animation-for-icons"
                onClick={() => onDelete(index, true)}
                title="Delete?"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
