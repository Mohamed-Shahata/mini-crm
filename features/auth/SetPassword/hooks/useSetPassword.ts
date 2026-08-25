import { setPassword } from "@/app/actions/users";
import { useMutation } from "@tanstack/react-query";

export default function useSetPassword() {
  return useMutation({
    mutationFn: setPassword,
  });
}
