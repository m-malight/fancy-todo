"use client";
import React, { useEffect, useState } from "react";
import Options from "./Options";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

export default function Todo() {
  const [task, setTask] = useState([
    { id: 1, value: "Check mail", important: false, completed: false },
    {
      id: 2,
      value: "Read about uzoukwu chinagorom",
      important: true,
      completed: false,
    },
  ]);
  const [important, setImportant] = useState([]);
  const [notImportant, setNotImportant] = useState([]);
  const [vIndex, setVIndex] = useState(null);
  const [value, setValue] = useState("");

  const handleImportantUpdate = (id) => {
    const newTask = task.map((i) => {
      if (i.id == id) i.important = !i.important;
      return i;
    });
    setTask(newTask);
  };

  const handleValueUpdate = (id, value) => {
    const newTask = task.map((i) => {
      if (i.id == id) i.value = value;
      return i;
    });
    setTask(newTask);
  };

  const handleAdd = (value) => {
    if (value !== "") {
      const id = (task[task.length - 1]?.id || 0) + 1;
      const todo = { id, value, important: false, completed: false };
      setTask([...task, todo]);
      setValue("");
    }
  };

  const handleDelete = (id) => {
    const newTask = task.filter((i) => i.id != id);
    setTask(newTask);
  };

  const handleCompleted = (id) => {
    const newTask = task.map((i) => {
      if (i.id == id) i.completed = !i.completed;
      return i;
    });
    setTask(newTask);
  };

  const useEnter = (e) => {
    if (e.key == "Enter") {
      handleAdd(value);
      e.target.blur();
    }
  };

  useEffect(() => {
    const newImportant = task.filter((i) => i.important == true);
    const newNotImportant = task.filter((i) => i.important == false);
    setImportant(newImportant);
    setNotImportant(newNotImportant);
  }, [task]);
  return (
    <div
      onClick={() => setVIndex(null)}
      className="flex flex-col items-center h-screen bg-[url('https://todo-app.replit.app/assets/bg.ec602496.png')]"
    >
      <div className="flex flex-col gap-y-8 w-[90vw] md:w-[70vw] h-screen">
        <div className="flex justify-center items-center gap-4 py-4 md:py-[1.2vw]">
          <FaCircleCheck
            size={40}
            className="rounded-full shadow-md shadow-[#C8ADF4]"
          />
          <h2 className="font-bold text-3xl">Todo App</h2>
        </div>
        <div className="flex flex-col gap-y-8 h-[68vh] overflow-y-scroll remove-scrollbar">
          {important.length > 0 && (
            <div>
              <h2 className="font-bold text-2xl pb-4">Important</h2>
              <div className="flex flex-col gap-y-6">
                {important.map((i, key) => (
                  <Options
                    key={key}
                    data={i}
                    visible={vIndex == i.id}
                    setVIndex={setVIndex}
                    onUpdateValue={handleValueUpdate}
                    onComplete={handleCompleted}
                    onUpdateImportant={handleImportantUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="pb-10">
            <h2 className="font-bold text-2xl pb-4">Tasks</h2>
            {notImportant.length > 0 ? (
              <div className="flex flex-col gap-y-4">
                {notImportant.map((i, key) => (
                  <Options
                    key={key}
                    data={i}
                    visible={vIndex == i.id}
                    setVIndex={setVIndex}
                    onUpdateValue={handleValueUpdate}
                    onComplete={handleCompleted}
                    onUpdateImportant={handleImportantUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              task.length == 0 && (
                <div className="flex justify-center">No todo items yet</div>
              )
            )}
          </div>
        </div>
        <div className="flex rounded-lg">
          <input
            type="text"
            value={value}
            onKeyUp={useEnter}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What do you need to do?"
            className="w-full px-2 rounded-l-lg bg-[#FDD2D2] placeholder:font-semibold"
          />
          <div
            onClick={() => handleAdd(value)}
            className="flex bg-[#2C3046] items-center text-white py-3 px-6 gap-4 rounded-r-lg"
          >
            <IoMdAdd color="white" size={24} />
            <p>Add</p>
          </div>
        </div>
      </div>
    </div>
  );
}
