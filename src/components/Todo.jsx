import React, { useState, useEffect } from 'react';

// Import custom components and icons
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck } from 'react-icons/md';

const Todo = () => {
  // State to toggle between Todo and Completed screens
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  // State to store all todo items
  const [allTodos, setTodos] = useState([]);
  // State to store completed todo items
  const [completedTodos, setCompletedTodos] = useState([]);
  // State to track the index of the todo item being edited
  const [currentEdit, setCurrentEdit] = useState(null);
  // State to store the current edited item details
  const [currentEditedItem, setCurrentEditedItem] = useState({});

  // Handler to add a new todo item
  const handleAddTodo = (newTodoItem) => {
    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    // Save updated todo list to localStorage
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  // Handler to delete a todo item
  const handleDeleteTodo = (index, isCompleted = false) => {
    const todos = isCompleted ? completedTodos : allTodos;
    const reducedTodo = todos.filter((_, i) => i !== index);

    if (isCompleted) {
      setCompletedTodos(reducedTodo);
      // Save updated completed todo list to localStorage
      localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    } else {
      setTodos(reducedTodo);
      // Save updated todo list to localStorage
      localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    }
  };

  // Handler to mark a todo item as completed
  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const filteredItem = { ...allTodos[index], completedOn };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    // Save updated completed todo list to localStorage
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  // Effect to load saved todo and completed items from localStorage on component mount
  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  // Handler to initiate editing of a todo item
  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  // Handler to update the title of the current edited item
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, title: value }));
  };

  // Handler to update the description of the current edited item
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, description: value }));
  };

  // Handler to update the todo item in the list
  const handleUpdateToDo = () => {
    const newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit(null);
    // Save updated todo list to localStorage
    localStorage.setItem('todolist', JSON.stringify(newToDo));
  };

  return (
    <div className=" flex flex-col items-center ">
      <h1 className="text-4xl font-bold my-6 text-brandPaleBlue">My Todos</h1>

      <div className="container p-8 lg:w-full lg:max-w-3xl w-full max-w-lg mx-auto rounded-lg drop-shadow-2xl  ">
        
        {/* Component for adding a new todo item */}
        <TodoInput onAddTodo={handleAddTodo} />

        {/* Buttons to switch between Todo and Completed screens */}
        <div className="flex justify-center gap-10 mb-6">
          <button
            className='  py-2 px-6 flex items-center gap-2 '
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
            <MdOutlinePlaylistAdd  className="bg-brandPaleBlue text-xl " />
          </button>
          <button
            className=' py-2 px-4 flex items-center gap-2 '
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
            <MdOutlinePlaylistAddCheck  className="bg-brandPaleBlue text-xl" />
          </button>
        </div>

        {/* Component to display the list of todos or completed todos */}
        <TodoList
          todos={allTodos}
          completedTodos={completedTodos}
          onDelete={handleDeleteTodo}
          onComplete={handleComplete}
          onEdit={handleEdit}
          currentEdit={currentEdit}
          currentEditedItem={currentEditedItem}
          handleUpdateTitle={handleUpdateTitle}
          handleUpdateDescription={handleUpdateDescription}
          handleUpdateTodo={handleUpdateToDo}
          isCompleteScreen={isCompleteScreen}
        />
      </div>
    </div>
  );
};

export default Todo;
