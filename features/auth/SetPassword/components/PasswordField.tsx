import { FieldError, UseFormRegister } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { InputsFormSetPassword } from "../types";

export default function PasswordField({
  label,
  fieldName,
  showPassword,
  setShowPassword,
  register,
  error,
}: {
  label: string;
  fieldName: "password" | "confirmPassword";
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  register: UseFormRegister<InputsFormSetPassword>;
  error?: FieldError;
}) {
  return (
    <div>
      <fieldset
        className={`rounded-sm border ${error ? "border-danger animate-pulse" : "border-gray-400"}  py-2 w-full `}
      >
        <legend
          className={`text-sm font-medium text-start ml-4 ${error ? "bg-danger/20 text-danger" : "bg-button/20 text-primary "} rounded-md px-2 py-1`}
        >
          {label}
        </legend>
        <div className="flex  gap-2 items-center px-4">
          <input
            type={showPassword ? "text" : "password"}
            className="h-full flex-1 outline-none text-lg"
            placeholder="••••••••"
            {...register(fieldName)}
          />

          {!showPassword && (
            <IoEyeOffOutline
              className="text-[#757575] text-2xl cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          )}
          {showPassword && (
            <IoEyeOutline
              className="text-[#757575] text-2xl cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          )}
        </div>
      </fieldset>
      <p className="text-xs mt-1 text-start text-danger h-4 animate-pulse">
        {error?.message}
      </p>
    </div>
  );
}
