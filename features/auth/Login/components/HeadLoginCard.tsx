import Image from "next/image";

export default function HeadLoginCard() {
  return (
    <div>
      <Image
        src="/logo.svg"
        alt="logo"
        width={120}
        height={40}
        className="mx-auto -mb-8"
      />

      <h2 className="font-semibold text-lg lg:text-xl mb-1 text-[#101828]">
        Sign in to MiniCRM
      </h2>

      <p className="font-normal w-[70%] mx-auto text-[#6A7282] text-sm lg:text-sm">
        Use the credentials provided by your administrator.
      </p>
    </div>
  );
}
