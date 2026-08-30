"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_login")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  revalidatePath("/", "layout");

  if (profile.first_login) {
    redirect("/complete-profile");
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
