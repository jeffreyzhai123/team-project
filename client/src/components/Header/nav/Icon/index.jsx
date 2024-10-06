import { motion } from "framer-motion";
import Image from "next/image";
import style from "./page.module.scss";
import { opacity } from "../../animation";

export default function Icon({ src, isActive }) {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className={style.imageContainer}
    >
      <Image src={`/images/${src}`} fill={true} alt="image" />
    </motion.div>
  );
}
