import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema";
import { InputsFormLogin } from "../types";
import useLogin from "./useLogin";
import { toast } from "react-toastify";

export default function useController() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsFormLogin>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const { mutate: handleMutateLogin, isPending: isLoadingLogin } = useLogin();

  const onSubmit = async (data: InputsFormLogin) => {
    const { email, password } = data;
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    handleMutateLogin(form, {
      onSuccess: () => {
        reset();
        toast.success("login is success");
      },
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
    isLoadingLogin,
  };
}
