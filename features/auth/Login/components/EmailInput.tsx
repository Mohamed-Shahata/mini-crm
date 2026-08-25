import { FieldError, UseFormRegister } from "react-hook-form";
import { InputsFormLogin } from "../types";

export default function EmailInput({
  register,
  error,
}: {
  register: UseFormRegister<InputsFormLogin>;
  error?: FieldError;
}) {
  return (
    <div className="mb-4">
      <fieldset
        className={`rounded-sm border ${error ? "border-danger animate-pulse" : "border-gray-400"} py-2 w-full `}
      >
        <legend
          className={`text-sm font-medium text-start ml-4 ${error ? "bg-danger/20 text-danger" : "bg-button/20 text-primary "} rounded-md px-2 py-1`}
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
        {error?.message}
      </p>
    </div>
  );
}
