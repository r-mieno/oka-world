"use client";

import { useEffect, useRef, useState } from "react";
import { halScenes } from "@/data/halScenes";
import styles from "./page.module.css";

const CHAR_DELAY = 32; // ms/文字
const OKA_DELAY = 500; // HAL表示完了後に岡潔をフェードインするまでの待機

export default function HalVsOka() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [okaVisible, setOkaVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = halScenes[sceneIndex];
  const halText = scene.hal;
  const isTypingDone = charIndex >= halText.length;

  useEffect(() => {
    if (charIndex < halText.length) {
      timerRef.current = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, CHAR_DELAY);
    } else {
      timerRef.current = setTimeout(() => {
        setOkaVisible(true);
      }, OKA_DELAY);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [charIndex, halText]);

  function goToScene(index: number) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSceneIndex(index);
    setCharIndex(0);
    setOkaVisible(false);
  }

  const isFirst = sceneIndex === 0;
  const isLast = sceneIndex === halScenes.length - 1;

  return (
    <div className={styles.page}>
      {/* Memory Bar */}
      <div className={styles.memoryBarWrapper}>
        <span className={styles.memoryLabel}>HAL 9000 — memory remaining</span>
        <div className={styles.memoryTrack}>
          <div
            className={styles.memoryFill}
            style={{ width: `${scene.memory}%` }}
          />
        </div>
      </div>

      {/* Cards */}
      <div className={styles.cards}>
        {/* HAL 9000 */}
        <div className={styles.halCard}>
          <div className={styles.halEye}>
            <div className={styles.halPupil} />
          </div>
          <p className={styles.halText}>
            {halText.slice(0, charIndex)}
            {!isTypingDone && <span className={styles.cursor}>▌</span>}
          </p>
        </div>

        {/* 岡潔 */}
        <div className={styles.okaCard}>
          <div className={styles.okaKanji}>潔</div>
          <p className={`${styles.okaText}${okaVisible ? ` ${styles.okaVisible}` : ""}`}>
            {scene.oka}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.nav}>
        <button
          className={styles.navBtn}
          onClick={() => goToScene(sceneIndex - 1)}
          disabled={isFirst}
        >
          ← 前へ
        </button>

        <div className={styles.dots}>
          {halScenes.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot}${i === sceneIndex ? ` ${styles.dotActive}` : ""}`}
            />
          ))}
        </div>

        <button
          className={isLast ? styles.navBtnHidden : styles.navBtn}
          onClick={() => goToScene(sceneIndex + 1)}
          tabIndex={isLast ? -1 : 0}
        >
          次へ →
        </button>
      </div>
    </div>
  );
}
