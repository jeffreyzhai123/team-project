"use client";
import style from "./page.module.scss"
import Header from "../components/Header/index"

export default function Home() {
  return (
    <div className={style.main}>
      <Header />
    </div>
  );
}
