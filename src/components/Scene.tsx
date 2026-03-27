import styles from "./Scene.module.css";

type Props = {
  ja: string;
  en: string;
};

export default function Scene({ ja, en }: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.ja}>{ja}</p>
      <p className={styles.en}>{en}</p>
    </div>
  );
}
