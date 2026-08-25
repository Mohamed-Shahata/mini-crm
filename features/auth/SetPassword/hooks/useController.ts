import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema } from "../schema";
import { InputsFormSetPassword } from "../types";
import useSetPassword from "./useSetPassword";
import { toast } from "react-toastify";

export default function useController() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsFormSetPassword>({
    mode: "onChange",
    resolver: zodResolver(setPasswordSchema),
  });

  const { mutate: handleMutateSetPassword, isPending: isLoadingSetPassword } =
    useSetPassword();

  const onSubmit = async (data: InputsFormSetPassword) => {
    const { password } = data;
    const form = new FormData();
    form.append("password", password);

    handleMutateSetPassword(form, {
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    isLoadingSetPassword,
  };
}
