"use client";
import style from "./page.module.scss";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { opacity, background } from "./animation";
import Nav from "./nav";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={style.header}>
      <div className={style.bar}>
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={style.el}
        >
          <div
            className={`${style.burger} ${isActive ? style.burgerActive : ""}`}
          ></div>
          <div className={style.label}>
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
            >
              Menu
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              Close
            </motion.p>
          </div>
        </div>
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className={style.shopContainer}
        >
          <div className={style.el}>
            <LoginLink>
              <p>Log In</p>
            </LoginLink>
          </div>
          <div className={style.el}>
            <RegisterLink>
              <p>Get Started</p>
            </RegisterLink>
          </div>
        </motion.div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={style.background}
      ></motion.div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </div>
  );
}
