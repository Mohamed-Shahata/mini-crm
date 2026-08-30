"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { completeProfileSchema } from "@/lib/validations/profile";
import { validateAvatarFile, replaceAvatarFile } from "@/lib/storage/avatar";

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
    .select(
      "id, first_name, last_name, role, department, phone, age, avatar_url",
    )
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    uid: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: user.email,
    role: data.role,
    department: data.department,
    phone: data.phone,
    age: data.age,
    avatarUrl: data.avatar_url,
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

  return { ...data, email: user.email };
}

export async function completeProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Session expired. Please log in again.");
  }

  const parsed = completeProfileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    age: formData.get("age"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid data");
  }

  const { firstName, lastName, phone, age } = parsed.data;

  // Avatar is optional on complete-profile — only validate/upload if provided.
  const avatar = formData.get("avatar");
  let avatarUrl: string | null = null;
  let uploadedFilePath: string | null = null;

  if (avatar && avatar instanceof File && avatar.size > 0) {
    const validationError = validateAvatarFile(avatar);
    if (validationError) {
      throw new Error(validationError);
    }

    const uploaded = await replaceAvatarFile(supabase, user.id, avatar);
    avatarUrl = uploaded.publicUrl;
    uploadedFilePath = uploaded.filePath;
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      phone,
      age,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
      first_login: false,
    })
    .eq("id", user.id);

  if (error) {
    if (uploadedFilePath) {
      await supabase.storage.from("avatars").remove([uploadedFilePath]);
    }
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
