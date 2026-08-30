import React from "react";
import { UseFormRegister } from "react-hook-form";

export default function EmailInput({register, errorMessage}: {register: UseFormRegister<{email: string}>, errorMessage?: string}) {
  return (
    <>
      <fieldset className={`rounded-sm border border-gray-400 py-2 w-full `}>
        <legend
          className={`text-sm font-medium text-start ml-4 bg-button/20 text-primary rounded-md px-2 py-1`}
        >
          Email
        </legend>
        <input
          {...register("email")}
          type="text"
          className="h-full w-full outline-none  px-4 text-lg"
          placeholder="name@company.com"
        />
      </fieldset>
      <p className="text-xs text-start text-danger h-4 animate-pulse">
        {errorMessage}
      </p>
    </>
  );
}
