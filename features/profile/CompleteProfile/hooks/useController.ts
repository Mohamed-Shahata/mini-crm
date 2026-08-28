import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeProfileSchema } from "../schema";
import { InputsFormCompleteProfile } from "../types";
import useCompleteProfile from "./useCompleteProfile";
import { toast } from "react-toastify";

export default function useController() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsFormCompleteProfile>({
    mode: "onChange",
    resolver: zodResolver(completeProfileSchema),
  });

  const {
    mutate: handleMutateCompleteProfile,
    isPending: isLoadingCompleteProfile,
  } = useCompleteProfile();

  const onSubmit = async (data: InputsFormCompleteProfile) => {
    const { firstName, lastName, phone } = data;
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("phone", phone);

    handleMutateCompleteProfile(form, {
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoadingCompleteProfile,
  };
}
