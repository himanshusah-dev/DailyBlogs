import React from "react";
export default function Input({ obj, onChange, index }) {
  const { label, type, value } = obj;
  return (
    <div className="  flex flex-row justify-between gap-2 w-full p-4">
      <label className="text-red-500 text-2xl">{label}</label>
      <div className=" text-2xl border-blue-600">
        <input
          type={type || "text"}
          id={label}
          value={value || ""}
          onChange={(e) => onChange(e, index)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
