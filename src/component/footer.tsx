import { Link } from "react-router-dom"
import LogoKini from "../assets/logo"
import { FaYoutube,FaInstagram,FaFacebook, FaPaperPlane } from "react-icons/fa6"
export default function Footer(){
    return <div className="w-full h-[449px] bg-[#2C3C4D] py-16 px-18 text-white">
        <div className="flex gap-18">
            <div className="flex flex-col w-[425px] h-[260px] justify-between">
                <div>
            <div className="filter brightness-0 invert-[1] w-[244px] h-[68px]">
            <LogoKini w="244" h={'68'}/>
            </div>
            <p className="mt-[22px]">&#169; 2025 Berita Kini. All Rights Reserved.</p>
            </div>
            <div className="flex flex-col gap-[22px]">
                <p className="text-[22px]">Ikuti Kami</p>
                <div className="flex gap-6">
                    <Link to={'#'}><FaYoutube className="text-2xl size-10 p-2 rounded-xl text-Gray1 bg-[#E0E0E0]"/></Link>
                    <Link to={'#'}><FaInstagram className="text-2xl size-10 p-2 rounded-xl text-Gray1 bg-[#E0E0E0]"/></Link>
                    <Link to={'#'}><FaFacebook className="text-2xl size-10 p-2 rounded-xl text-Gray1 bg-[#E0E0E0]"/></Link>
                </div>
            </div>
            </div>
            <div>
                <p className="text-[22px] mb-[22px]">Telusuri</p>
                <div className='flex flex-col gap-[10px]'>
                    <Link to={'#'}>Beranda</Link>
                    <Link to={'#'}>Kesehatan</Link>
                    <Link to={'#'}>Otomotif</Link>
                    <Link to={'#'}>Politik</Link>
                    <Link to={'#'}>Olahraga</Link>
                    <Link to={'#'}>Nasional</Link>
                    <Link to={'#'}>Internasional</Link>
                </div>
            </div>
            <div className="w-[189px]">
                <p className="text-[22px] mb-[22px]">Bantuan</p>
                <div className='flex flex-col gap-[10px]'>
                    <Link to={'#'}>Kontak Kami</Link>
                    <Link to={'#'}>Laporan Pembajakan</Link>
                    <Link to={'#'}>Kebijakan</Link>
                </div>
            </div>
            <div>
                <p className="text-[22px] mb-[22px]">Berlanganan Beria Baru</p>
                <label className="relative block w-fit" htmlFor="input-email">
  <input
    id="input-email"
    placeholder="Masukkan email"
    className="text-Gray1 w-[339px] h-16 rounded-[8px] p-4 pr-16 bg-white border border-[#E0E0E0]"
  />
  <button
    type="button"
    className="absolute top-1/2 right-2 -translate-y-1/2 size-12 bg-button-primary rounded-md flex items-center justify-center cursor-pointer"
  >
    <FaPaperPlane/>
  </button>
</label>
            </div>
        </div>
    </div>
}