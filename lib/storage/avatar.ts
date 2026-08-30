import { SupabaseClient } from "@supabase/supabase-js";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function validateAvatarFile(avatar: unknown): string | null {
  if (!(avatar instanceof File)) {
    return "Avatar is required";
  }
  if (avatar.size === 0) {
    return "Invalid file";
  }
  if (avatar.size > MAX_FILE_SIZE) {
    return "Avatar must be less than 5MB";
  }
  if (!ALLOWED_TYPES.includes(avatar.type)) {
    return "Only JPG, PNG and WEBP images are allowed";
  }
  return null;
}

/**
 * Replaces a user's avatar in the "avatars" bucket: removes any previous
 * file(s) in their folder, uploads the new one, and returns its public URL.
 * Does not touch the `profiles` table — callers are responsible for that.
 */
export async function replaceAvatarFile(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any, any, any>,
  userId: string,
  file: File,
) {
  const { data: existingFiles } = await supabase.storage
    .from("avatars")
    .list(userId);

  if (existingFiles && existingFiles.length > 0) {
    await supabase.storage
      .from("avatars")
      .remove(existingFiles.map((f) => `${userId}/${f.name}`));
  }

  const ext = EXT_BY_TYPE[file.type] ?? "jpg";
  const filePath = `${userId}/avatar-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      contentType: file.type,
      cacheControl: "3600",
    });

  if (uploadError) {
    throw new Error("Failed to upload image");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return { filePath, publicUrl };
}
