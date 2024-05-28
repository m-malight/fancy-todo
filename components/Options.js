"use client";
import React, { useEffect, useRef, useState } from "react";
import PopUp from "./PopUp";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

export default function Options({
  data,
  visible,
  setVIndex,
  onUpdateValue,
  onUpdateImportant,
  onDelete,
  onComplete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);
  const [value, setValue] = useState();

  const handleUpdate = () => {
    onUpdateValue(data.id, value);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => ref.current.focus(), 200);
  };

  useEffect(() => {
    setValue(data.value);
  }, [data]);
  return (
    <div
      className={`relative flex items-center justify-between px-4 py-3 gap-3 rounded-lg ${
        isEditing && " border-black border-2 "
      } bg-[#FDD2D2]`}
    >
      <div>
        {data.completed ? (
          <FaCircleCheck size={24} className="rounded-full" />
        ) : (
          <FaRegCircleCheck
            size={24}
            color="#626997"
            className="rounded-full border-none"
          />
        )}
      </div>
      {isEditing ? (
        <input
          ref={ref}
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="w-full outline-none bg-[#FDD2D2]"
        />
      ) : (
        <p
          className={`${
            data.completed && "line-through text-[#626997]"
          } w-full bg-[#FDD2D2] font-medium`}
        >
          {data.value}
        </p>
      )}

      {isEditing && (
        <div onClick={handleUpdate}>
          <IoIosCheckmark color="#626997" size={30} />
        </div>
      )}
      <div onClick={() => !isEditing && onUpdateImportant(data.id)}>
        {data.important ? (
          <FaStar color="#E4B254" />
        ) : (
          <FaRegStar color="#626997" />
        )}
      </div>
      <div
        id="pop"
        onClick={(e) => {
          e.stopPropagation();
          setVIndex(data.id);
        }}
      >
        <BsThreeDots color="#626997" />
      </div>
      <PopUp
        data={data}
        visible={visible}
        onComplete={onComplete}
        onDelete={onDelete}
        onEdit={handleEdit}
        onUpdateImportant={onUpdateImportant}
      />
    </div>
  );
}
