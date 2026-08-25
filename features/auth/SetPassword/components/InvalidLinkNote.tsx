export default function InvalidLinkNote() {
  return (
    <div className="bg-background min-h-dvh flex justify-center items-center">
      <div className="p-7 bg-[#FBFCFF] w-full max-w-md text-center shadow-2xl rounded-3xl shadow-primary/70">
        <h2 className="text-xl font-semibold mb-2">The link is invalid.</h2>
        <p className="text-gray-500">
          This link has expired or has already been used. Please contact the
          admin to send a new invitation.
        </p>
      </div>
    </div>
  );
}
