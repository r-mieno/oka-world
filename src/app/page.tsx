"use client";

import { useEffect, useState } from "react";
import Scene from "@/components/Scene";
import { scenes, FADE_DURATION } from "@/data/scenes";
import styles from "./page.module.css";

type Status = "idle" | "fadein" | "visible" | "fadeout" | "done";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    // フォントが読み込まれてから開始する
    document.fonts.ready.then(() => {
      setStatus("fadein");
    });
  }, []);

  useEffect(() => {
    if (status === "idle" || status === "done") return;

    const current = scenes[index];

    if (status === "fadein") {
      // フェードイン開始直後にvisibleへ（CSSのtransitionが2sかけて opacity:1 にする）
      const t = setTimeout(() => setStatus("visible"), 0);
      return () => clearTimeout(t);
    }

    if (status === "visible") {
      // 静止時間（duration から fade×2 を除いた時間）
      const stillDuration = current.duration - FADE_DURATION * 2;
      const t = setTimeout(() => setStatus("fadeout"), stillDuration);
      return () => clearTimeout(t);
    }

    if (status === "fadeout") {
      // フェードアウト完了を待って次へ
      const t = setTimeout(() => {
        const next = index + 1;
        if (next >= scenes.length) {
          setStatus("done");
        } else {
          setIndex(next);
          setStatus("fadein");
        }
      }, FADE_DURATION);
      return () => clearTimeout(t);
    }
  }, [status, index]);

  if (status === "idle" || status === "done") {
    return <div className={styles.stage} />;
  }

  const current = scenes[index];
  const isVisible = status === "visible";

  return (
    <div className={styles.stage}>
      <div className={`${styles.scene}${isVisible ? ` ${styles.visible}` : ""}`}>
        <Scene ja={current.ja} en={current.en} />
      </div>
    </div>
  );
}
