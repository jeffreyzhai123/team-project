"use client";
import style from "./page.module.scss";
import Header from "../components/Header/index";
import Landing from "../components/Landing/index";

export default function Home() {

  return (
    <div className={style.main}>
      <Header />
      <Landing />
    </div>
  );
}
