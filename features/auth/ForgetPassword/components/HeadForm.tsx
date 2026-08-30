import Image from "next/image";

export default function HeadForm() {
  return (
    <>
      {/* HEAD */}
      <div>
        <Image
          src="/logo.svg"
          alt="logo"
          width={120}
          height={40}
          className="mx-auto -mb-8"
        />

        <h2 className="text-primary text-center font-semibold mt-2 text-xl">
          Forgot Password?
        </h2>
      </div>
    </>
  );
}
