"use client";

import { useEffect, useRef, useState } from "react";
import { halScenes } from "@/data/halScenes";
import styles from "./page.module.css";

const CHAR_DELAY = 32;   // ms/文字
const START_DELAY = 900; // シーン開始前の間（ms）
const OKA_DELAY = 1500;  // HAL表示完了後に岡潔をフェードインするまでの待機（ms）

export default function HalVsOka() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [okaVisible, setOkaVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scene = halScenes[sceneIndex];
  const halText = scene.hal;
  const isTypingDone = charIndex >= halText.length;

  // 初回のスタート遅延
  useEffect(() => {
    timerRef.current = setTimeout(() => setStarted(true), START_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // タイプライター & 岡潔フェードイン
  useEffect(() => {
    if (!started) return;

    if (charIndex < halText.length) {
      timerRef.current = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, CHAR_DELAY);
    } else {
      timerRef.current = setTimeout(() => {
        setOkaVisible(true);
      }, OKA_DELAY);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [started, charIndex, halText]);

  function goToScene(index: number) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStarted(false);
    setSceneIndex(index);
    setCharIndex(0);
    setOkaVisible(false);
    timerRef.current = setTimeout(() => setStarted(true), START_DELAY);
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
          <div className={styles.halHeader}>
            <span className={styles.halName}>HAL 9000</span>
            <div className={styles.halEye}>
              <div className={styles.halPupil} />
            </div>
          </div>
          <p className={styles.halText}>
            {started ? halText.slice(0, charIndex) : ""}
            {started && !isTypingDone && <span className={styles.cursor}>▌</span>}
          </p>
        </div>

        {/* 岡潔 */}
        <div className={styles.okaCard}>
          <div className={styles.okaHeader}>
            <span className={styles.okaName}>岡潔</span>
            <div className={styles.okaKanji}>潔</div>
          </div>
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
