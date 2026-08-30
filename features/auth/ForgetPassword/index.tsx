import Image from "next/image";
import HeadForm from "./components/HeadForm";
import Form from "./components/Form";

export default function index() {
  return (
    <div className=" bg-background min-h-dvh flex justify-center items-center ">
      <div className="p-7 bg-[#FBFCFF] w-full h-dvh lg:h-fit  lg:w-xl text-center shadow-2xl rounded-3xl shadow-primary/70 flex items-center lg:items-start">
        <div className="w-full lg:w-md mx-auto">
          {/* HEAD */}
          <HeadForm />

          {/* FORM */}
          <Form />
        </div>
      </div>
    </div>
  );
}
