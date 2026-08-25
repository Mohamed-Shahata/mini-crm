"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function inviteUser(email: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/set-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function setPassword(formData: FormData) {
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Session expired. Please request a new invite link.");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw new Error(error.message);
  }

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login?message=password_set");
}
