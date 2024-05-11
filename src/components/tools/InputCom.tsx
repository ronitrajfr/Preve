import React from "react";

export const InputCom = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <input
      name="inputThing"
      type="text"
      id="password"
      className="bg-gray-50 border-2 border-orange-400 text-black text-sm rounded-lg focus:border-orange-500 p-2.5 w-[700px]"
      placeholder="Message Preve..."
      required
      {...props}
    />
  );
};
