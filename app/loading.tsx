import Image from 'next/image'

export default function loading() {
  return (
    <div className="h-dvh w-full bg-[#EFEFFD] flex justify-center items-center text-center">
      <div>
        <Image src="/logo.svg" alt="logo" width={200} height={100} />
        <div className="border-2 border-transparent mx-auto mb-2 border-r-[#5B5FEF] rounded-full w-14 h-14 animate-spin"></div>
        <h3 className="text-xl font-normal text-[#8F8F8F]">
          Loading Please Wait ....
        </h3>
      </div>
    </div>
  )
}
