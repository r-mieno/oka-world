export type Scene = {
  ja: string;
  en: string;
  duration: number; // ms（フェードイン2s + 静止 + フェードアウト2s を含む合計）
};

// シーン1: 入口（静止4秒 → 合計8秒）
// シーン2〜6: 各篇（静止8秒 → 合計12秒）
export const scenes: Scene[] = [
  {
    ja: "人の中心は情緒である。",
    en: "The center of a person is emotional sensitivity.",
    duration: 8000,
  },
  {
    ja: "美しいものを美しいと感じる、これが情緒の根本である。",
    en: "To feel the beautiful as beautiful — this is the root of emotional sensitivity.",
    duration: 12000,
  },
  {
    ja: "数学は、美しいかどうかで進む方向が決まる。",
    en: "In mathematics, the direction forward is decided by beauty.",
    duration: 12000,
  },
  {
    ja: "自然というものは人間の情緒と深いところで繋がっている。",
    en: "Nature is connected to human feeling at a place deeper than thought.",
    duration: 12000,
  },
  {
    ja: "人を喜ばせたいという気持ちが、何かを生み出す力の根にある。",
    en: "The wish to bring joy to another — this is the root of all creative force.",
    duration: 12000,
  },
  {
    ja: "知識は手段である。情緒は目的である。",
    en: "Knowledge is a means. Emotional sensitivity is the end.",
    duration: 12000,
  },
];

export const FADE_DURATION = 2000; // ms
