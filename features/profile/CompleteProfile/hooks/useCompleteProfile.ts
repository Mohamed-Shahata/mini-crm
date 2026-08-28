import { completeProfile } from "@/app/actions/profile";
import { useMutation } from "@tanstack/react-query";

export default function useCompleteProfile() {
  return useMutation({
    mutationFn: completeProfile,
  });
}
