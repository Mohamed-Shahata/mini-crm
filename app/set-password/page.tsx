import { createClient } from "@/lib/supabase/server";
import SetPassword from "@/features/auth/SetPassword";
import InvalidLinkNote from "@/features/auth/SetPassword/components/InvalidLinkNote";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <InvalidLinkNote />;
  }

  return <SetPassword />;
}
