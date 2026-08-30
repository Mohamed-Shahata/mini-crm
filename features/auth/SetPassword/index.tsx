"use client";
import Image from "next/image";
import Form from "./components/Form";

export default function SetPassword() {
  return (
    <div className=" bg-background h-dvh flex justify-center items-center ">
      <div className="p-7 bg-[#FBFCFF] w-full h-full lg:h-fit  lg:w-xl text-center shadow-2xl rounded-3xl shadow-primary/70 flex items-center lg:items-start">
        <div className="max-w-md mx-auto h-fit">
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
              Set Your Password
            </h2>
          </div>

          <Form />
        </div>
      </div>
    </div>
  );
}
