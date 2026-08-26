import Image from "next/image";

export default function page() {
  return (
    <div className=" bg-background min-h-dvh flex justify-center items-center ">
      <div className="p-7 bg-[#FBFCFF] w-full h-dvh lg:h-fit  lg:w-xl text-center shadow-2xl rounded-3xl shadow-primary/70 flex items-center lg:items-start">
        <div className="w-full lg:w-md mx-auto">
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

          {/* FORM */}

          <div className="mt-6">
            <fieldset
              className={`rounded-sm border border-gray-400 py-2 w-full `}
            >
              <legend
                className={`text-sm font-medium text-start ml-4 bg-button/20 text-primary rounded-md px-2 py-1`}
              >
                Email
              </legend>
              <input
                type="text"
                className="h-full w-full outline-none  px-4 text-lg"
                placeholder="name@company.com"
              />
            </fieldset>
            <p className="text-xs text-start text-danger h-4 animate-pulse"></p>
          </div>

          <div className="mt-2 lg:mt-4">
            <h4 className="text-sm lg:text-xl font-normal">00:00</h4>
            <h4 className="py-2 text-sm lg:text-xl font-normal text-primary">
              Haven’t got the email yet?{" "}
              <span className="text-success">Resend email</span>
            </h4>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6 mt-2">
            <button className="text-lg lg:text-xl w-full lg:w-fit font-semibold bg-primary py-2 px-4 lg:py-4 lg:px-8 text-white rounded-sm">
              Send reset email
            </button>
            <button className="text-lg lg:text-xl w-full lg:w-fit font-normal text-success border border-success py-2 px-4 lg:py-4 lg:px-6 rounded-sm">
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
