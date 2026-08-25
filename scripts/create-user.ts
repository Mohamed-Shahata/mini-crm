/**
 * Script to create a new user (auth.users + profiles) as an admin action.
 *
 * Usage:
 *   Edit the values in NEW_USER below, then run:
 *   npx tsx scripts/create-user.ts
 *
 * Requirements:
 *   - .env.local must contain SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

// ============================================
// Edit these values each time you need to create a user
// ============================================
const NEW_USER = {
  email: "employee@mini-crm.com",
  password: "TempPass123!",
  fullName: "Ahmed Test",
  role: "member" as "admin" | "manager" | "member",
  department: "frontend" as
    | "marketing"
    | "frontend"
    | "backend"
    | "full_stack"
    | "ui_ux"
    | "content",
};

const INVITED_BY_ADMIN_ID: string | null = null;

// ============================================

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log(`Creating user: ${NEW_USER.email} ...`);

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: NEW_USER.email,
      password: NEW_USER.password,
      email_confirm: true,
    });

  if (authError || !authData.user) {
    throw new Error(`Failed to create auth user: ${authError?.message}`);
  }

  const newUserId = authData.user.id;
  console.log(`Auth user created with id: ${newUserId}`);

  const { error: profileError } = await supabaseAdmin.from("profiles").insert({
    id: newUserId,
    full_name: NEW_USER.fullName,
    role: NEW_USER.role,
    department: NEW_USER.department,
    is_active: true,
    first_login: false,
    invited_by: INVITED_BY_ADMIN_ID,
  });

  if (profileError) {
    await supabaseAdmin.auth.admin.deleteUser(newUserId);
    throw new Error(
      `Failed to create profile, auth user rolled back: ${profileError.message}`,
    );
  }

  console.log("Profile created successfully ✅");
  console.log({
    id: newUserId,
    email: NEW_USER.email,
    password: NEW_USER.password,
    full_name: NEW_USER.fullName,
    role: NEW_USER.role,
    department: NEW_USER.department,
  });
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
