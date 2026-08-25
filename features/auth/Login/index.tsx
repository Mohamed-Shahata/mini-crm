"use client";
import HeadLoginCard from "./components/HeadLoginCard";
import Note from "./components/Note";
import From from "./components/From";

export default function Login() {
  return (
    <div className=" bg-background min-h-dvh flex justify-center items-center ">
      <div className="p-7 bg-[#FBFCFF] w-full h-dvh lg:h-149  lg:w-xl text-center shadow-2xl rounded-3xl shadow-primary/70 flex items-center lg:items-start">
        <div className="max-w-md mx-auto">
          <HeadLoginCard />

          <From />

          <Note />
        </div>
      </div>
    </div>
  );
}
