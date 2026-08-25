"use client";
import Form from "./components/Form";

export default function SetPassword() {
  return (
    <div className=" bg-background min-h-dvh flex justify-center items-center ">
      <div className="p-7 bg-[#FBFCFF] w-full h-dvh lg:h-149  lg:w-xl text-center shadow-2xl rounded-3xl shadow-primary/70 flex items-center lg:items-start">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Set Your Password</h2>

          <Form />
        </div>
      </div>
    </div>
  );
}
