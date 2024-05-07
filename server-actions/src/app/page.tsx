import Image from "next/image";
import styles from "./page.module.css";
import Todo from "@/components/Todo/Todo";

export default function Home() {
  return (
    <main className={styles.main}>
      <Todo/>      
    </main>
  );
}
