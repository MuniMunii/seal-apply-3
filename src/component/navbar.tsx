import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LogoKini from "../assets/logo"
type IsActiveNav=''|'terbaru'|'hiburan'|'lifestyle'|'olahraga'|'nasional'|'internasional'
export default function Navbar() {
  const [changeBGWhenInTop, setChangeBGWhenInTop] = useState(true);
    const [isActive, setIsActive] = useState<IsActiveNav>('');
  const { scrollY } = useScroll();
  const navbarRef = useRef(0);
    const location = useLocation();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 0) {
      setChangeBGWhenInTop(false);
    } else {
      setChangeBGWhenInTop(true);
    }
    navbarRef.current = latest;
  });
  // useEffect animation active
    useEffect(() => {
      const extractPath = location.pathname.split("/");
  const hash = location.hash.replace("#", "");
  if (hash) {
    setIsActive(hash as IsActiveNav);
  } else if (extractPath[extractPath.length - 1] as IsActiveNav) {
    setIsActive(extractPath[extractPath.length - 1] as IsActiveNav);
  } else {
    setIsActive("");
  }
    }, [location.pathname,location.hash]);
    useEffect(()=>{console.log(isActive)},[isActive])
  return (
    <motion.div
      initial={{ backgroundColor:'#fff',color:'#828282',borderBottom:'solid 1px #f2f2f2' }}
      animate={{ backgroundColor: changeBGWhenInTop ? '#0090FF' : '#fff',color: changeBGWhenInTop ? '#F2F2F2' : '#828282',borderBottom: changeBGWhenInTop ? 'transparent' : 'solid 1px #f2f2f2'}}
      transition={{
        opacity: { ease: "easeInOut", duration: 0.45 },
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="z-50 w-full py-[33px] px-[72px] fixed top-0 left-0 border-b  flex justify-between items-center"
    >
      <div className={`transition duration-200 ${changeBGWhenInTop?'filter brightness-0 invert-[1]':''}`}>
        <LogoKini/>
      </div>
      <div className="flex gap-8">
        <Link className={`${isActive===""?`${changeBGWhenInTop?'text-white':'text-button-primary'}`:''}`} to={"/"}>Beranda</Link>
        <Link className={`${isActive==="terbaru"?`${changeBGWhenInTop?'text-white':'text-button-primary'}`:''}`} to={"#terbaru"}>Terbaru</Link>
        <Link className={`${isActive==="hiburan"?`${changeBGWhenInTop?'text-white':'text-button-primary'}`:''}`} to={"#hiburan"}>Hiburan</Link>
        <Link className={`${isActive==="lifestyle"?`${changeBGWhenInTop?'text-white':'text-button-primary'}`:''}`} to={"#lifestyle"}>Gaya Hidup</Link>
        <Link className={`${isActive==="olahraga"?`${changeBGWhenInTop?'text-white':'text-button-primary'}`:''}`} to={"#olahraga"}>Olahraga</Link>
        <Link className={`${isActive==="nasional"?`${changeBGWhenInTop?'text-white':'text-button-primary'}`:''}`} to={"#nasional"}>Nasional</Link>
        <Link className={`${isActive==="internasional"?`${changeBGWhenInTop?'text-white':'text-button-primary'}`:''}`} to={"#internasional"}>Internasional</Link>
      </div>
    </motion.div>
  );
}
