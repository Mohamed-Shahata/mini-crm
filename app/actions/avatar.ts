"use server";

import { createClient } from "@/lib/supabase/server";
import { validateAvatarFile, replaceAvatarFile } from "@/lib/storage/avatar";
import { revalidatePath } from "next/cache";

export async function uploadAvatar(formData: FormData) {
  const avatar = formData.get("avatar");

  const validationError = validateAvatarFile(avatar);
  if (validationError) {
    throw new Error(validationError);
  }

  const file = avatar as File;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Session expired. Please log in again.");
  }

  const { filePath, publicUrl } = await replaceAvatarFile(
    supabase,
    user.id,
    file,
  );

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    // Keep storage consistent with the DB if the profile update fails.
    await supabase.storage.from("avatars").remove([filePath]);
    throw new Error(updateError.message);
  }

  revalidatePath("/", "layout");

  return { avatarUrl: publicUrl };
}
