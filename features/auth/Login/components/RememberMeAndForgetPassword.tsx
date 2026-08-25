import Link from "next/link";

export default function RememberMeAndForgetPassword() {
  return (
    <div className="flex justify-between items-center lg:mt-2 mb-6">
      <div className="flex items-center gap-1 text-sm font-normal text-[#364153]">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Remember me</label>
      </div>

      <Link href="/" className="text-xs font-medium text-primary underline ">
        Forgot Password?
      </Link>
    </div>
  );
}
