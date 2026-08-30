import Link from "next/link";

export default function Buttons() {
  return (
    <>
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
        <Link
          href={"/login"}
          className="text-lg lg:text-xl w-full lg:w-fit font-normal text-success border border-success py-2 px-4 lg:py-4 lg:px-6 rounded-sm"
        >
          Back to login
        </Link>
      </div>
    </>
  );
}
