"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserContext() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, department")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    uid: data.id,
    name: data.full_name,
    role: data.role,
    department: data.department,
  };
}

export async function getMyProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
