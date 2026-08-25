import { redirect } from "next/navigation";
import { getMyProfile } from "@/app/actions/profile";
import CompleteProfile from "@/features/profile/CompleteProfile";

export default async function Page() {
  const profile = await getMyProfile();

  if (!profile.first_login) {
    redirect("/dashboard");
  }

  return <CompleteProfile />;
}
