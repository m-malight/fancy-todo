import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

export default function PopUp({
  data,
  visible,
  onUpdateImportant,
  onDelete,
  onComplete,
  onEdit,
}) {
  return (
    <div
      className={`${
        !visible && "hidden"
      } flex flex-col gap-3 z-[99] absolute py-3 px-4 top-[90%] right-2 bg-[#F0E3E1] rounded-lg`}
    >
      <div
        onClick={onEdit}
        className="flex items-center cursor-default gap-3 py-1"
      >
        <MdModeEditOutline size={20} color="#666666" />
        <h2 className="font-medium text-[#454451]">Edit task</h2>
      </div>
      <div
        onClick={() => onComplete(data.id)}
        className="flex items-center cursor-default gap-3 py-1"
      >
        {data.completed ? (
          <FaRegCircle size={20} color="#666666" />
        ) : (
          <FaRegCircleCheck size={20} color="#666666" />
        )}
        <h2 className="font-medium text-[#454451]">
          Mark as {data.completed ? "not completed" : "completed"}
        </h2>
      </div>
      <div
        onClick={() => onUpdateImportant(data.id)}
        className="flex gap-3 py-1 cursor-default"
      >
        {data.important ? (
          <FaRegStar size={20} color="#666666" />
        ) : (
          <FaStar size={20} color="#666666" />
        )}
        <h2 className="font-medium text-[#454451]">
          Mark as {data.important ? "not important" : "important"}
        </h2>
      </div>
      <div
        onClick={() => onDelete(data.id)}
        className="flex items-center cursor-default gap-3 py-1"
      >
        <RiDeleteBin6Fill size={24} color="#B21B1B" />
        <h2 className="font-medium text-[#B21B1B]">Delete task</h2>
      </div>
    </div>
  );
}
