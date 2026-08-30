'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema } from "../schema";
import EmailInput from "./EmailInput";
import Buttons from "./Buttons";

export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = (data: { email: string }) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <EmailInput register={register} errorMessage={errors.email?.message}/>

   

      <Buttons/>
    </form>
  );
}
