"use client";
import style from "./page.module.scss";
import Header from "../components/Header/index";
import Landing from "../components/Landing/index";
import Preloader from "../components/Preloader/index";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
      requestAnimationFrame(raf);
    }, 2000);
  }, []);

  return (
    <div className={style.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Header />
      <Landing />
    </div>
  );
}
