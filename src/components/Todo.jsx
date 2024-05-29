import React, { useState, useEffect } from 'react';

import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { MdOutlinePlaylistAdd, MdOutlinePlaylistAddCheck } from 'react-icons/md';

const Todo = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentEditedItem, setCurrentEditedItem] = useState({});

  const handleAddTodo = (newTodoItem) => {
    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index, isCompleted = false) => {
    const todos = isCompleted ? completedTodos : allTodos;
    const reducedTodo = todos.filter((_, i) => i !== index);

    if (isCompleted) {
      setCompletedTodos(reducedTodo);
      localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    } else {
      setTodos(reducedTodo);
      localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    }
  };

  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const filteredItem = { ...allTodos[index], completedOn };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

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

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, title: value }));
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, description: value }));
  };

  const handleUpdateToDo = () => {
    const newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit(null);
    localStorage.setItem('todolist', JSON.stringify(newToDo));
  };

  return (
    <div className=" flex flex-col items-center ">
      <h1 className="text-4xl font-bold my-6 text-brandPaleBlue">My Todos</h1>

      <div className="container p-8 lg:w-full lg:max-w-3xl w-full max-w-lg mx-auto rounded-lg drop-shadow-2xl  ">
        
        {/* TODO INPUT COMPONENT */}
        <TodoInput onAddTodo={handleAddTodo} />

        {/* TODO AND COMPLETED BUTTOM */}
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

        {/* TODO LIST COLLECTION */}
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
