import React from "react";

export const FormTextInput = ({
  name, 
  label, 
  validationMessage, 
  errors, 
  register,
}) => (
  <>
    <label className="text-xs leading-[2]">{label}</label>
    <input
      className="border-gray-100 border-2  rounded-lg leading-[2]"
      type="text"
      {...register}
    />
    { 
     errors[name] && 
      <span className="text-red-500 text-xs pt-2">{validationMessage}</span>
    }
  </>
)