import Link from "next/link"

const Footer = () => {
    return (
        <Link href="/" className="print:hidden h-[3.2vh] font-normal w-full bg-[#449690] text-black text-sm italic border-t border-l flex justify-end items-center border-gray-300 px-2 hover:underline">
            Terms & Conditions
        </Link>
    )
}

export default Footer
