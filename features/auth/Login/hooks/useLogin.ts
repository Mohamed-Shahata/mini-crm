import { login } from "@/app/actions/auth";
import { useMutation } from "@tanstack/react-query";

export default function useLogin(){
    return useMutation({
        mutationFn: login
    })
}