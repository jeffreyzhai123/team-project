"use client";
import style from "./page.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../animation";
import Body from "./Body";
import Footer from "./Footer";
import Icon from "./Icon";

const links = [
  {
    title: "Home",
    href: "/",
    src: "meeting.png",
  },
  {
    title: "Shop",
    href: "/",
    src: "meeting.png",
  },
  {
    title: "About Us",
    href: "/",
    src: "meeting.png",
  },
  {
    title: "Lookbook",
    href: "/",
    src: "meeting.png",
  },
  {
    title: "Contact",
    href: "/",
    src: "meeting.png",
  },
];

export default function Nav() {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={style.nav}
    >
      <div className={style.wrapper}>
        <div className={style.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
          <Footer />
        </div>
        <Icon
          src={links[selectedLink.index].src}
          isActive={selectedLink.isActive}
        />
      </div>
    </motion.div>
  );
}
