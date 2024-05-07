import Image from "next/image";
import styles from "./page.module.css";
import Todo from "@/components/Todo/todo";

export default function Home() {
  return (
    <main className={styles.main}>
      <Todo/>      
    </main>
  );
}
